import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class ReplyList extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  render () {
    return (
      <ul>
        { this.props.data.map(reply => <p>{reply.body}</p>) }
      </ul>
    )
  }
}
