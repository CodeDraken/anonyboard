const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const { mongoURI } = require('./config/keys')
const threadRoutes = require('./routes/threadRoutes')

mongoose.Promise = global.Promise
mongoose.connect(mongoURI, { useMongoClient: true }, () => {
  console.log(`Connected to MongoDB at: ${mongoURI}`)
})

const app = express()

// middleware
app.use(bodyParser.json())

// routes
app.use('/api/threads', threadRoutes)

// production server
if (process.env.NODE_ENV === 'production') {
  // serve production assets
  app.use(express.static('client/buid'))

  // serve index.html if unrecognized route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.status(200).send('Server is up and running!')
  })
}

module.exports = app
