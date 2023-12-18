import React, { useState, useEffect } from 'react';
import Board from './components/board/Board';
import Keyboard from './components/keyboard/Keyboard';
import Players from './components/players/Players';

export const Game = ({ socketIo }) => {
  const [players, setPlayers] = useState([]);
  const [word, setWord] = useState();
  const [winner, setWinner] = useState();
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    if (!socketIo) { return; }
    socketIo.on('updategame', (data) => {
      setWinner(data.winner);
      setWord(data.word);
      setPlayers(data.players);
    });
  }, [socketIo]);

  const onChangeLetter = (letter) => {
    socketIo.emit('play', letter);
  }

  const onStart = () => {
    setIsStarting(true);
    socketIo.emit('start');
    setTimeout(() => {
      setIsStarting(false);
    }, 3000);
  }

  if (!socketIo) { return 'loading...'; }

  if (isStarting) { return 'starting game...'; }

  if (!word) {
    return (
      <div>
        <button onClick={onStart}>start</button>
        <Players data={players} />
      </div>
    );
  }

  return (
    <div>
      <Board word={word} />
      {winner && <div>yeeeah ganaste!!!</div>}
      {!winner && <Keyboard onChange={onChangeLetter} />}
      <Players data={players} />
    </div>
  );
};
