// threadController - handles all thread related actions

const threadController = {
  async getThreads (req, res) {
    try {
      res.send({
        page: 1,
        threads: []
      })
    } catch (err) {
      res.status(500)
    }
  }
}

module.exports = threadController
