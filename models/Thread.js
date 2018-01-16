// Thread.js - Model for threads

const mongoose = require('mongoose')
const { Schema } = mongoose

const threadSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  board: { type: String, required: true },
  password: { type: String, required: true },
  replyCount: { type: Number, default: 0 },
  votes: { type: Number, default: 0 },
  reports: { type: Number, default: 0 },

  _replies: [{ type: Schema.ObjectId, ref: 'Reply' }],
  createdAt: { type: Date, default: Date.now() },
  bumpedAt: { type: Date, default: Date.now() }
})

// INSTANCE METHODS
threadSchema.methods.upvote = async function () {
  const thread = this
  thread.votes++

  return thread.save()
}

threadSchema.methods.downvote = async function () {
  const thread = this
  thread.votes--

  return thread.save()
}

threadSchema.methods.report = async function () {
  const thread = this
  thread.reports++

  return thread.save()
}

// STATICS

module.exports = mongoose.model('Thread', threadSchema)
