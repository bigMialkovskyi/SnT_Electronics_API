const mongoose = require('mongoose')

require("dotenv").config() // получение переменных среды
const mongoURI = `${process.env.DB_HOST}${process.env.DB_NAME}`
const connection = mongoose.createConnection(mongoURI) // подключение к БД

// слушаем события связанные с работой БД
connection.on('connected', () => console.log(`Database "${process.env.DB_NAME}" successfully connected`))
connection.on('disconnected', () => console.log(`Database "${process.env.DB_NAME}" disconnected`))
connection.on('error', (error) => console.error(`Database error: \n${error}`))

// экспортируем объект БД
module.exports = () => {
  console.log('Trying connect to database...')

  return {
    connection,
<<<<<<< HEAD
    devices: require('./models/devices')(mongoose, connection),
    sensors: require('./models/sensors')(mongoose, connection)
=======
    users: require('./models/users')(mongoose, connection),
    posts: require('./models/posts')(mongoose, connection),
    comments: require('./models/comments')(mongoose, connection),
    likes: require('./models/likes')(mongoose, connection),
    files: require('./models/files')(mongoose, connection)
>>>>>>> b2e53aabf1cacf0faf3345e0595cadbde2076011
  }
}
