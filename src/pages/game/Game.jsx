import React, { useState, useEffect } from 'react';
import Board from './components/board/Board';
import Keyboard from './components/keyboard/Keyboard';
import Players from './components/players/Players';
import styles from '@/styles/Game.module.css'

export const Game = ({ socketIo }) => {
  const [players, setPlayers] = useState([]);
  const [word, setWord] = useState();
  const [winner, setWinner] = useState();
  const [turn, setTurn] = useState();
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    if (!socketIo) { return; }
    socketIo.on('updategame', (data) => {
      setWinner(data.winner);
      setWord(data.word);
      setPlayers(data.players);
      setTurn(data.turn);
    });
  }, [socketIo]);

  const onChangeLetter = (letter) => {
    if(socketIo.id == turn){
      socketIo.emit('play', letter);
    } 
      
  }

  const onStart = () => {
    setWinner(undefined)
    setIsStarting(true);
    socketIo.emit('start');
    setTimeout(() => {
      setIsStarting(false);
    }, 3000);
  }

  if (!socketIo) { return <div className={styles.loader} >  </div>; }

  if (isStarting) { return <div className={styles.loader}   >   </div> }

  if (!word) {
    return (
      <div className={styles.centerbox}>
        <button style={{ padding: 10 }} onClick={onStart}>Start Game</button>
        <Players data={players} />
      </div>
    );
  }

  return (
    <div className={styles.centerbox}>
      <Board word={word} />
      {winner &&
                <div className={styles.WinnerBox}>
                   yeeeah ganó {turn}!!!
                  <button onClick={onStart}>volver a jugar</button>

                </div>}
      {!winner && <Keyboard onChange={onChangeLetter} />}
      <Players data={players} turn={turn} />
    </div>
  );
};
