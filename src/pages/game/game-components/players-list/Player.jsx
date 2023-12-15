import React from 'react'



export const Player= ({player}) => {
  return (
    <div className='player'>
      <div className='ahorcado'></div>
      <img src= '/images/ahorcado.png' alt={`vidas=${player.life}`}  />
      <span>{player.name} </span>
      <span>{player.score}</span>
    </div>
  )
}