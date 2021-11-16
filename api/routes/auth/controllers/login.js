const jwt = require('jsonwebtoken')


module.exports = async (req, res) => {
  try {
    // получаем данные из body запроса
<<<<<<< HEAD
    const { identity, password } = req.body

    // проверяем наличие нужных данных
    if (!identity) return res.status(400).send({ success: false, error: '"identity" is required' })
    if (!password) return res.status(400).send({ success: false, error: '"password" is required' })

    // находим пользователя в БД
    const device = await db.devices.findOne({ identity })
    if (!device) return res.send({ success: false, error: 'device with this identity not exist' })
=======
    const { login, password } = req.body

    // проверяем наличие нужных данных
    if (!login) return res.status(400).send({ success: false, error: '"login" is required' })
    if (!password) return res.status(400).send({ success: false, error: '"password" is required' })

    // находим пользователя в БД
    const user = await db.users.findOne({ login })
    if (!user) return res.status(400).send({ success: false, error: 'user with this login not exist' })
>>>>>>> b2e53aabf1cacf0faf3345e0595cadbde2076011

    // проверяем пароль
    const comparePasswordResult = await store.common.actions.CHECK_ENCRYPTED_PASSWORD(password, device.password)
    if (!comparePasswordResult) return res.status(401).send({ success: false, error: 'Incorrect password' })

    // создаем токен доступа для созданного пользователя
    const token = await jwt.sign({ _id: device._id }, store.common.getters.GET_SECRET_KEY())

<<<<<<< HEAD
    // из записи пользователя в БД формируем объект пользователя который будет показывать
    const deviceForResponse = {
      _id: device._id,
      identity: device.identity,
    }

    // отправляем информацию о авторизированом пользователя в качестве ответа на запрос
    res.send({ success: true, message: 'device logined', device: deviceForResponse, token })
=======
    // отправляем информацию о авторизированом пользователя в качестве ответа на запрос
    res.send({ success: true, message: 'user logined', token })
>>>>>>> b2e53aabf1cacf0faf3345e0595cadbde2076011
  }
  catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
