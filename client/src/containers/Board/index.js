import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

import { fetchThreads } from 'actions/threadActions'
import Loader from 'components/Loader'
import CardList from 'components/CardList'

export class Board extends Component {
  static propTypes = {
    fetchThreads: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { board } = this.props.match.params

    if (!this.props.threads || this.props.boardName !== board) {
      this.props.fetchThreads(board)
    } else if (Date.now() - this.props.lastUpdated > 60000) {
      this.props.fetchThreads(board)
    }
  }

  componentWillUpdate (nextProps) {
    const nextBoard = nextProps.match.params.board
    const { board } = this.props.match.params

    if (nextBoard !== board) {
      this.props.fetchThreads(nextBoard)
    }
  }

  renderContent = () => {
    const { isFetching, error, threads } = this.props
    const { board } = this.props.match.params

    const matchingThreads = Object.keys(threads)
      .filter(id => threads[id].board === board)
      .reduce((acc, id) => {
        acc[id] = threads[id]
        return acc
      }, {})

    switch (true) {
      case isFetching: return <Loader />
      case !!error: return <p>Error: <em>{error.message}</em></p>
      case !isFetching && !error && !!matchingThreads:
        return <CardList data={matchingThreads} />
      default: return <p>No threads here :(</p>
    }
  }

  render () {
    const { lastUpdated, page, limit } = this.props

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

        <p className='has-text-centered'>Last updated: {new Date(lastUpdated).toLocaleTimeString()}</p>

        <hr />
        {
          this.renderContent()
        }
        <br />
        <button type='button' className='button'>Load more</button>
        <br />
      </div>
    )
  }
}

const mapStateToProps = ({ threadsByBoard: { isFetching, error, boardName, threads, lastUpdated } }) => ({
  threads,
  isFetching,
  error,
  boardName,
  lastUpdated
})

export default connect(mapStateToProps, { fetchThreads })(Board)

// <span className='column'>Page: {page}</span>
// <span className='column'>Last updated: {new Date(lastUpdated).toLocaleTimeString()}</span>
