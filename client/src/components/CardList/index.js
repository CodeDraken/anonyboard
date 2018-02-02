import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Card from './Card'

export default class CardList extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  renderCards = () => {
    const { data } = this.props
    const keys = Object.keys(data)
      .sort((a, b) => +new Date(data[b].bumpedAt) - +new Date(data[a].bumpedAt))

    return keys.map(id => {
      const { _id, title, body, votes, createdAt, replyCount, board } = data[id]

      return <Card key={_id}{...{
        title,
        body,
        votes,
        createdAt,
        replyCount,
        _id,
        board
      }} />
    })
  }

  render () {
    return (
      <ul>
        { this.renderCards() }
      </ul>
    )
  }
}

// PropTypes.shape({
//   title: PropTypes.string,
//   body: PropTypes.string,
//   votes: PropTypes.number,
//   createdAt: PropTypes.string,
//   replyCount: PropTypes.number
// })
