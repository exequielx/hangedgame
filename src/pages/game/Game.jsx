import React, {useState} from 'react'
import { Board } from './game-components/board/Board'
import { Keyboard } from './game-components/keyboard/Keyboard'
import { PlayersList } from './game-components/players-list/PlayerList'
import { players } from '../api/test/test'


export const Game = () => {
    const [playerMove, setplayerMove] = useState('')
    
  return (
    <div>
        <Board playerMove={playerMove}/>
        <Keyboard setplayerMove={setplayerMove}/>
        <PlayersList players={players}/>
    </div>
  )
}