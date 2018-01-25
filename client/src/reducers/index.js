// reducers/index.js - the root reducer

import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'

import threadReducer from './threadReducer'

// root reducer
export default combineReducers({
  form: reduxForm,
  threadsByBoard: threadReducer
})
