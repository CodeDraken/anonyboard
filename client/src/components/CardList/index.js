import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Card from './Card'

export default class CardList extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render () {
    const { data } = this.props

    return (
      <ul>
        { Object.keys(data).map(id => {
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
        })}
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
