import React, { PureComponent } from 'react'

import moment from 'moment'

export default class ReplyControls extends PureComponent {
  render () {
    const { createdAt, upvote, downvote, report, rateReply } = this.props

    return (
      <React.Fragment>
        <small className='level-item has-text-grey'>
          {moment(createdAt).fromNow()}
        </small>
        <span className='level-item has-text-grey'>|</span>

        <button onClick={rateReply('upvote')}
          type='button' className='button' aria-label='thumbs up'>
          <i className='fa fa-thumbs-o-up' aria-hidden='true' />
        </button>

        <span className='has-margin-tiny' />

        <button onClick={rateReply('downvote')}
          type='button' className='button' aria-label='thumbs down'>
          <i className='fa fa-thumbs-o-down' aria-hidden='true' />
        </button>

        <span className='has-margin-tiny' />

        <button onClick={rateReply('report')}
          type='button' className='button is-danger is-outlined'>
          <span className='icon is-small'>
            <i className='fa fa-flag' aria-hidden='true' />
          </span>
        </button>
      </React.Fragment>
    )
  }
}
