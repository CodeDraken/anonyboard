const getRatingAction = type => {
  switch (type) {
    case 'report':
      return 'report'
    case 'upvote':
      return 'upvote'
    case 'downvote':
      return 'downvote'
    default:
      return null
  }
}

module.exports = {
  getRatingAction
}
