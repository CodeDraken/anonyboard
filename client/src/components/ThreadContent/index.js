import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'

import colorScale from 'utils/colorScale'

export default class ThreadContent extends PureComponent {
  state = {
    edit: false,
    password: '',
    body: this.props.body || '',
    title: this.props.title || ''
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    board: PropTypes.string.isRequired,
    bumpedAt: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    reports: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
    replyCount: PropTypes.number.isRequired,
    threadActions: PropTypes.object.isRequired
  }

  handleEditThread = () => {
    this.setState({ edit: !this.state.edit })
  }

  handleBody = event => {
    this.setState({ body: event.target.value })
  }

  handlePassword = event => {
    this.setState({ password: event.target.value })
  }

  handleTitle = event => {
    this.setState({ title: event.target.value })
  }

  handleRateThread = type => () => {
    const { _id, board, thread } = this.props

    this.props.threadActions.updateThread({ type, id: _id, board, thread })
  }

  handleDeleteThread = () => {
    const { _id, board, thread } = this.props
    const { password } = this.state

    if (password.length > 5) {
      this.props.threadActions.deleteThread({ id: _id, board, thread, password, history: this.props.history })

      this.setState({
        edit: false,
        password: ''
      })
    }
  }

  handleUpdateThread = () => {
    const { _id, board, thread } = this.props
    const { password, body, title } = this.state

    if (password.length > 5 && body.length > 3 && body !== this.props.body) {
      this.props.threadActions.updateThread({ type: 'update', id: _id, board, thread, title, body, password })
      this.setState({
        edit: false,
        password: ''
      })
    }
  }

  render () {
    const { title, _id, body, board, bumpedAt, createdAt, reports, votes, replyCount } = this.props

    return (
      <div className='container has-padding-small'>
        <nav className='breadcrumb is-centered' aria-label='breadcrumbs'>
          <ul>
            <li><Link to={`/b/${board}`}>{board}</Link></li>
            <li className='is-active'><a href='#' aria-current='page'>{title}</a></li>
          </ul>
        </nav>

        {
          this.state.edit
            ? (
              <React.Fragment>
                <input
                  className='input'
                  name='password'
                  placeholder='password'
                  type='password'
                  value={this.state.password}
                  onChange={this.handlePassword}
                />

                <button onClick={this.handleUpdateThread}
                  type='button' className='button is-success is-outlined'>
                  <span className='icon is-small'>
                    <i className='fa fa-check' aria-hidden='true' />
                  </span>
                </button>

                <span className='has-margin-tiny' />

                <button onClick={this.handleDeleteThread}
                  type='button' className='button is-danger is-outlined'>
                  <span className='icon is-small'>
                    <i className='fa fa-trash' aria-hidden='true' />
                  </span>
                </button>
              </React.Fragment>
            )
            : null
        }

        <hr />

        <div className='columns'>

          <aside className='column is-one-fifth is-hidden-mobile'>
            <button onClick={this.handleRateThread('report')}
              type='button' className='button is-danger is-outlined'>
              <span className='icon is-small'>
                <i className='fa fa-flag' aria-hidden='true' />
              </span>
              <span>Report</span>
            </button>
            <br />
            <small>Created {moment(createdAt).fromNow()}</small>
            <br />
            <small>Bumped {moment(bumpedAt).fromNow()}</small>
            <br />
            <small>Reports:&nbsp;
              <span className={colorScale([5, 3, 0], reports)}>
                {reports}
              </span>
            </small>
            <br />
            <small>Votes:&nbsp;
              <span className={colorScale([-10, -3, 0, 5, 10], votes)}>
                {votes}
              </span>
            </small>
            <br />
            <div>
              <button onClick={this.handleRateThread('upvote')}
                type='button' className='button' aria-label='thumbs up'>
                <i className='fa fa-thumbs-o-up' aria-hidden='true' />
              </button>
              <span className='has-margin-tiny' />
              <button onClick={this.handleRateThread('downvote')}
                type='button' className='button' aria-label='thumbs down'>
                <i className='fa fa-thumbs-o-down' aria-hidden='true' />
              </button>
            </div>
          </aside>

          <article className='column is-three-fifths'>
            <div>

              {
                this.state.edit
                  ? <React.Fragment>
                    <input className='input title' value={this.state.title} onChange={this.handleTitle} />
                    <textarea className='textarea' value={this.state.body} onChange={this.handleBody} />
                  </React.Fragment>
                  : <React.Fragment>
                    <h2 className='title has-text-centered'>{title}</h2>
                    <p className='has-text-dark'>{body}</p>
                  </React.Fragment>
              }
            </div>
          </article>

          <aside className='column is-one-fifth has-text-centered is-hidden-mobile'>
            <button onClick={this.handleEditThread}
              type='button' className='button is-info is-outlined'>
              <span>Edit</span>
              <span className='icon is-small'>
                <i className='fa fa-pencil' aria-hidden='true' />
              </span>
            </button>
          </aside>

        </div>

        <hr />

        <div>
          <p className='title has-text-centered is-4'>{replyCount} Replies</p>
          <p />
        </div>

      </div>
    )
  }
}
