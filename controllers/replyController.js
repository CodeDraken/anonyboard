// replyController - handles all reply related actions

const { Reply } = require('models')

const replyController = {
  async getReplies (req, res) {
    try {
      const { page, limit, skip } = req.config
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  },

  async createReply (req, res) {

  },

  async updateReply (req, res) {

  },

  async deleteReply (req, res) {

  }
}

module.exports = replyController
