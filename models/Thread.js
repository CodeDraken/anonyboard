// Thread.js - Model for threads

const mongoose = require('mongoose')
const { Schema } = mongoose

const threadSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  board: { type: String, required: true },
  password: { type: String, required: true },
  _replies: [{ type: Schema.ObjectId, ref: 'Reply' }],

  createdAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Thread', threadSchema)
