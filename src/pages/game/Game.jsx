import React, { useState, useEffect } from 'react';
import { Board } from './game-components/board/Board';
import { Keyboard } from './game-components/keyboard/Keyboard';
import { PlayersList } from './game-components/players-list/PlayerList';

export const Game = ({ socketIo }) => {
  const [chooseLetter, setChooseLetter] = useState('');
  const [players, setPlayers] = useState([]);
  const [word, setWord]=useState('Naranja')
  const [board, setBoard] = useState(Array(7).fill('_'));


  useEffect(() => {
    if (socketIo) {
      //chooseLetter
      socketIo.emit('stateGame', chooseLetter);

      socketIo.on('newStateGame', (data) => {
        console.log('Received newStateGame:', );
        setBoard(data[0]);
        setPlayers(data[1]);
      }); 
    }
  }, [chooseLetter, socketIo]); 

  

  return (
    <div>
      <Board chooseLetter={chooseLetter} socketIo={socketIo} board = {board} />
      <Keyboard setChooseLetter={setChooseLetter}  />
      <PlayersList players={players} />
    </div>
  );
};
