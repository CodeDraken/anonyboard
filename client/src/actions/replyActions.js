import axios from 'axios'

import * as types from './types'

export const fetchReplies = (board, thread, page = 1, limit = 50) => async dispatch => {
  try {
    dispatch({ type: types.FETCH_REPLIES_REQUEST })

    page = page && typeof page === 'number' ? +page : 1
    limit = limit && typeof limit === 'number' ? +limit : 50

    if (!board || !thread) {
      return dispatch({ type: types.FETCH_REPLIES_FAILURE, error: 'Invalid board and/or thread ID' })
    }

    const res = await axios.get(`/api/replies/${board}/${thread}?page=${page}&limit=${limit}`)

    return dispatch({ type: types.FETCH_REPLIES_SUCCESS, payload: res.data })
  } catch (error) {
    console.log(error)
    return dispatch({ type: types.FETCH_REPLIES_FAILURE, error })
  }
}

export const createReply = ({ body, password, board, thread }) => async dispatch => {
  try {
    dispatch({ type: types.CREATE_REPLY_REQUEST })

    if (!body || !password || !board) {
      return dispatch({ type: types.CREATE_REPLY_FAILURE, error: 'Invalid reply!' })
    }

    const res = await axios.post(`/api/replies/${board}/${thread}`, { body, password })

    dispatch({ type: types.CREATE_REPLY_SUCCESS, payload: res.data })
  } catch (error) {
    return dispatch({ type: types.CREATE_REPLY_FAILURE, error })
  }
}

export const updateReply = ({ type, id, board, thread, title, body }) => async dispatch => {
  try {
    dispatch({ type: types.UPDATE_REPLY_REQUEST })

    if (!type || !id || !board) {
      return dispatch({ type: types.UPDATE_REPLY_FAILURE, error: 'Invalid type, id, or board' })
    }

    const res = await axios.patch(`/api/replies/${board}/${thread}`, { type, id, title, body })

    return dispatch({ type: types.UPDATE_REPLY_SUCCESS, payload: res.data })
  } catch (error) {
    return dispatch({ type: types.UPDATE_REPLY_FAILURE, error })
  }
}

export const deleteReply = ({ id, thread, board, password }) => async dispatch => {
  try {
    dispatch({ type: types.DELETE_REPLY_REQUEST })

    if (!id || !board || !password) {
      return dispatch({ type: types.DELETE_REPLY_FAILURE, error: 'Invalid type, id, or board' })
    }

    const res = await axios.patch(`/api/replies/${board}/${thread}`, { id, board, password })

    return dispatch({ type: types.DELETE_REPLY_SUCCESS, payload: res.data })
  } catch (error) {
    return dispatch({ type: types.DELETE_REPLY_FAILURE, error })
  }
}
