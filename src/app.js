"use strict"

global.__basedir = __dirname

// imports
const express = require('express')

//Added for Assignment#3
// const exphbs = require('express-handlebars')
// const bodyParser = require('body-parser')
const path = require('path')


// local imports
const util = require(__basedir + '/helpers/util')

// get config
const config = require(__basedir + '/config')
const {
  PORT: port,
} = config

// connect to the database
require(__basedir + '/helpers/mongoose')

// start express application
console.log(`starting application on port ${port}`)

// preparing express app
const app = express()

// Parse incoming json
app.use(express.json({ limit: '50mb' }))
// CORS
const cors = require('cors')
app.use(cors())

const hbs = require('express-handlebars');
// View Engine Setup
app.engine('.hbs', hbs.engine({extname: '.hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// Set public dir
app.use(express.static(path.join(__dirname, 'public')));

// Routers
const heroRouter = require(__basedir + '/routers/hero')
app.use(heroRouter)

app.get('/', async (req, res) => {
  res.render('index');
})

app.get('/search', async (req, res) => {
  res.render('search');
})



app.get('/', async (req, res) => {
  let pageNum = req.query.pageNum || 1
  pageNum = Number(pageNum)

  res.send({
    msg: "Welcome To Our API!"
  })
})



// 404 Page
app.get('*', (req, res) => {
  res.status(404).send({
    "err": "not found!",
  })
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send({
    err: "Something broke!"
  })
})

app.listen(port, () => {
  console.log(`\nServer is up:\n\n\thttp://localhost:${port}\n\n`)
})

