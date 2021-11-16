const middlewares = require('../middlewares')

// подключение роутеров
const auth = require('./routes/auth')
const users = require('./routes/users')
const posts = require('./routes/posts')
const sensors = require('./routes/sensors')

// экспорт объекта API
module.exports = (app) => {
  app.use('/auth', auth)
  app.use('/users', users)
  app.use('/sensors', sensors)
}
