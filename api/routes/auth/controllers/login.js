const jwt = require('jsonwebtoken')


module.exports = async (req, res) => {
    try {
        // получаем данные из body запроса
        const { login, password } = req.body

        // проверяем наличие нужных данных
        if (!login) return res.status(400).send({ success: false, error: '"login" is required' })
        if (!password) return res.status(400).send({ success: false, error: '"password" is required' })

        // находим пользователя в БД
        const user = await db.users.findOne({ login })
        if (!user) return res.send({ success: false, error: 'user with this identity not exist' })

        // проверяем пароль
        const comparePasswordResult = await store.common.actions.CHECK_ENCRYPTED_PASSWORD(password, user.password)
        if (!comparePasswordResult) return res.status(401).send({ success: false, error: 'Incorrect password' })

        // создаем токен доступа для созданного пользователя
        const token = await jwt.sign({ _id: user._id }, store.common.getters.GET_SECRET_KEY())

        // из записи пользователя в БД формируем объект пользователя который будет показывать
        const userForResponse = {
            _id: user._id,
            identity: user.identity,
            login: user.login,
            devices: user.devices
        }

        // отправляем информацию о авторизированом пользователя в качестве ответа на запрос
        res.send({ success: true, message: 'user logined', user: userForResponse, token, username: login })
    }
    catch (error) {
        console.error(error)
        res.status(500).send({ success: false, error: 'Internal server error' })
    }
}
