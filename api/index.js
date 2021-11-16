const middlewares = require('../middlewares')

// подключение роутеров
const auth = require('./routes/auth')
const users = require('./routes/users')
const profile = require('./routes/profile')
const posts = require('./routes/posts')
<<<<<<< HEAD
const sensors = require('./routes/sensors')
=======
const comments = require('./routes/comments')
const likes = require('./routes/likes')
>>>>>>> b2e53aabf1cacf0faf3345e0595cadbde2076011

// экспорт объекта API
module.exports = (app) => {
  app.use('/auth', auth)
  app.use('/users', users)
<<<<<<< HEAD
  app.use('/sensors', sensors)
=======
  app.use('/profile', profile)
  app.use('/posts', posts)
  app.use('/comments', comments)
  app.use('/likes', likes)
>>>>>>> b2e53aabf1cacf0faf3345e0595cadbde2076011
}
