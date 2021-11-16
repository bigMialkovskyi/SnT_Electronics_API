const { Types } = require('mongoose')
const jwt = require('jsonwebtoken')


module.exports = async (req, res) => {
  try {
    // получаем данные из body запроса
<<<<<<< HEAD
    const { identity, password } = req.body

    // проверяем наличие нужных данных
    if (!identity) return res.status(400).send({ success: false, error: '"identity" is required' })
    if (!password) return res.status(400).send({ success: false, error: '"password" is required' })
    // проверяем валидность данных
    if (identity.length < 6) return res.status(400).send({ success: false, error: 'identity lenght must be bigger then 2 symbols' })
=======
    const { login, password } = req.body

    // проверяем наличие нужных данных
    if (!login) return res.status(400).send({ success: false, error: '"login" is required' })
    if (!password) return res.status(400).send({ success: false, error: '"password" is required' })
    // проверяем валидность данных
    if (login.length < 2) return res.status(400).send({ success: false, error: 'login lenght must be bigger then 2 symbols' })
>>>>>>> b2e53aabf1cacf0faf3345e0595cadbde2076011
    if (password.length < 8) return res.status(400).send({ success: false, error: 'password length must be bigger then 8 symbols' })
    
    // проверяем что никнейм не занят
<<<<<<< HEAD
    const existDevice = await db.devices.findOne({ identity })
    if (existDevice) return res.status(400).send({ success: false, error: 'device with this identity already exist' })
=======
    const existUser = await db.users.findOne({ login })
    if (existUser) return res.status(400).send({ success: false, error: 'user with this login already exist' })
>>>>>>> b2e53aabf1cacf0faf3345e0595cadbde2076011

    // шифруем пароль
    const encryptedPassword = await store.common.actions.ENCRYPT_PASSWORD(password)

    // создаем нового пользователя
    const newDevice = new db.devices({
      _id: Types.ObjectId(),
<<<<<<< HEAD
      identity,
=======
      login,
>>>>>>> b2e53aabf1cacf0faf3345e0595cadbde2076011
      password: encryptedPassword
    })
    await newDevice.save()

    // создаем токен доступа для созданного пользователя
    const token = await jwt.sign({ _id: newDevice._id }, store.common.getters.GET_SECRET_KEY())

<<<<<<< HEAD
    // из записи пользователя в БД формируем объект пользователя который будет показывать
    const device = {
      _id: newDevice._id,
      identity: newDevice.identity,
    }

    // отправляем информацию о созданом пользователя в качестве ответа на запрос
    res.send({ success: true, message: 'device created', device, token })
=======
    // отправляем информацию о созданом пользователя в качестве ответа на запрос
    res.send({ success: true, message: 'user created', token })
>>>>>>> b2e53aabf1cacf0faf3345e0595cadbde2076011
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
