const { Types } = require('mongoose')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')


module.exports = async (req, res) => {
    try {
        // отримуємо дані з body запиту
        const { login, password, email } = req.body

        // перевіряємо наявність потрібних даних
        if (!login) return res.status(400).send({ success: false, error: '"login" is required' })
        if (!email) return res.status(400).send({ success: false, error: '"email" is required' })
        if (!password) return res.status(400).send({ success: false, error: '"password" is required' })

        // перевіряємо валідність даних
        if (login.length < 4) return res.status(400).send({ success: false, error: 'login lenght must be bigger then 4 symbols' })
        if (password.length < 8) return res.status(400).send({ success: false, error: 'password length must be bigger then 8 symbols' })
        if (email.length < 8) return res.status(400).send({ success: false, error: 'email length must be bigger then 8 symbols' })

        // перевіряємо чи нікнейм не зайнятий
        const existUser = await db.users.findOne({ login })
        if (existUser) return res.status(400).send({ success: false, error: 'user with this identity already exist' })
        // перевіряємо чи електронна пошта не зайнята
        const existEmail = await db.users.findOne({ email })
        if (existEmail) return res.status(400).send({ success: false, error: 'user with this email already exist' })


        // шифруємо пароль
        const encryptedPassword = await store.common.actions.ENCRYPT_PASSWORD(password)

        // створюємо нового користувача
        const newUser = new db.users({
            _id: Types.ObjectId(),
            login,
            password: encryptedPassword,
            email,
            confirmed: false
        })
        await newUser.save()

        // створюємо лінк для активації пошти користувача
        const encryptedEmail = await store.common.actions.ENCRYPT_PASSWORD(email)
        const activationLink = `${process.env.HOST}:${process.env.PORT}/auth/confirm-email/${encryptedEmail}`

        // створюємо запис активації в БД 
        const newActivationRecord = new db.emailConfirm({
            _id: Types.ObjectId(),
            userID: newUser._id,
            link: activationLink,
            encryptedEmail: encryptedEmail
        })
        await newActivationRecord.save()

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: `${process.env.SMTP_HOST}`,
            port: process.env.SMTP_PORT,
            secure: true, // use SSL/TLS
            auth: {
                user: `${process.env.EMAIL}`, // generated ethereal user
                pass: `${process.env.EMAIL_PASS}`, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `SnT Electronics <${process.env.EMAIL}>`, // sender address
            to: String(email), // list of receivers
            subject: "Confirm your email", // Subject line
            text: `Hello`, // plain text body
            html: `<b>Hello. Welcome to the SnT Electronics team. The last step remains. Follow the link to activate your email: <a href="${activationLink}">${activationLink}</a></b>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        // створємо токен доступу для щойноствореного користувача
        const token = await jwt.sign({ _id: newUser._id }, store.common.getters.GET_SECRET_KEY())

        // із запису користувача в БД формуємо об'єкт користувача який буде показувати:
        const user = {
            _id: newUser._id,
            login: newUser.login,
            email: newUser.email
        }

        // відправляємо інформацію щодо створеного користувача в якості відповіді на запит
        res.send({ success: true, message: 'user created', user, token })
    } catch (error) {
        console.error(error)
        res.status(500).send({ success: false, error: 'Internal server error' })
    }
}
