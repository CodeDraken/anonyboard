// Thread.js - Model for threads

const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')

const threadSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  board: { type: String, required: true },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
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

threadSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(this.password, password)
}

// STATICS

// HOOKS
threadSchema.pre('save', async function (next) {
  try {
    const thread = this

    if (thread.isModified('password')) {
      const hash = await bcrypt.hash(thread.password, 10)
      thread.password = hash
      return next()
    }

    return next()
  } catch (err) {
    throw err
  }
})

module.exports = mongoose.model('Thread', threadSchema)
