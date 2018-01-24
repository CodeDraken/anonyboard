import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'

import * as types from 'actions/types'
import * as actions from 'actions/threadActions'
import { mockThreadArray, mockBoard, mockNewThread } from 'mocks/mockedData'

const middlewares = [ thunk ]
const createMockStore = configureMockStore(middlewares)

describe('thread actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  describe('fetchThreads', () => {
    it('correctly dispatches FETCH_THREADS types', async () => {
      const store = createMockStore({ threads: [] })
      const expectedActions = [
        { type: types.FETCH_THREADS_REQUEST },
        { type: types.FETCH_THREADS_SUCCESS, payload: [] }
      ]

      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: mockBoard
        })
      })

      await store.dispatch(actions.fetchThreads())
      const dispatchedActions = store.getActions()

      expect(dispatchedActions[0]).toEqual(expect.objectContaining({
        type: expectedActions[0].type
      }))

      expect(dispatchedActions[1]).toEqual(expect.objectContaining({
        type: expectedActions[1].type,
        payload: mockBoard
      }))
    })
  })

  describe('createThread', () => {
    it('correctly dispatches CREATE_THREAD types', async () => {
      const store = createMockStore({ threads: [] })
      const expectedActions = [
        { type: types.CREATE_THREAD_REQUEST },
        { type: types.CREATE_THREAD_SUCCESS, payload: [] }
      ]

      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: mockNewThread
        })
      })

      await store.dispatch(actions.createThread(mockNewThread))
      const dispatchedActions = store.getActions()

      expect(dispatchedActions[0]).toEqual(expect.objectContaining({
        type: expectedActions[0].type
      }))

      expect(dispatchedActions[1]).toEqual(expect.objectContaining({
        type: expectedActions[1].type,
        payload: mockNewThread
      }))
    })
  })
})
