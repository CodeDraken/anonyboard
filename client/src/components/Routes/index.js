// Routes.js - React Router routes

import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomePage from 'components/HomePage'

const dummy = name => () => <div>{name}</div>

// shortest routes on bottom, more specific on top
export default (
  <Switch>
    <Route exact path='/b/:board/new' component={dummy('new thread - new thread form')} />
    <Route exact path='/b/:board/:thread' component={dummy('single thread - get replies')} />
    <Route exact path='/b/:board' component={dummy('board - get all threads')} />
    <Route exact path='/' component={HomePage} />
  </Switch>
)
