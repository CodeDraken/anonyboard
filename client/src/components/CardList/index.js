import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Card from './Card'

export default class CardList extends PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string,
      votes: PropTypes.number,
      createdAt: PropTypes.string,
      replyCount: PropTypes.number
    })).isRequired
  }

  render () {
    const { data } = this.props

    return (
      <ul>
        { data.map(({ _id, title, body, votes, createdAt, replyCount }) =>
          <Card key={_id} {...{title, body, votes, createdAt, replyCount}} />
        )}
      </ul>
    )
  }
}
