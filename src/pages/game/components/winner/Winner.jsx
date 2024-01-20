import React from 'react'
import styles from '@/styles/Winner.module.css'
//
export const Winner = ({ winner, onStart }) => {
    return (
        <div className={styles.WinnerBox}>
            Yeeeah ganó {winner}!!!
            <button onClick={onStart}>volver a jugar</button>
        </div>
    )

}
