import React from 'react'
import { Player } from './Player';
import clases from '@/styles/PlayerList.module.css'

export const PlayersList = ({ players }) => {
  return (
    <div className={clases.playersList}>
      {players.map((element, colIndex) => (
        <Player key={colIndex} player={element}></Player>
      ))}
    </div>
  );
};