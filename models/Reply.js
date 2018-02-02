// Reply.js - Model for replies to threads

const mongoose = require('mongoose')
const { Schema } = mongoose

const { voteReport } = require('models/sharedMethods/rating')
const { hashPass, comparePassword } = require('models/sharedStatics/password')
const Thread = require('./Thread')

const replySchema = new Schema({
  body: { type: String, required: true },
  createdAt: { type: Date },
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
  const reply = this
  await hashPass(reply)

  if (!reply.createdAt) {
    reply.createdAt = +new Date()
  }

  next()
})

replySchema.post('remove', async function (next) {
  const reply = this

  try {
    Thread.findByIdAndUpdate(reply.thread, {
      $inc: { replyCount: -1 }
    })
    .exec()
  } catch (error) {
    throw error
  }
})

module.exports = mongoose.model('Reply', replySchema)
