import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchSingleThread } from 'actions/threadActions'
import Loader from 'components/Loader'
import ThreadContent from 'components/ThreadContent'

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

  renderContent = () => {
    const { isFetching, error, thread } = this.props

    switch (true) {
      case isFetching: return <Loader />
      case !!error: return <p>Error: <em>{error.message}</em></p>
      case !isFetching && !error && !!thread:
        return <ThreadContent {...thread} />
      default: return <p>Oops I lost it :(</p>
    }
  }

  render () {
    const { thread } = this.props

    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = ({ threadsByBoard: { threads, error, isFetching } }, ownProps) => ({
  thread: threads[ownProps.match.params.thread] || null,
  isFetching,
  error
})

export default connect(mapStateToProps, { fetchSingleThread })(ThreadPage)
