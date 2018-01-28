import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'

import colorScale from 'utils/colorScale'

export default class Card extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    votes: PropTypes.number,
    createdAt: PropTypes.string,
    replyCount: PropTypes.number,
    board: PropTypes.string,
    _id: PropTypes.string
  }

  render () {
    const { title, body, votes, createdAt, replyCount, _id, board } = this.props

    return (
      <li className='box'>
        <article className='media'>
          <div className='media-left title is-5'>
            <br />
            <strong className={colorScale([-5, -3, 0, 5, 10], votes)}>{votes}</strong>
          </div>

          <div className='media-content'>
            <Link to={`/b/${board}/${_id}`} className='content'>
              <p className='has-text-dark'>
                <strong className='title is-5'>{title}</strong>
                <br />
                {body.slice(0, window.innerWidth / 2)}
              </p>
            </Link>

            <nav className='level is-mobile'>
              <div className='level-left'>
                <small className='level-item has-text-grey'>
                  {moment(createdAt).fromNow()}
                </small>
                <span className='level-item has-text-grey'>|</span>
                <Link to={`/b/${board}/${_id}`} className='level-item has-text-danger'>
                  <span className='icon is-small'>
                    <i className='fa fa-commenting' aria-hidden='true' />
                  </span>
                  <span>&nbsp;{replyCount} comments</span>
                </Link>
              </div>
            </nav>
          </div>
        </article>
      </li>
    )
  }
}
