import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'

import colorScale from 'utils/colorScale'

export default class ThreadContent extends PureComponent {
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
    edit: PropTypes.func.isRequired
  }

  upvote = () => this.props.edit('upvote')

  downvote = () => this.props.edit('downvote')

  report = () => this.props.edit('report')

  editThread = () => {}

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

        <hr />

        <div className='columns'>

          <aside className='column is-one-fifth is-hidden-mobile'>
            <button onClick={this.report}
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
              <button onClick={this.upvote}
                type='button' className='button' aria-label='thumbs up'>
                <i className='fa fa-thumbs-o-up' aria-hidden='true' />
              </button>
              <span className='has-margin-tiny' />
              <button onClick={this.downvote}
                type='button' className='button' aria-label='thumbs down'>
                <i className='fa fa-thumbs-o-down' aria-hidden='true' />
              </button>
            </div>
          </aside>

          <article className='column is-three-fifths has-text-centered'>
            <div>
              <h2 className='title'>{title}</h2>
              <p>{body}</p>
            </div>
          </article>

          <aside className='column is-one-fifth has-text-centered is-hidden-mobile'>
            <button onClick={this.editThread}
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
