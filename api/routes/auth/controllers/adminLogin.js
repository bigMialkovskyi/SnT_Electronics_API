const jwt = require('jsonwebtoken')


module.exports = async (req, res) => {
    try {
        // получаем данные из body запроса
        const { login, password } = req.body

        // проверяем наличие нужных данных
        if (!login) return res.status(400).send({ success: false, error: '"login" is required' })
        if (!password) return res.status(400).send({ success: false, error: '"password" is required' })

        // находим пользователя в БД
        const admin = await db.admins.findOne({ login })
        if (!admin) return res.send({ success: false, error: 'admin with this identity not exist' })

        // проверяем пароль
        const comparePasswordResult = await store.common.actions.CHECK_ENCRYPTED_PASSWORD(password, admin.password)
        if (!comparePasswordResult) return res.status(401).send({ success: false, error: 'Incorrect password' })

        // создаем токен доступа для созданного пользователя
        const token = await jwt.sign({ _id: admin._id }, store.common.getters.GET_SECRET_KEY())

        // из записи пользователя в БД формируем объект пользователя который будет показывать
        const adminForResponse = {
            _id: admin._id,
            identity: admin.identity,
        }

        // отправляем информацию о авторизированом пользователя в качестве ответа на запрос
        res.send({ success: true, message: 'admin logined', admin: adminForResponse, token })
    }
    catch (error) {
        console.error(error)
        res.status(500).send({ success: false, error: 'Internal server error' })
    }
}
