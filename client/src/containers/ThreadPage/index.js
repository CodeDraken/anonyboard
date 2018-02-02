import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchSingleThread, updateThread } from 'actions/threadActions'
import Loader from 'components/Loader'
import ThreadContent from 'components/ThreadContent'
import Replies from 'containers/Replies'

export class ThreadPage extends Component {
  static propTypes = {
    fetchSingleThread: PropTypes.func.isRequired
  }

  componentDidMount () {
    if (!this.props.thread) {
      const { board, thread } = this.props.match.params
      this.props.fetchSingleThread(board, thread)
    }
  }

  handleEdit = (type, title, body) => {
    // this could be refactored out
    // thread page is the only place you can vote/report/edit for now
    const { board, _id } = this.props.thread

    this.props.updateThread({type, id: _id, board, title, body})
  }

  renderContent = () => {
    const { isFetching, error, thread } = this.props

    console.log(thread && thread.bumpedAt, '|', thread && thread.createdAt)

    switch (true) {
      case isFetching && !thread: return <Loader />
      // case !!error: return <p>Error: <em>{error.message}</em></p>
      case !!thread:
        return <ThreadContent {...thread} edit={this.handleEdit} />
      default: return <p>Oops I lost it :(</p>
    }
  }

  render () {
    const { threadObj, error } = this.props
    const { board, thread } = this.props.match.params

    return (
      <div>
        {error ? <p>Error: <em>{error.message}</em></p> : null}
        {this.renderContent()}
        <Replies {...{ board, thread }} />
      </div>
    )
  }
}

const mapStateToProps = ({ threadsByBoard: { threads, error, isFetching } }, ownProps) => ({
  thread: threads[ownProps.match.params.thread] || null,
  isFetching,
  error
})

export default connect(mapStateToProps, { fetchSingleThread, updateThread })(ThreadPage)
