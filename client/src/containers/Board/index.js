import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchThreads } from 'actions/threadActions'
import Loader from 'components/Loader'
import CardList from 'components/CardList'

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
      case !isFetching && !error && !!threads:
        return <CardList data={threads}>Threads</CardList>
      default: return <p>No threads here :(</p>
    }
  }

  render () {
    const { lastUpdated, page, limit } = this.props.threadsByBoard

    return (
      <div>
        <hr />
        <h1 className='title has-text-centered'>
          /b/{this.props.match.params.board}
        </h1>
        <div className='columns is-centered is-mobile'>
          <label htmlFor='limit'>
              Threads per page:&nbsp;
          </label>
          <div className='select'>
            <select name='limit' defaultValue={limit}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </div>
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

// <span className='column'>Page: {page}</span>
// <span className='column'>Last updated: {new Date(lastUpdated).toLocaleTimeString()}</span>
