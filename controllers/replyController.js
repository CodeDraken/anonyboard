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
      await thread.newReply()

      return res.json(reply)
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  },

  async updateReply (req, res) {
    // rate, report, or update
    try {
      const { type, id, password } = req.body
      const action = getUpdateAction(type)

      if (!action) return res.status(400).send({ error: 'Invalid rating type!' })

      const reply = await Reply.findById(id)
      const updated = await reply[action]({ ...req.body, type: action })

      return res.json(updated)
    } catch (err) {
      console.log(err)
      res.status(500).send('Oops something went wrong!')
    }
  },

  async deleteReply (req, res) {
    try {
      const { id, password } = req.body
      const reply = await Reply.findById(id)

      if (!reply) return res.status(404).json({ error: 'Reply not found!' })

      const isCorrectPassword = await reply.comparePassword(password)

      if (isCorrectPassword) {
        const deleted = await reply.remove()

        return res.json(deleted)
      } else {
        return res.status(401).json({ error: 'Invalid password!' })
      }
    } catch (err) {
      console.log(err)
      res.status(500).send('Oops something went wrong!')
    }
  }
}

module.exports = replyController
