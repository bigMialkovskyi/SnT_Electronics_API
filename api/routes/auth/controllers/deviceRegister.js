const { Types } = require('mongoose')
const jwt = require('jsonwebtoken')


module.exports = async (req, res) => {
  try {
    // получаем данные из body запроса
    const { identity, password } = req.body

    // проверяем наличие нужных данных
    if (!identity) return res.status(400).send({ success: false, error: '"identity" is required' })
    if (!password) return res.status(400).send({ success: false, error: '"password" is required' })
    // проверяем валидность данных
    if (identity.length < 6) return res.status(400).send({ success: false, error: 'identity lenght must be bigger then 6 symbols' })
    if (password.length < 8) return res.status(400).send({ success: false, error: 'password length must be bigger then 8 symbols' })
    // проверяем что никнейм не занят
    const existDevice = await db.devices.findOne({ identity })
    if (existDevice) return res.status(400).send({ success: false, error: 'device with this identity already exist' })

    // шифруем пароль
    const encryptedPassword = await store.common.actions.ENCRYPT_PASSWORD(password)

    // создаем нового пользователя
    const newDevice = new db.devices({
      _id: Types.ObjectId(),
      identity,
      password: encryptedPassword
    })
    await newDevice.save()

    // создаем токен доступа для созданного пользователя
    const token = await jwt.sign({ _id: newDevice._id }, store.common.getters.GET_SECRET_KEY())

    // из записи пользователя в БД формируем объект пользователя который будет показывать
    const device = {
      _id: newDevice._id,
      identity: newDevice.identity,
    }

    // отправляем информацию о созданом пользователя в качестве ответа на запрос
    res.send({ success: true, message: 'device created', device, token })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
