// Reply.js - Model for replies to threads

const mongoose = require('mongoose')
const { Schema } = mongoose

const replySchema = new Schema({
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },

  _thread: {
    type: Schema.Types.ObjectId,
    ref: 'Thread',
    required: true
  }
})

module.exports = mongoose.model('Reply', replySchema)
