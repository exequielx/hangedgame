import React from 'react'
import Players from '../players/Players'
import styles from '@/styles/Game.module.css'

export const Loggin = ({players, buttonFunction, onChangePlayerName}) => {
  return (
    <div className={styles.centerbox}>
        <label>Ingresa tu nombre</label>
        <input type="text" onChange={onChangePlayerName} /> 
        <button style={{ padding: 10 }} onClick={buttonFunction} >ir al lobby</button>

        <Players data={players} />
    </div>
  )
}
