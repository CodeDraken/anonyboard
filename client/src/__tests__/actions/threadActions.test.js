import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'

import * as types from 'actions/types'
import * as actions from 'actions/threadActions'
import { mockThreadArray, mockBoard, mockNewThread, mockUpdate } from 'mocks/mockedData'

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
        { type: types.FETCH_THREADS_SUCCESS, payload: mockBoard }
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

      expect(dispatchedActions[0]).toEqual(expect.objectContaining(expectedActions[0]))

      expect(dispatchedActions[1]).toEqual(expect.objectContaining(expectedActions[1]))
    })
  })

  describe('createThread', () => {
    it('correctly dispatches CREATE_THREAD types', async () => {
      const store = createMockStore({ threads: [] })
      const expectedActions = [
        { type: types.CREATE_THREAD_REQUEST },
        { type: types.CREATE_THREAD_SUCCESS, payload: mockNewThread }
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

      expect(dispatchedActions[0]).toEqual(expect.objectContaining(expectedActions[0]))

      expect(dispatchedActions[1]).toEqual(expect.objectContaining(expectedActions[1]))
    })
  })

  describe('updateThread', () => {
    it('correctly dispatches UPDATE_THREAD types', async () => {
      const store = createMockStore({ threads: [] })
      const expectedActions = [
        { type: types.UPDATE_THREAD_REQUEST },
        { type: types.UPDATE_THREAD_SUCCESS, payload: mockThreadArray[0] }
      ]

      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: mockThreadArray[0]
        })
      })

      await store.dispatch(actions.updateThread(mockUpdate))
      const dispatchedActions = store.getActions()

      expect(dispatchedActions[0]).toEqual(expect.objectContaining(expectedActions[0]))

      expect(dispatchedActions[1]).toEqual(expect.objectContaining(expectedActions[1]))
    })
  })

  describe('deleteThread', () => {
    it('correctly dispatches DELETE_THREAD types', async () => {
      const store = createMockStore({ threads: [] })
      const expectedActions = [
        { type: types.DELETE_THREAD_REQUEST },
        { type: types.DELETE_THREAD_SUCCESS, payload: mockThreadArray[0] }
      ]

      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: mockThreadArray[0]
        })
      })

      await store.dispatch(actions.deleteThread({
        id: mockThreadArray[0]._id,
        password: '123abc',
        board: 'testboard'
      }))
      const dispatchedActions = store.getActions()

      expect(dispatchedActions[0]).toEqual(expect.objectContaining(expectedActions[0]))

      expect(dispatchedActions[1]).toEqual(expect.objectContaining(expectedActions[1]))
    })
  })
})
