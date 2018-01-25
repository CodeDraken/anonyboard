import React, { PureComponent } from 'react'

import { Link } from 'react-router-dom'

export default class Navbar extends PureComponent {
  render () {
    return (
      <nav className='navbar'>
        <div className='nav-wrapper'>
          <Link to='/' className='brand-logo'>
            Anonyboard
          </Link>
          <input className='search-input' placeholder='search' />
          <ul className='nav-items'>
            <Link to='/'>Home</Link>
            <Link to='/b/new'>Add Post</Link>
          </ul>
        </div>
      </nav>
    )
  }
}
