// replyRoutes - reply API routes
// all routes are (api/replies)/:board/:id

// TODO: update this to replies

const express = require('express')

const router = express.Router()
const replyController = require('../controllers/replyController')

// get replys on a specific board
router.route('/:board/:id')
  .all((req, res, next) => {
    const { board, id } = req.params
    const config = {
      page: +req.query.page || 1,
      limit: +req.query.limit || 50,
      boardName: board.toLowerCase(),
      threadId: id
    }
    config.skip = (config.page - 1) * config.limit

    req.config = config
    next()
  })
  .get(replyController.getReplies)
  .post(replyController.createReply)
  .patch(replyController.updateReply)
  .delete(replyController.deleteReply)

module.exports = router
