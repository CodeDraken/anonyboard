// threadController - handles all thread related actions

const { Thread } = require('models')

const threadController = {
  async getThreadsByBoard (req, res) {
    try {
      const { boardName, page, limit, skip } = req.config
      // get threads by board, sort, and skip for pagination
      const threads = await Thread
        .find(
          { board: boardName },
          {},
          { sort: { 'createdAt': -1 } }
        )
        .skip(skip)
        .limit(limit)

      res.send({
        page,
        limit,
        threads,
        skip,
        boardName
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({ err })
    }
  },

  async getRecentThreads (req, res) {
    // all boards
    try {
      res.send({
        page: 1,
        board: req.boardName,
        threads: []
      })
    } catch (err) {
      console.log(err)
      res.status(500).send('Oops something went wrong!')
    }
  },

  async createThread (req, res) {
    try {
      const { title, body, password } = req.body
      const thread = await new Thread({
        title,
        body,
        board: req.config.boardName,
        password
      }).save()

      return res.send(thread)
    } catch (err) {
      console.log(err)
      res.status(500).send('Oops something went wrong!')
    }
  },

  async rateThread (req, res) {
    try {
      res.send('update')
    } catch (err) {
      console.log(err)
      res.status(500).send('Oops something went wrong!')
    }
  },

  async deleteThread (req, res) {
    const { board } = req.params
    try {
      res.send({
        page: 1,
        board,
        threads: []
      })
    } catch (err) {
      console.log(err)
      res.status(500).send('Oops something went wrong!')
    }
  }
}

module.exports = threadController
