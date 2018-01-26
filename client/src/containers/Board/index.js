import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchThreads } from 'actions/threadActions'
import Loader from 'components/Loader'

export class Board extends Component {
  static propTypes = {
    fetchThreads: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.fetchThreads()
  }

  renderContent = () => {
    const { isFetching, error, threads, lastUpdated, page, limit } = this.props.threadsByBoard

    switch (true) {
      case isFetching: return <Loader />
      case !!error: return <p>Error: <em>{error.message}</em></p>
      case !isFetching && !error && !!threads: return <div>Threads</div>
      default: return <div />
    }
  }

  render () {
    const { lastUpdated, page, limit } = this.props.threadsByBoard

    return (
      <div>
        <h1 className='title'>/b/{this.props.match.params.board}</h1>
        <div>
          <label htmlFor='limit'>
            Threads per page
            <select name='limit' defaultValue={limit}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </label>
          <span>Page: {page}</span>
          <span>Last updated: {new Date(lastUpdated).toLocaleTimeString()}</span>
        </div>
        <hr />
        {
          this.renderContent()
        }
      </div>
    )
  }
}

const mapStateToProps = ({ threadsByBoard }) => ({
  threadsByBoard
})

export default connect(mapStateToProps, { fetchThreads })(Board)
