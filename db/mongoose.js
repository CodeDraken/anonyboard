const mongoose = require('mongoose')

const { mongoURI } = require('config/keys')

mongoose.Promise = global.Promise
mongoose.connect(mongoURI, { useMongoClient: true }, () => {
  console.log(`Connected to MongoDB at: ${mongoURI}`)
})

module.exports = { mongoose }
