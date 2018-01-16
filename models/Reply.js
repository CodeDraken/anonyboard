// Reply.js - Model for replies to threads

const mongoose = require('mongoose')
const { Schema } = mongoose

const replySchema = new Schema({
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  votes: { type: Number, default: 0 },
  reports: { type: Number, default: 0 },

  thread: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

module.exports = mongoose.model('Reply', replySchema)
