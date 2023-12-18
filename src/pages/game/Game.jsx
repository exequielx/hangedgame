import React, { useState, useEffect } from 'react';
import { Board } from './game-components/board/Board';
import { Keyboard } from './game-components/keyboard/Keyboard';
import { PlayersList } from './game-components/players-list/PlayerList';

export const Game = ({ socketIo }) => {
  const [chooseLetter, setChooseLetter] = useState('');
  const [players, setPlayers] = useState([]);
  const [word, setWord]=useState('Naranja')

  useEffect(() => {
    if (socketIo) {

      socketIo.on('players', (_player) => {
        setPlayers(_player);
      });
      socketIo.on('word', (selectedWord) => {
        setWord(selectedWord);
      });
    }
  }, [socketIo]); 

  return (
    <div>
      <Board chooseLetter={chooseLetter} socketIo={socketIo} word = {word} />
      <Keyboard setChooseLetter={setChooseLetter}  />
      <PlayersList players={players} />
    </div>
  );
};
