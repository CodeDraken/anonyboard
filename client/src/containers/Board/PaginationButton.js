import React, { PureComponent } from 'react'

export default class PaginationButton extends PureComponent {
  render () {
    const { handleClick, page, isActive } = this.props
    const activeClass = isActive ? 'is-current' : ''

    return (
      <li><a
        className={`pagination-link ${activeClass}`}
        aria-label={`Goto page ${page}`}
        onClick={() => handleClick(page)}
        >
        {page}
      </a></li>
    )
  }
}
