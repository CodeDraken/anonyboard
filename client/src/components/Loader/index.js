import React from 'react'

import styles from './Loader.module.css'

export default () => {
  return (
    <div className='columns is-mobile is-centered'>
      <div>
        <div className={styles.spinner_loader} />
      </div>
    </div>
  )
}
