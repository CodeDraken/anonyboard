import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'

import * as types from 'actions/types'
import * as actions from 'actions/replyActions'
import { mockReplyArray, mockReplyData, mockNewReply, mockUpdate } from 'mocks/mockedData'

const middlewares = [ thunk ]
const createMockStore = configureMockStore(middlewares)

describe('reply actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  describe('fetchReplies', () => {
    it('correctly dispatches FETCH_REPLIES types', async () => {
      const store = createMockStore({ replies: {} })
      const expectedActions = [
        { type: types.FETCH_REPLIES_REQUEST },
        { type: types.FETCH_REPLIES_SUCCESS, payload: mockReplyData }
      ]

      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: mockReplyData
        })
      })

      await store.dispatch(actions.fetchReplies('testboard', mockReplyArray[0].thread))
      const dispatchedActions = store.getActions()

      expect(dispatchedActions[0]).toEqual(expect.objectContaining(expectedActions[0]))

      expect(dispatchedActions[1]).toEqual(expect.objectContaining(expectedActions[1]))
    })
  })

  describe('createReply', () => {
    it('correctly dispatches CREATE_REPLY types', async () => {
      const store = createMockStore({ replies: {} })
      const expectedActions = [
        { type: types.CREATE_REPLY_REQUEST },
        { type: types.CREATE_REPLY_SUCCESS, payload: mockNewReply }
      ]

      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: mockNewReply
        })
      })

      await store.dispatch(actions.createReply(mockNewReply))
      const dispatchedActions = store.getActions()

      expect(dispatchedActions[0]).toEqual(expect.objectContaining(expectedActions[0]))

      expect(dispatchedActions[1]).toEqual(expect.objectContaining(expectedActions[1]))
    })
  })

  describe('updateReply', () => {
    it('correctly dispatches UPDATE_REPLY types', async () => {
      const store = createMockStore({ replies: {} })
      const expectedActions = [
        { type: types.UPDATE_REPLY_REQUEST },
        { type: types.UPDATE_REPLY_SUCCESS, payload: mockReplyArray[0] }
      ]

      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: mockReplyArray[0]
        })
      })

      await store.dispatch(actions.updateReply(mockUpdate))
      const dispatchedActions = store.getActions()

      expect(dispatchedActions[0]).toEqual(expect.objectContaining(expectedActions[0]))

      expect(dispatchedActions[1]).toEqual(expect.objectContaining(expectedActions[1]))
    })
  })

  describe('deleteReply', () => {
    it('correctly dispatches DELETE_REPLY types', async () => {
      const store = createMockStore({ replies: {} })
      const expectedActions = [
        { type: types.DELETE_REPLY_REQUEST },
        { type: types.DELETE_REPLY_SUCCESS, payload: mockReplyArray[0] }
      ]

      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: mockReplyArray[0]
        })
      })

      await store.dispatch(actions.deleteReply({
        id: mockReplyArray[0]._id,
        password: '123abc',
        board: 'testboard'
      }))
      const dispatchedActions = store.getActions()

      expect(dispatchedActions[0]).toEqual(expect.objectContaining(expectedActions[0]))

      expect(dispatchedActions[1]).toEqual(expect.objectContaining(expectedActions[1]))
    })
  })
})
