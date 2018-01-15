// threadRoutes - thread API routes
// all routes are (api/threads)/route

const express = require('express')

const router = express.Router()
const threadController = require('../controllers/threadController')

// get threads on a specific board
router.route('/:board')
  .all((req, res, next) => {
    const { board } = req.params
    const config = {
      page: +req.query.page || 1,
      limit: +req.query.limit || 50,
      boardName: board.toLowerCase()
    }
    config.skip = (config.page - 1) * config.limit

    req.config = config
    next()
  })
  .get(threadController.getThreadsByBoard)
  .post(threadController.createThread)
  .put(threadController.reportThread)
  .delete(threadController.deleteThread)

module.exports = router
