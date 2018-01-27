import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
    replyCount: PropTypes.number.isRequired
  }

  render () {
    const { title, _id, body, board, bumpedAt, createdAt, reports, votes, replyCount } = this.props

    return (
      <div className='container'>
        <nav className='breadcrumb' aria-label='breadcrumbs'>
          <ul>
            <li><Link to={`/b/${board}`}>{board}</Link></li>
            <li className='is-active'><a href='#' aria-current='page'>{title}</a></li>
          </ul>
        </nav>
        <article className='columns is-centered is-mobile has-text-centered'>
          <div className='column'>
            <h2 className='title'>{title}</h2>
            <p>{body}</p>
          </div>
        </article>
      </div>
    )
  }
}
