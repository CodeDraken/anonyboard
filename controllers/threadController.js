// threadController - handles all thread related actions

const { Thread } = require('models')

const threadController = {
  async getThreadsByBoard (req, res) {
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
  },

  async getThreads (req, res) {
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
  },

  async createThread (req, res) {
    const { board } = req.params
    
    try {
      const { title, body, board, password } = req.body
      const thread = await new Thread({
        title,
        body,
        board,
        password
      }).save()

      return res.send(thread)
    } catch (err) {
      console.log(err)
      res.status(500).send('Oops something went wrong!')
    }
  },

  async reportThread (req, res) {
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
