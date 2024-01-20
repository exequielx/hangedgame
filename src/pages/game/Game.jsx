import React, { useState, useEffect } from 'react';
import Board from './components/board/Board';
import Keyboard from './components/keyboard/Keyboard';
import Players from './components/players/Players';
import styles from '@/styles/Game.module.css'
import { Lobby } from './components/lobby/Lobby';
import { Loggin } from './components/loggin/Loggin';
import { Winner } from './components/winner/winner';

export const Game = ({ socketIo }) => {
  const [players, setPlayers] = useState([]);
  const [word, setWord] = useState();
  const [winner, setWinner] = useState();
  const [turn, setTurn] = useState();
  const [isStarting, setIsStarting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [namePlayer, setNamePlayer] = useState('');
  const [admin, setAdmin] = useState(false);
  const [isLoggin, setIsLoggin] = useState(true);

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
    if (socketIo.id == turn) {
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
  const onSubmitPlayerName = (admin) => {
    socketIo.emit('newPlayer', namePlayer, admin);
  }

  const firstPlayer = () => {
    onStart();
    setIsPlaying(true);
    onSubmitPlayerName(true);
  }
  const secondsPlayers = () => {
    onSubmitPlayerName(false);
    setIsPlaying(true);
  }
  const onLoggin = () => {
    

  }

  const intro = () => {
    if (!socketIo || isStarting) return <div className={styles.loader}></div>;
    if (!word) return <Loggin players={players} buttonFunction={firstPlayer} onChangePlayerName={onChangePlayerName} />;
    if (!isPlaying) return <Loggin players={players} buttonFunction={secondsPlayers} onChangePlayerName={onChangePlayerName} />;

  }
  



  intro();


  const colorKey = (socketIo.id == turn)
  return (
    <div className={styles.centerbox}>
      <Board word={word} />
      {winner &&
        <Winner winner={winner[0]?.name} onStart={onStart} />
      }
      {!winner && <Keyboard onChange={onChangeLetter} colorKey={colorKey} />}
      <Players data={players} turn={turn} />
    </div>
  );
};
