const voteReport = {
  upvote: async function () {
    const thread = this
    thread.votes++

    return thread.save()
  },

  downvote: async function () {
    const thread = this
    thread.votes--

    return thread.save()
  },

  report: async function () {
    const thread = this
    thread.reports++

    return thread.save()
  }
}

module.exports = {
  voteReport
}
