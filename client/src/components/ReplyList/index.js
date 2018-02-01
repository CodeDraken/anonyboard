import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Reply from './Reply'

export default class ReplyList extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  render () {
    const replies = this.props.data

    return (
      <ul>
        { replies
            .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
            .map(reply =>
              <Reply
                replyActions={this.props.replyActions}
                thread={this.props.thread}
                board={this.props.board}
                key={reply._id}
                {...reply}
              />)
      }
      </ul>
    )
  }
}
