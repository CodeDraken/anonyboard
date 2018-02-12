import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

import { fetchThreads } from 'actions/threadActions'
import Loader from 'components/Loader'
import CardList from 'components/CardList'
import PaginationButton from './PaginationButton'

export class Board extends Component {
  state = {
    page: 1,
    limit: 10
  }

  static propTypes = {
    fetchThreads: PropTypes.func.isRequired
  }

  componentDidMount () {
    // fetches for first time going to board page
    // will not run again if switching to another board from the board page
    const { board } = this.props.match.params
    const { page, limit } = this.state

    this.props.fetchThreads(board, page, limit)
  }

  componentWillUpdate (nextProps) {
    // covers case when switching to another board while on board page
    const nextBoard = nextProps.match.params.board
    const { board } = this.props.match.params
    const { page, limit } = this.state

    if (nextBoard !== board) {
      this.props.fetchThreads(nextBoard, page, limit)
    }
  }

  handleLimit = event => this.setState({ limit: +event.target.value })

  handlePage = (page) => {
    this.setState({ page })
  }

  incPage = n => () => {
    const { threads, fetchThreads } = this.props
    const { board } = this.props.match.params
    const { page, limit } = this.state
    const next = page + n

    if (next > 0 && n > 0 && Object.keys(threads).length) {
      this.setState({ page: next }, () => fetchThreads(board, this.state.page, this.state.limit))
    } else if (next > 0 && n < 0) {
      this.setState({ page: next }, () => fetchThreads(board, this.state.page, this.state.limit))
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
      case !!error: return <p>Error: <em>{error.message || error}</em></p>
      case !isFetching && !error && !!Object.keys(matchingThreads).length:
        return <CardList data={matchingThreads} />
      default: return <p>No threads here :(</p>
    }
  }

  render () {
    const { lastUpdated } = this.props
    const { page, limit } = this.state

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
          <div className='field'>
            <input name='limit' type='number' onChange={this.handleLimit} value={this.state.limit} />
          </div>
        </div>

        <nav className='pagination is-centered' role='navigation' aria-label='pagination'>
          <a className='pagination-previous' onClick={this.incPage(-1)}>Previous</a>
          <a className='pagination-next' onClick={this.incPage(1)}>Next page</a>
          <ul className='pagination-list'>
            <li><a className='pagination-link' aria-label={`you are on page ${page}`}>{page}</a></li>
          </ul>
          {/* <ul className='pagination-list'>
            <PaginationButton page={1} handleClick={this.handlePage} />
            <li><span className='pagination-ellipsis'>&hellip;</span></li>
            <li><a className='pagination-link' aria-label='Goto page 45'>45</a></li>
            <PaginationButton page={this.state.page} isActive handleClick={this.handlePage} />
            <li><a className='pagination-link' aria-label='Goto page 47'>47</a></li>
            <li><span className='pagination-ellipsis'>&hellip;</span></li>
            <li><a className='pagination-link' aria-label='Goto page 86'>86</a></li>
          </ul> */}
        </nav>

        <p className='has-text-centered'>Last updated: {new Date(lastUpdated).toLocaleTimeString()}</p>

        <hr />
        {
          this.renderContent()
        }
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
