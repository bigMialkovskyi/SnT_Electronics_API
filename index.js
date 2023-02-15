const express = require('express')
const { json, urlencoded } = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


global.store = require('./store')
global.db = require('./db')()
const api = require('./api')
require("dotenv").config()


const app = express()
app.use(cors())
app.use(express.static('static'))
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")));

api(app)

app.set('views', './views');
app.set('view engine', 'pug');

// app.get('/admin-register', (req, res) => {
//   res.render('register', {
//     name: "vlad",
//     city: "Las Vegas"
//   });
// });

app.get('/admin-register', (req, res) => {
  res.render('register', {});
});

app.get('/admin-login', (req, res) => {
  res.render('login', {});
});

app.get('/home', (req, res) => {
  res.render('home', {});
});

// app.listen(process.env.PORT || 5000, process.env.HOST || '0.0.0.0', () => console.log(`App "${process.env.NAME}" listen: ${process.env.HOST || '0.0.0.0'}:${process.env.PORT}`))
app.listen(process.env.PORT || 5000, '0.0.0.0', () => console.log(`App "${process.env.NAME}" listen: ${'0.0.0.0'}:${process.env.PORT}`))

