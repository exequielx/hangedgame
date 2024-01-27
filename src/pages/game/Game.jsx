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
  const [word, setWord] = useState("");
  const [winner, setWinner] = useState();
  const [turn, setTurn] = useState();
  const [isStarting, setIsStarting] = useState(false);
  const [namePlayer, setNamePlayer] = useState('');
  const [admin, setAdmin] = useState(false);
  const [isLobby, setIsLobby] = useState(true);


  const onChangePlayerName = (e) => {
    setNamePlayer(e.target.value);
  }

  useEffect(() => {
    if (!socketIo) { return; }
    console.log("!!!!!")
    socketIo.on('updategame', (data) => {
      setWinner(data.winner);
      setWord(data.word);
      setPlayers(data.players);
      setTurn(data.turn);
      setIsLobby(data.lobby);
    });
  }, [socketIo]);

  const onChangeLetter = (letter) => {
    if (socketIo.id == turn) {
      socketIo.emit('play', letter);
    }
  }

  const onStart = () => {
    setWinner(false);
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
    const isAdmin = namePlayer === 'admin';
    setAdmin(isAdmin)
    onSubmitPlayerName(isAdmin);
  }

  //loader socketIo
  if (!socketIo || isStarting) return <div className={styles.loader}></div>;


  if (!namePlayer || !players?.find(r => r.name === namePlayer)) {
    return <Loggin players={players} buttonFunction={firstPlayer} onChangePlayerName={onChangePlayerName} />
  }


  const exitLobby = () => {
    socketIo.emit('exitLobby');
  }

  const kickear = (id) => {
    socketIo.emit('kickPlayer', id);
  }

  //lobby
  if (isLobby) {
    return <Lobby players={players} admin={admin} exitLobby={exitLobby} kickear={kickear} />;
  }

  const colorKey = (socketIo.id == turn)
  return (
    <div className={styles.container}>
      <div className={styles.centerbox}>
        <Board word={word} />
        {/* {winner &&
          <Winner winner={winner[0]?.name} onStart={onStart} />
        } */}
        {!winner && <Keyboard onChange={onChangeLetter} colorKey={colorKey} />}
        <Players data={players} turn={turn} />
      </div>
      <button onClick={onStart()} >resetear game </button>
    </div>
  );
};
