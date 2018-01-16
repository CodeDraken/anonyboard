const getUpdateAction = type => {
  switch (type) {
    case 'report':
      return 'report'
    case 'upvote':
      return 'upvote'
    case 'downvote':
      return 'downvote'
    case 'update':
      return 'updateTitleBody'
    default:
      return null
  }
}

module.exports = {
  getUpdateAction
}
