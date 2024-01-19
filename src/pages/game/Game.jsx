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
  const [isPlaying, setIsPlaying] = useState(false);
  const[namePlayer, setNamePlayer] = useState('');

  const onChangePlayerName = (e) => {
    setNamePlayer(e.target.value);
  }
  

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
  const onSubmitPlayerName = () => {
    socketIo.emit('newPlayer', namePlayer);
  }


  if (!socketIo) { return <div className={styles.loader}></div>; }

  if (isStarting) { return <div className={styles.loader}></div> }


  //cambiar por un componente y dinamizar con p`rops
  if (!word) {
    return (
      <div className={styles.centerbox}>
        <label>Ingresa tu nombre</label>
        <input type="text" onChange={onChangePlayerName} /> 
        <button style={{ padding: 10 }} onClick={() => {onStart(); setIsPlaying(true);}}>Start Game</button>
        <Players data={players} />
      </div>
    );
  }
  if (!isPlaying ) {
    return (
      <div className={styles.centerbox}>
        <label>Ingresa tu nombre</label>
        <input type="text" onChange={onChangePlayerName} /> 
        <button style={{ padding: 10 }} onClick={() => {onSubmitPlayerName(); setIsPlaying(true);}}>Start Game</button>
        <Players data={players} />
      </div>
    );
  }

  const colorKey = (socketIo.id == turn)
  return (
    <div className={styles.centerbox}>
      <Board word={word} />
      {winner &&
                <div className={styles.WinnerBox}>
                   yeeeah ganó {namePlayer}!!!
                  <button onClick={onStart}>volver a jugar</button>

                </div>}
      {!winner && <Keyboard onChange={onChangeLetter} colorKey={colorKey}/>}
      <Players data={players} turn={turn} />
    </div>
  );
};
