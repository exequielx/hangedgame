import React from 'react'
import clases from '@/styles/Player.module.css'



export const Player= ({player}) => {
  return (
    <div className= {clases.player}>
      <div className={clases.ahorcado}></div>
      <img src= '/images/ahorcado.png' alt={`vidas=${player.life}`}  />
      <span>{player.name} </span>
      <span>{player.score}</span>
    </div>
  )
}