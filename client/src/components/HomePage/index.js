import React from 'react'

import { Link } from 'react-router-dom'

export default () => {
  return (
    <div className='has-text-centered columns'>
      <div className='column'>
        <h1 className='title'>Welcome, to Anonyboard!</h1>
        <p>This is an anonymous messaging board. There are no user accounts, instead you use a password to manage your replies / threads. There are an unlimited amount of boards. To go to a board go to any /b/:board url. There are some examples below.</p>
        <Link className='button has-margin-tiny' to='/b/testboard'>TestBoard</Link>
        <Link className='button has-margin-tiny' to='/b/random'>Random</Link>
        <Link className='button has-margin-tiny' to='/b/programming'>Programming</Link>
      </div>
    </div>
  )
}
