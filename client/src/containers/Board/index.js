import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchThreads } from 'actions/threadActions'

export class Board extends Component {
  static propTypes = {
    fetchThreads: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.fetchThreads()
  }

  render () {
    console.log(this.props.threadsByBoard)
    return (
      <div>
        <h1>/b/{this.props.match.params.board}</h1>
      </div>
    )
  }
}

const mapStateToProps = ({ threadsByBoard }) => ({
  threadsByBoard
})

export default connect(mapStateToProps, { fetchThreads })(Board)
