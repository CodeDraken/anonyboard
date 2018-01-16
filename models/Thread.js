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
    minlength: 6
  },
  replyCount: { type: Number, default: 0 },
  votes: { type: Number, default: 0 },
  reports: { type: Number, default: 0 },

  // _replies: [{ type: Schema.ObjectId, ref: 'Reply' }],
  createdAt: { type: Date, default: Date.now() },
  bumpedAt: { type: Date, default: Date.now() }
})

// INSTANCE METHODS

threadSchema.methods = {
  ...threadSchema.methods,
  ...voteReport,

  comparePassword: function (password) {
    return comparePassword(password, this)
  },

  updateTitleBody: async function ({ title, body }) {
    let thread = this

    thread.title = title || thread.title
    thread.body = body || thread.body

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
