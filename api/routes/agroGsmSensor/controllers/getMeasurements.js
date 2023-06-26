module.exports = async (req, res) => {
  try {
    // отримуємо дані з тіла зампиту
    const { sensorsList } = req.body

    // перевірка наявності потрібних даних
    if (!sensorsList) return res.status(400).send({ success: false, error: 'sensors list is required' })

    //отримуємо виміри датчиків з БД

    let measForRespose = await Promise.all(sensorsList.map(async (element) => {
      const sensor = await db.agroGsmSensors.findOne({ _id: element })
      let result
      result = {
        id: sensor.id,
        identity: sensor.identity,
        measurements: sensor.measurements,
        name: sensor.name,
        batteryStatus: sensor.batteryStatus
      }

      return result
    }))

    // отправляем информацию о созданом продукте в качестве ответа на запрос
    res.send({ success: true, message: 'measurements successfully obtained', measForRespose })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
