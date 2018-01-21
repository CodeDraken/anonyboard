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
    return dispatch({ type: types.FETCH_THREADS_FAILURE, error })
  }
}
