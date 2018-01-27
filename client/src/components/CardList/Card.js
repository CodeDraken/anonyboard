import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class Card extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    votes: PropTypes.number,
    createdAt: PropTypes.string,
    replyCount: PropTypes.number
  }

  render () {
    const { title, body, votes, createdAt, replyCount } = this.props

    return (
      <div className='box'>
        <article className='media'>
          <div className='media-left title is-5'>
            <br />
            <strong className='has-text-danger'>{votes}</strong>
          </div>

          <div className='media-content'>
            <div className='content'>
              <p>
                <strong className='title is-5'>{title} </strong>
                <br />
                {body.slice(0, window.innerWidth / 2)}
              </p>
            </div>

            <nav className='level is-mobile'>
              <div className='level-left'>
                <small className='level-item has-text-grey'>
                  {moment(createdAt).fromNow()}
                </small>
                <span className='level-item has-text-grey'>|</span>
                <a className='level-item has-text-danger'>
                  <span className='icon is-small'>
                    <i className='fa fa-commenting' aria-hidden='true' />
                  </span>
                  <span>&nbsp;{replyCount} comments</span>
                </a>
              </div>
            </nav>
          </div>
        </article>
      </div>
    )
  }
}
