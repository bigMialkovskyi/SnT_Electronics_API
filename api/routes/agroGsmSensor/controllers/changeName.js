module.exports = async (req, res) => {
    try {
        // отримуємо дані з тіла зампиту
        const { userID, sensorID, name } = req.body

        let identity = sensorID

        // перевірка наявності потрібних даних
        if (!userID) return res.status(400).send({ success: false, error: '"user ID" is required' })
        if (!sensorID) return res.status(400).send({ success: false, error: '"sensor ID" is required' })
        if (!name) return res.status(400).send({ success: false, error: '"name" is required' })

        // перевіряємо чи такий користувач існує
        const existUser = await db.users.findById(userID)
        if (!existUser) return res.status(400).send({ success: false, error: 'user with this identity does not exist' })

        // перевіряємо чи такий доатчик існує
        const existSensor = await db.agroGsmSensors.findOne({ identity })
        if (!existSensor) return res.status(400).send({ success: false, error: 'sensor with this identity does not exist' })

        // перевіряємо чи данай деваайс уже підключено до іншого користувача
        if (existSensor.user != existUser.id) return res.status(400).send({ success: false, error: 'only the owner of the sensor can interact with it' })

        // перевіряємо чи датчик підключено саме до цього облікового запису.
        if (existSensor.user == existUser.id) existSensor.name = name

        // чекаємо збереження змін в базі даних
        await existSensor.save()

        // відправляємо повідомлення в разі успішного зміни імені датчика 
        res.send({ success: true, message: 'device name changed successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).send({ success: false, error: 'Internal server error' })
    }
}
