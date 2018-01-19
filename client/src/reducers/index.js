// reducers/index.js - the root reducer

import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'

// root reducer
export default combineReducers({
  form: reduxForm
})
