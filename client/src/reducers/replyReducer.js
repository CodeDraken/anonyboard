import * as types from 'actions/types'

const defaultState = {
  isFetching: false,
  error: null,
  replies: [],
  page: 1,
  limit: 25,
  skip: 0,
  lastUpdated: null,
  replyId: null
}

const formatThreads = replies => replies.reduce((acc, reply) => {
  acc[reply._id] = reply
  return acc
}, {})

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.UPDATE_REPLY_REQUEST:
    case types.FETCH_REPLIES_REQUEST:
      return { ...state, isFetching: true }

    case types.UPDATE_REPLY_FAILURE:
    case types.FETCH_REPLIES_FAILURE:
      return { ...state, isFetching: false, error: action.error }

    case types.FETCH_REPLIES_SUCCESS:
      return {
        isFetching: false,
        error: null,
        lastUpdated: +new Date(),
        ...action.payload
      }

    case types.UPDATE_REPLY_SUCCESS:
      return {
        isFetching: false,
        error: null,
        boardName: action.payload.board || null,
        replies: [
          ...state.replies,
          action.payload
        ]
      }

    default: return state
  }
}
