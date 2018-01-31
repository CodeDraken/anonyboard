import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

import { fetchReplies } from 'actions/replyActions'
import Loader from 'components/Loader'
import ReplyList from 'components/ReplyList'

export class Replies extends PureComponent {
  static propTypes = {
    fetchReplies: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { board, thread } = this.props.match.params

    this.props.fetchReplies(board, thread)
  }

  renderContent = () => {

  }

  render () {
    console.log(this.props)
    return (
      <div>
        Replies Component
        { this.renderContent() }
      </div>
    )
  }
}

const mapStateToProps = ({ replies }) => ({ replies })

export default connect(mapStateToProps, { fetchReplies })(Replies)
