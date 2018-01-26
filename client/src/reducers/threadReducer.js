import * as types from 'actions/types'

const defaultState = {
  isFetching: false,
  error: null,
  threads: [],
  page: 1,
  limit: 50,
  boardName: null,
  lastUpdated: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_THREADS_REQUEST:
      return { ...state, isFetching: true }
    case types.FETCH_THREADS_FAILURE:
      return { ...defaultState, error: action.error }
    case types.FETCH_THREADS_SUCCESS:
      return { isFetching: false, error: null, lastUpdated: +new Date(), ...action.payload }
    default: return state
  }
}
