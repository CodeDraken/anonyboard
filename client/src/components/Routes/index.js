// Routes.js - React Router routes

import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomePage from 'components/HomePage'
import Board from 'containers/Board'

const dummy = name => () => <div>{name}</div>

// shortest routes on bottom, more specific on top
export default (
  <Switch>
    <Route exact path='/b/:board/:thread' component={dummy('single thread - get replies')} />
    <Route exact path='/b/new' component={dummy('new thread - new thread form')} />
    <Route exact path='/b/:board' component={Board} />
    <Route exact path='/' component={HomePage} />
  </Switch>
)
