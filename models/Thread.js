// Thread.js - Model for threads

const mongoose = require('mongoose')
const { Schema } = mongoose

const { voteReport } = require('models/sharedMethods/rating')
const { hashPass, comparePassword } = require('models/sharedStatics/password')

const threadSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  board: { type: String, required: true },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  replyCount: { type: Number, default: 0 },
  votes: { type: Number, default: 0 },
  reports: { type: Number, default: 0 },

  // _replies: [{ type: Schema.ObjectId, ref: 'Reply' }],
  createdAt: { type: Date, default: +new Date() },
  bumpedAt: { type: Date, default: +new Date() }
})

// INSTANCE METHODS

threadSchema.methods = {
  ...threadSchema.methods,
  ...voteReport,

  comparePassword: async function (password) {
    const hashedPassword = await mongoose.model('Thread')
      .findById(this.id)
      .select('password')

    return comparePassword(password, hashedPassword.password)
  },

  updateTitleBody: async function ({ title, body, password }) {
    const thread = this
    const isCorrectPass = await thread.comparePassword(password)

    if (isCorrectPass) {
      thread.title = title || thread.title
      thread.body = body || thread.body

      return thread.save()
    }

    return { error: 'Invalid password!' }
  },

  newReply: async function () {
    const thread = this

    thread.bumpedAt = +new Date()
    thread.replyCount++

    return thread.save()
  }
}

// STATICS

// HOOKS
threadSchema.pre('save', async function (next) {
  await hashPass(this)
  next()
})

module.exports = mongoose.model('Thread', threadSchema)
