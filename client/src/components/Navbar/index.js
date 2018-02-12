import React, { PureComponent } from 'react'

import { Link } from 'react-router-dom'

export default class Navbar extends PureComponent {
  render () {
    return (
      <nav className='navbar' aria-label='main navigation'>
        <div className='navbar-brand'>
          <Link to='/' className='navbar-item'>
            <h1 className='title is-4 has-text-primary'>Anonyboard</h1>
          </Link>
        </div>
        <div className='navbar-menu is-active is-mobile'>
          <div className='navbar-start is-hidden-touch'>
            <div className='navbar-item field has-addons'>
              <div className='control has-icons-left'>
                <input className='input is-small' placeholder='search' />
                <span className='icon is-small is-left'>
                  <i className='fa fa-search' />
                </span>
              </div>
            </div>
          </div>

          <div className='navbar-end'>
            <Link to='/' className='navbar-item'>Home</Link>
            <Link to='/b/testboard' className='navbar-item'>Test Board</Link>
            {/* <Link to='/b/testboard' className='navbar-item'>Test Board</Link> */}
            <Link to='/b/new' className='navbar-item'>Add Post</Link>
          </div>
        </div>
      </nav>
    )
  }
}
