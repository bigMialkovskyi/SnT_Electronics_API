const middlewares = require('../middlewares')

// подключение роутеров
const auth = require('./routes/auth')
const devices = require('./routes/devices')
const sensors = require('./routes/sensors')
const products = require('./routes/products')
const agroGsmSensors = require('./routes/agroGsmSensor')

// экспорт объекта API
module.exports = (app) => {
  app.use('/auth', auth)
  app.use('/devices', devices)
  app.use('/sensors', sensors)
  app.use('/products', products)
  app.use('/agro-gsm-sensor', agroGsmSensors)
}
