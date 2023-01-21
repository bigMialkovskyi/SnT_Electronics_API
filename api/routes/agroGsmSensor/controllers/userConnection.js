module.exports = async (req, res) => {
  try {
    // отримуємо дані з тіла зампиту
    const { userID, sensorID } = req.body

    let identity = sensorID

    // перевірка наявності потрібних даних
    if (!userID) return res.status(400).send({ success: false, error: '"user ID" is required' })
    if (!sensorID) return res.status(400).send({ success: false, error: '"sensor ID" is required' })

    // перевіряємо чи такий користувач існує
    const existUser = await db.users.findById(userID)
    if (!existUser) return res.status(400).send({ success: false, error: 'user with this identity does not exist' })

    // перевіряємо чи такий доатчик існує
    const existSensor = await db.agroGsmSensors.findOne({ identity })
    if (!existSensor) return res.status(400).send({ success: false, error: 'sensor with this identity does not exist' })

    // перевіряємо чи девайс уже підключено до даного користувача
    if (existUser.devices.some((id) => { return id.equals(existSensor._id) })) return res.status(400).send({ success: false, error: 'you are already connected to this device' })

    //перевіряємо чи данай деваайс уже підключено до іншого користувача
    if (existSensor.user) return res.status(400).send({ success: false, error: 'this device is already connected to another account' })

    existUser.devices = [existSensor._id, ...existUser.devices]
    existSensor.user = existUser._id

    await existUser.save()
    await existSensor.save()

    // отправляем информацию о созданом продукте в качестве ответа на запрос
    res.send({ success: true, message: 'the device is connected to the user profile' })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
