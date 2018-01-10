// threadRoutes - thread API routes
// all routes are (api/threads)/route

const express = require('express')

const threadRouter = express.Router()
const threadController = require('../controllers/threadController')

threadRouter.get('/:board', threadController.getThreads)

module.exports = threadRouter
