module.exports = async (req, res) => {
    try {
        // отримуємо дані з тіла зампиту
        const { userID, sensorID } = req.body

        let identity = sensorID

        // перевірка наявності потрібних даних
        if (!userID) return res.status(400).send({ success: false, error: '"user ID" is required' })
        if (!sensorID) return res.status(400).send({ success: false, error: '"sensor ID" is required' })
        // if (!name) return res.status(400).send({ success: false, error: '"name" is required' })

        // перевіряємо чи такий користувач існує
        const existUser = await db.users.findById(userID)
        if (!existUser) return res.status(400).send({ success: false, error: 'user with this identity does not exist' })

        // перевіряємо чи такий доатчик існує
        const existSensor = await db.agroGsmSensors.findOne({ identity })
        if (!existSensor) return res.status(400).send({ success: false, error: 'sensor with this identity does not exist' })

        // перевіряємо чи девайс уже підключено до даного користувача
        if (existUser.devices.some((id) => { return id.equals(existSensor._id) })) {
            let clearedSensorList = []

            existUser.devices.forEach((element) => {
                if (!existSensor._id.equals(element)) clearedSensorList.push(element)
            });

            existUser.devices = clearedSensorList
            existSensor.user = null
        }

        await existUser.save()
        await existSensor.save()

        // відпарвляємо повідомлення що девайс успішно видалено
        res.send({ success: true, message: `device ${existSensor.name} is disconnected from your account` })
    } catch (error) {
        console.error(error)
        res.status(500).send({ success: false, error: 'Internal server error' })
    }
}
1  