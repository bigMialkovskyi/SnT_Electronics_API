const { Types } = require('mongoose')
const jwt = require('jsonwebtoken')


module.exports = async (req, res) => {
    try {
        // получаем данные из body запроса
        const { login, password } = req.body

        // проверяем наличие нужных данных
        if (!login) return res.status(400).send({ success: false, error: '"login" is required' })
        if (!password) return res.status(400).send({ success: false, error: '"password" is required' })
        // проверяем валидность данных
        if (login.length < 4) return res.status(400).send({ success: false, error: 'login lenght must be bigger then 4 symbols' })
        if (password.length < 8) return res.status(400).send({ success: false, error: 'password length must be bigger then 8 symbols' })
        // проверяем что никнейм не занят
        const existAdmin = await db.admins.findOne({ login })
        if (existAdmin) return res.status(400).send({ success: false, error: 'admin with this identity already exist' })

        // шифруем пароль
        const encryptedPassword = await store.common.actions.ENCRYPT_PASSWORD(password)

        // создаем нового пользователя
        const newAdmin = new db.admins({
            _id: Types.ObjectId(),
            login,
            password: encryptedPassword
        })
        await newAdmin.save()

        // создаем токен доступа для созданного пользователя
        const token = await jwt.sign({ _id: newAdmin._id }, store.common.getters.GET_SECRET_KEY())

        // из записи пользователя в БД формируем объект пользователя который будет показывать
        const admin = {
            _id: newAdmin._id,
            login: newAdmin.login,
        }

        // отправляем информацию о созданом пользователя в качестве ответа на запрос
        res.send({ success: true, message: 'admin created', admin, token })
    } catch (error) {
        console.error(error)
        res.status(500).send({ success: false, error: 'Internal server error' })
    }
}
