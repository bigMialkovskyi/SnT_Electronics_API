const middlewares = require('../middlewares')

// подключение роутеров
const auth = require('./routes/auth')
const devices = require('./routes/devices')
const sensors = require('./routes/sensors')
const products = require('./routes/products')

// экспорт объекта API
module.exports = (app) => {
  app.use('/auth', auth)
  app.use('/devices', devices)
  app.use('/sensors', sensors)
  app.use('/products', products)
}
