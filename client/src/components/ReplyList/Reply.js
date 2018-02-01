import React, { PureComponent } from 'react'
import moment from 'moment'

import colorScale from 'utils/colorScale'
import ReplyControls from './ReplyControls'

export default class Reply extends PureComponent {
  state = {
    edit: false,
    password: '',
    body: this.props.body
  }

  handleEditReply = () => {
    this.setState({ edit: !this.state.edit })
  }

  handleBody = event => {
    this.setState({ body: event.target.value })
  }

  handlePassword = event => {
    this.setState({ password: event.target.value })
  }

  handleRateReply = type => () => {
    const { _id, board, thread } = this.props
    const { body } = this.state

    this.props.replyActions.updateReply({type, id: _id, board, thread, body})
  }

  handleUpdateReply = () => {
    const { _id, board, thread } = this.props
    const { password, body } = this.state

    if (password.length > 0 && body.length > 0 && body !== this.props.body) {
      this.props.replyActions.updateReply({ type: 'update', id: _id, board, thread, body, password })
      this.setState({
        edit: false,
        password: ''
      })
    }
  }

  render () {
    const { body, createdAt, reports, votes, _id } = this.props

    return (
      <li className='box'>
        <div className='media'>
          <div className='media-left title is-5'>
            <br />
            <strong className={colorScale([-5, -3, 0, 5, 10], votes)}>{votes}</strong>
          </div>

          <div className='media-content'>
            <div className='content'>
              <small className='has-text-grey'>{ _id }</small>
              <br />
              {
                this.state.edit
                  ? <textarea className='textarea' value={this.state.body} onChange={this.handleBody} />
                  : <p className='has-text-dark'>{body}</p>
              }

            </div>

            <nav className='level is-mobile'>
              <div className='level-left'>

                {
                  this.state.edit
                    ? <button onClick={this.handleUpdateReply}
                      type='button' className='button is-success is-outlined'>
                      <span className='icon is-small'>
                        <i className='fa fa-check' aria-hidden='true' />
                      </span>
                    </button>
                    : <ReplyControls
                      {...{createdAt, reports}}
                      rateReply={this.handleRateReply}
                      />
                }

                <span className='has-margin-tiny' />

                <button onClick={this.handleEditReply}
                  type='button' className='button is-info is-outlined'>
                  <span className='icon is-small'>
                    {
                      !this.state.edit
                        ? <i className='fa fa-pencil' aria-hidden='true' />
                        : <i className='fa fa-times' aria-hidden='true' />
                    }

                  </span>
                </button>

                <span className='has-margin-tiny' />

                <input
                  className='input'
                  name='password'
                  placeholder='password'
                  type='password'
                  value={this.state.password}
                  onChange={this.handlePassword}
                />
              </div>
            </nav>
          </div>
        </div>
      </li>
    )
  }
}
