// threadRoutes - thread API routes
// all routes are (api/threads)/route

const express = require('express')

const router = express.Router()
const threadController = require('../controllers/threadController')

// get threads on a specific board
router.route('/:board')
  .all((req, res, next) => {
    const { board } = req.params
    req.boardName = board.toLowerCase()
    next()
  })
  .get(threadController.getThreadsByBoard)
  .post(threadController.createThread)
  .put(threadController.reportThread)
  .delete(threadController.deleteThread)

module.exports = router
