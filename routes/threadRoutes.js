// threadRoutes - thread API routes
// all routes are (api/threads)/route

const express = require('express')

const router = express.Router()
const threadController = require('../controllers/threadController')

// get threads on a specific board
router.route('/:board')
  .all((req, res, next) => {
    const { board } = req.params
    const { page, limit } = req.query
    req.boardName = board.toLowerCase()
    req.page = page || 1
    req.limit = limit || 50
    req.skip = page > 1
      ? page * limit
      : 0
    next()
  })
  .get(threadController.getThreadsByBoard)
  .post(threadController.createThread)
  .put(threadController.reportThread)
  .delete(threadController.deleteThread)

module.exports = router
