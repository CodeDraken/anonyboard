import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Routes from 'components/Routes'

export class App extends Component {
  static propTypes = {}

  render () {
    return (
      <BrowserRouter>
        <React.Fragment>
          App
          <main className='container'>
            { Routes }
          </main>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App
