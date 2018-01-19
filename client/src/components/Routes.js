// Routes.js - React Router routes

import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomePage from './HomePage'

// shortest routes on bottom, more specific on top
export default (
  <Switch>
    <Route exact path='/' component={HomePage} />
  </Switch>
)
