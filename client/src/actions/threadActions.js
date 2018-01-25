import axios from 'axios'

import * as types from './types'

export const fetchThreads = (board = 'testboard', page = 1, limit = 50) => async dispatch => {
  try {
    dispatch({ type: types.FETCH_THREADS_REQUEST })

    page = page && typeof page === 'number' ? +page : 1
    limit = limit && typeof limit === 'number' ? +limit : 50

    const res = await axios.get(`/api/threads/${board}?page=${page}&limit=${limit}`)

    return dispatch({ type: types.FETCH_THREADS_SUCCESS, payload: res.data })
  } catch (error) {
    console.log(error)
    return dispatch({ type: types.FETCH_THREADS_FAILURE, error })
  }
}

export const createThread = ({ title, body, password, board }) => async dispatch => {
  try {
    dispatch({ type: types.CREATE_THREAD_REQUEST })

    if (!title || !body || !password || !board) {
      return dispatch({ type: types.CREATE_THREAD_FAILURE, error: 'Invalid thread!' })
    }

    const res = await axios.post(`/api/threads/${board}`)

    return dispatch({ type: types.CREATE_THREAD_SUCCESS, payload: res.data })
  } catch (error) {
    return dispatch({ type: types.CREATE_THREAD_FAILURE, error })
  }
}

export const updateThread = ({ type, id, board, title, body }) => async dispatch => {
  try {
    dispatch({ type: types.UPDATE_THREAD_REQUEST })

    if (!type || !id || !board) {
      return dispatch({ type: types.UPDATE_THREAD_FAILURE, error: 'Invalid type, id, or board' })
    }

    const res = await axios.patch(`/api/threads/${board}`, { type, id, title, body })

    return dispatch({ type: types.UPDATE_THREAD_SUCCESS, payload: res.data })
  } catch (error) {
    return dispatch({ type: types.UPDATE_THREAD_FAILURE, error })
  }
}

export const deleteThread = ({ id, board, password }) => async dispatch => {
  try {
    dispatch({ type: types.DELETE_THREAD_REQUEST })

    if (!id || !board || !password) {
      return dispatch({ type: types.DELETE_THREAD_FAILURE, error: 'Invalid type, id, or board' })
    }

    const res = await axios.patch(`/api/threads/${board}`, { id, board, password })

    return dispatch({ type: types.DELETE_THREAD_SUCCESS, payload: res.data })
  } catch (error) {
    return dispatch({ type: types.DELETE_THREAD_FAILURE, error })
  }
}
