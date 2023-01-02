const { Types } = require('mongoose')
const jwt = require('jsonwebtoken')


module.exports = async (req, res) => {
    try {
        // получаем данные из body запроса
        const { identity } = req.body

        // проверяем наличие нужных данных
        if (!identity) return res.status(400).send({ success: false, error: '"identity" is required' })
        // проверяем валидность данных
        if (identity.length < 4) return res.status(400).send({ success: false, error: 'identity lenght must be bigger then 5 symbols' })
        // проверяем что никнейм не занят
        const existSensor = await db.agroGsmSensors.findOne({ identity })
        if (existSensor) return res.status(400).send({ success: false, error: 'sernsor with this identity already exist' })

        // шифруем пароль
        // const encryptedPassword = await store.common.actions.ENCRYPT_PASSWORD(password)

        // создаем нового пользователя
        const newSensor = new db.agroGsmSensors({
            _id: Types.ObjectId(),
            identity,
        })
        await newSensor.save()

        // создаем токен доступа для созданного пользователя
        // const token = await jwt.sign({ _id: newSensor._id }, store.common.getters.GET_SECRET_KEY())

        // из записи пользователя в БД формируем объект пользователя который будет показывать
        const sensor = {
            _id: newSensor._id,
            identity: newSensor.identity,
        }

        // отправляем информацию о созданом пользователя в качестве ответа на запрос
        res.send({ success: true, message: 'sensor created', sensor })
    } catch (error) {
        console.error(error)
        res.status(500).send({ success: false, error: 'Internal server error' })
    }
}
