const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const { mongoURI } = require('./config/keys')

mongoose.Promise = global.Promise
mongoose.connect(mongoURI, { useMongoClient: true }, () => {
  console.log(`Connected to MongoDB at: ${mongoURI}`)
})

const app = express()

// middleware
app.use(bodyParser.json())

// routes
app.get('/', (req, res) => {
  res.send('Systems are up!')
})

// production server
if (process.env.NODE_ENV === 'production') {
  // serve production assets
  app.use(express.static('client/buid'))

  // serve index.html if unrecognized route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

module.exports = app
