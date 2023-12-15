import React, {useState} from 'react'
import { Board } from './game-components/board/Board'
import { Keyboard } from './game-components/keyboard/Keyboard'
import { PlayersList } from './game-components/players-list/PlayerList'
import { players } from '../test/test'


export const Game = () => {
    const [move, setMove] = useState('')
    
  return (
    <div>
        <Board move={move}/>
        <Keyboard setMove={setMove}/>
        <PlayersList players={players}/>
    </div>
  )
}