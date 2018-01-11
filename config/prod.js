// prod.js - production keys stored in process.env

module.exports = {
  mongoURI: process.env.MONGO_URI,
  mongoTestURI: process.env.MONGO_TEST_URI
}
