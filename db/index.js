const mongoose = require('mongoose')

require("dotenv").config() // получение переменных среды
const mongoURI = `${process.env.DB_HOST}`
// const mongoURI = `${process.env.DB_HOST}${process.env.DB_NAME}`
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
    devices: require('./models/devices')(mongoose, connection),
    sensors: require('./models/sensors')(mongoose, connection),
    users: require('./models/users')(mongoose, connection),
    products: require('./models/products')(mongoose, connection),
  }
}