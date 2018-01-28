import * as types from 'actions/types'

const defaultState = {
  isFetching: false,
  error: null,
  threads: {},
  page: 1,
  limit: 50,
  boardName: null,
  lastUpdated: null
}

const formatThreads = threads => threads.reduce((acc, thread) => {
  acc[thread._id] = thread
  return acc
}, {})

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_SINGLE_THREAD_REQUEST:
    case types.FETCH_THREADS_REQUEST:
      return { ...state, isFetching: true }

    case types.FETCH_SINGLE_THREAD_FAILURE:
    case types.FETCH_THREADS_FAILURE:
      return { ...state, isFetching: false, error: action.error }

    case types.FETCH_THREADS_SUCCESS:
      return {
        isFetching: false,
        error: null,
        lastUpdated: +new Date(),
        ...action.payload,
        threads: formatThreads(action.payload.threads)
      }

    case types.UPDATE_THREAD_SUCCESS:
    case types.FETCH_SINGLE_THREAD_SUCCESS:
      return {
        isFetching: false,
        error: null,
        threads: {
          ...state.threads,
          [action.payload._id]: action.payload
        }
      }

    default: return state
  }
}
