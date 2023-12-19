import React from 'react'
import classes from '@/styles/Player.module.css'

const Player = ({ player, colorized }) => {
  return (
    <div className={`${classes.player} ${colorized && classes.actual}`}>
      <div className={classes.ahorcado}></div>
      <img src='/images/ahorcado.png' alt={`vidas=${player?.life}`} />
      <span className={classes.name}>{player?.name} </span>
      <span>{player?.score}</span>
    </div>
  )
}

export default Player;