// replyController - handles all reply related actions

const { Reply, Thread } = require('models')

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
    const { page, limit, skip, threadId } = req.config
  },

  async deleteReply (req, res) {
    const { page, limit, skip, threadId } = req.config
  }
}

module.exports = replyController
