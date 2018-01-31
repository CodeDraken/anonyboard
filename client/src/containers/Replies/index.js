import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

import * as replyActions from 'actions/replyActions'
import Loader from 'components/Loader'
import ReplyList from 'components/ReplyList'

export class Replies extends PureComponent {
  static propTypes = {
    fetchReplies: PropTypes.func.isRequired,
    board: PropTypes.string.isRequired,
    thread: PropTypes.string.isRequired
  }

  componentDidMount () {
    const { board, thread } = this.props

    this.props.fetchReplies(board, thread)
  }

  renderContent = () => {
    const { isFetching, error, replies, board, thread,
      createReply, updateReply, deleteReply
    } = this.props

    switch (true) {
      case isFetching: return <Loader />
      case !!error: return <p>Error: <em>{error.message}</em></p>
      case !isFetching && !error && replies.length > 0:
        return <ReplyList
          replyActions={{ createReply, updateReply, deleteReply }}
          {...{board, thread}}
          data={replies}
        />
      default: return <p className='has-text-centered'>No replies :(</p>
    }
  }

  render () {
    return (
      <div>
        { this.renderContent() }
      </div>
    )
  }
}

const mapStateToProps = ({ repliesByThread: { replies, isFetching, error } }) => ({
  replies,
  isFetching,
  error
})

export default connect(mapStateToProps, replyActions)(Replies)
