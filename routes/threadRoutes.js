// threadRoutes - thread API routes
// all routes are (api/threads)/route

const express = require('express')

const threadRouter = express.Router()
const threadController = require('../controllers/threadController')

// get threads on a specific board
threadRouter.get('/:board', threadController.getThreadsByBoard)

// create a thread
threadRouter.post('/:board', threadController.createThread)

// report a thread
threadRouter.put('/:board', threadController.reportThread)

// delete a thread using the password
threadRouter.delete('/:board', threadController.deleteThread)

module.exports = threadRouter
