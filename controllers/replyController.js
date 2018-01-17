// replyController - handles all reply related actions

const { Reply, Thread } = require('models')
const { getUpdateAction } = require('util/threadUtil')

const replyController = {
  async getReplies (req, res) {
    try {
      const { page, limit, skip, threadId } = req.config
      const replies = await Reply
        .find(
          { thread: threadId }, {},
          { sort: { 'createdAt': 1 } }
        )
        .skip(skip)
        .limit(limit)

      res.json({
        page,
        limit,
        replies,
        skip,
        threadId
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  },

  async createReply (req, res) {
    try {
      const { threadId } = req.config
      const { body, password } = req.body
      const reply = await new Reply({
        body,
        password,
        thread: threadId
      }).save()

      const thread = await Thread.findById(threadId)
      thread.set({ bumpedAt: Date.now() }).save()

      return res.json(reply)
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  },

  async updateReply (req, res) {
    // rate, report, or update
    try {
      const { page, limit, skip, threadId } = req.config
      const { type, body, id } = req.body
      const action = getUpdateAction(type)

      if (!action) return res.status(400).send({ error: 'Invalid rating type!' })

      const reply = await Reply.findById(id)
      const updated = await reply[action]({ ...req.body, type: action })

      res.json(updated)
    } catch (err) {
      console.log(err)
      res.status(500).send('Oops something went wrong!')
    }
  },

  async deleteReply (req, res) {
    const { page, limit, skip, threadId } = req.config
  }
}

module.exports = replyController
