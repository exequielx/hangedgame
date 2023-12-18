import React from 'react'
import classes from '@/styles/Cell.module.css'

const Cell = ({ children }) => {
  return (
    <div className={classes.letter}>
      {children}
    </div>
  )
}

export default Cell;