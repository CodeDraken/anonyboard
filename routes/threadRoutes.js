// threadRoutes - thread API routes
// all routes are api/threads/route

const threadController = require('../controllers/threadController')

module.exports = app => {
  app.get('/api/threads', threadController.getThreads)
}
