// Reply.js - Model for replies to threads

const mongoose = require('mongoose')
const { Schema } = mongoose

const { voteReport } = require('models/sharedMethods/rating')
const { hashPass, comparePassword } = require('models/sharedStatics/password')

const replySchema = new Schema({
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
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
    const hashedPassword = await mongoose.model('Thread')
      .findById(this.id)
      .select('password')

    return comparePassword(password, hashedPassword.password)
  },

  updateTitleBody: async function ({ body }) {
    let reply = this

    reply.body = body || reply.body

    return reply.save()
  }
}

// STATICS

// HOOKS
replySchema.pre('save', async function (next) {
  await hashPass(this)
  next()
})

module.exports = mongoose.model('Reply', replySchema)
