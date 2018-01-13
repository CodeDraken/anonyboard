const mongoose = require('mongoose')

const { mongoURI } = require('config/keys')

mongoose.Promise = global.Promise

const mongooseConfig = {
  useMongoClient: true,
  reconnectTries: 10,
  reconnectInterval: 1000
}

const connection = mongoose.connect(mongoURI, mongooseConfig,
  (err) => {
    if (err) {
      throw new Error(err)
    }
    console.log(`Connected to MongoDB at: ${mongoURI}`)
  }
)

connection.on('disconnected', () => {
  console.log(`MongoDB disconnected from ${mongoURI}`)
})

module.exports = { mongoose }
