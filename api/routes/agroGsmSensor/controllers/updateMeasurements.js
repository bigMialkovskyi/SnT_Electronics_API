const { Types } = require('mongoose')
var fs = require('fs');
var path = require('path');



module.exports = async (req, res) => {
  try {

    // отримуємо дані з тіла зампиту
    const { identity, airTemperature, soilTemperature, humidity, pressure } = req.body

    // перевіряємо чи такий датчик існує
    const existSensor = await db.agroGsmSensors.findOne({ identity })
    if (!existSensor) return res.status(400).send({ success: false, error: 'sensor with this identity does not exist' })

    // перевірка наявності потрібних даних
    if (!airTemperature) return res.status(400).send({ success: false, error: '"airTemperature" is required' })
    if (!soilTemperature) return res.status(400).send({ success: false, error: '"soilTemperature" is required' })
    if (!humidity) return res.status(400).send({ success: false, error: '"humidity" is required' })
    if (!pressure) return res.status(400).send({ success: false, error: '"pressure" is required' })

    // перевіряємо валідність даних
    // потрібно набисати перевірку валідності після узгодження формату даних
    // if (airTemperature.length < 6) return res.status(400).send({ success: false, error: 'airTemperature lenght must be bigger then 6 symbols' })

    const updateTime = new Date().toString();

    existSensor.measurements = [
      {
        airTemperature,
        soilTemperature,
        humidity,
        pressure,
        updateTime,
      },
      ...existSensor.measurements
    ]

    await existSensor.save()
    // отправляем информацию о созданом продукте в качестве ответа на запрос
    res.send({ success: true, message: 'measurments updated' })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}