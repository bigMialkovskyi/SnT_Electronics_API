const jwt = require('jsonwebtoken')


module.exports = async (req, res) => {
  try {
    // получаем данные из body запроса
    const { identity, password } = req.body

    // проверяем наличие нужных данных
    if (!identity) return res.status(400).send({ success: false, error: '"identity" is required' })
    if (!password) return res.status(400).send({ success: false, error: '"password" is required' })

    // находим пользователя в БД
    const device = await db.devices.findOne({ identity })
    if (!device) return res.send({ success: false, error: 'device with this identity not exist' })

    // проверяем пароль
    const comparePasswordResult = await store.common.actions.CHECK_ENCRYPTED_PASSWORD(password, device.password)
    if (!comparePasswordResult) return res.status(401).send({ success: false, error: 'Incorrect password' })

    // создаем токен доступа для созданного пользователя
    const token = await jwt.sign({ _id: device._id }, store.common.getters.GET_SECRET_KEY())

    // из записи пользователя в БД формируем объект пользователя который будет показывать
    const deviceForResponse = {
      _id: device._id,
      identity: device.identity,
    }

    // отправляем информацию о авторизированом пользователя в качестве ответа на запрос
    res.send({ success: true, message: 'device logined', device: deviceForResponse, token })
  }
  catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
