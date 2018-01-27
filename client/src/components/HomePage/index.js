import React from 'react'

import { Link } from 'react-router-dom'

export default () => {
  return (
    <div className='has-text-centered'>
      <h1 className='title'>Homepage</h1>
      <Link to='/b/testboard'>Test Board</Link>
    </div>
  )
}
