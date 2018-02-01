// Reply.js - Model for replies to threads

const mongoose = require('mongoose')
const { Schema } = mongoose

const { voteReport } = require('models/sharedMethods/rating')
const { hashPass, comparePassword } = require('models/sharedStatics/password')
const Thread = require('./Thread')

const replySchema = new Schema({
  body: { type: String, required: true },
  createdAt: { type: Date, default: +new Date() },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  votes: { type: Number, default: 0 },
  reports: { type: Number, default: 0 },

  thread: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

// INSTANCE METHODS

replySchema.methods = {
  ...replySchema.methods,
  ...voteReport,

  comparePassword: async function (password) {
    const hashedPassword = await mongoose.model('Reply')
      .findById(this.id)
      .select('password')

    return comparePassword(password, hashedPassword.password)
  },

  updateTitleBody: async function ({ body, password }) {
    let reply = this
    const isCorrectPass = await reply.comparePassword(password)

    if (isCorrectPass) {
      reply.body = body || reply.body

      return reply.save()
    }

    throw new Error('Invalid password!')
  }
}

// STATICS

// HOOKS
replySchema.pre('save', async function (next) {
  await hashPass(this)

  next()
})

module.exports = mongoose.model('Reply', replySchema)
