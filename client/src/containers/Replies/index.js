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

  state = {
    body: '',
    password: ''
  }

  componentDidMount () {
    const { board, thread } = this.props

    this.props.fetchReplies(board, thread)
  }

  handleBody = event => {
    this.setState({ body: event.target.value })
  }

  handlePassword = event => {
    this.setState({ password: event.target.value })
  }

  createReply = (event) => {
    event.preventDefault()

    const { body, password } = this.state
    const { board, thread } = this.props

    if (this.state.body.length > 3 && this.state.password.length > 5) {
      this.props.createReply({ body, password, board, thread })
      this.setState({
        body: '',
        password: ''
      })
    }
  }

  renderContent = () => {
    const { isFetching, error, replies, board, thread,
      createReply, updateReply, deleteReply
    } = this.props

    switch (true) {
      case isFetching && !replies.length > 0: return <Loader />
      // case !!error: return <p>Error: <em>{error.message}</em></p>
      case replies.length > 0:
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
        <strong>Reply to this thread</strong>
        <form onSubmit={this.createReply}>
          <div className='field'>
            <label className='label'>Password</label>
            <div className='control'>
              <input className='input' type='password' placeholder='password'
                value={this.state.password} onChange={this.handlePassword}
              />
            </div>
          </div>

          <div className='field'>
            <label className='label'>Body</label>
            <div className='control'>
              <input className='textarea' placeholder='your reply here'
                value={this.state.body} onChange={this.handleBody}
              />
            </div>
          </div>

          <button className='button is-success is-outlined'>
            <span className='icon is-small'>
              <i className='fa fa-check' aria-hidden='true' />
            </span>
            <span>Create Reply</span>
          </button>
        </form>

        <br />

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
