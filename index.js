const express = require('express')
const { json, urlencoded } = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

global.store = require('./store')
global.db = require('./db')()
const api = require('./api')
require("dotenv").config()


const app = express()
app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "public")));

api(app)

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('auth', {
    name: "vlad",
    city: "Las Vegas"
  });
});
app.listen(process.env.PORT, process.env.HOST, () => console.log(`App "${process.env.NAME}" listen: ${process.env.HOST}:${process.env.PORT}`))
