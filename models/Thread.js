// Thread.js - Model for threads

const mongoose = require('mongoose')
const { Schema } = mongoose

const replySchema = new Schema({
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() }
})

const threadSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  replies: [ replySchema ],
  password: { type: String, required: true },

  createdAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Thread', threadSchema)
