import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'

import * as types from 'actions/types'
import * as actions from 'actions/threadActions'

const middlewares = [ thunk ]
const createMockStore = configureMockStore(middlewares)

describe('thread actions', () => {
  const mockThreadArray = [{
    '_id': '5a601ab04850285e0994284a',
    'title': 'Test Thread 2',
    'body': 'Test Body 2'
  }]

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
          response: mockThreadArray
        })
      })

      await store.dispatch(actions.fetchThreads())
      const dispatchedActions = store.getActions()

      expect(dispatchedActions[0]).toEqual(expect.objectContaining({
        type: expectedActions[0].type
      }))

      expect(dispatchedActions[1]).toEqual(expect.objectContaining({
        type: expectedActions[1].type,
        payload: mockThreadArray
      }))
    })
  })
})
