import React from 'react'
import clases from '@/styles/Cell.module.css'

export const Cell = ({children}) => {
  return (
    <div className={clases.letter}>
        {children}
    </div>
  )
}