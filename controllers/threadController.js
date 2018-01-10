// threadController - handles all thread related actions

const threadController = {
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
  }
}

module.exports = threadController
