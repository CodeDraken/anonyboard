import React from 'react'
import { shallow } from 'enzyme'

import App from 'containers/App'

describe('App', () => {
  it('test suite works properly', () => {
    expect(5 + 5).toBe(10)
  })

  it('shallow renders without crashing', () => {
    shallow(<App />)
  })
})
