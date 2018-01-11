// threadController - handles all thread related actions

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
