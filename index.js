// импорт сторонних зависимостей
const express = require('express')
const { json, urlencoded } = require('express')
const cors = require('cors')
const morgan = require('morgan')

// глобальные переменные
global.store = require('./store')
global.db = require('./db')()
const api = require('./api')
require("dotenv").config()


// инициализация приложения
const app = express()
app.use(express.static('static'))
app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(morgan('dev'))

api(app)

app.listen(process.env.PORT, process.env.HOST, () => console.log(`App "${process.env.NAME}" listen: http://${process.env.HOST}:${process.env.PORT}`))
