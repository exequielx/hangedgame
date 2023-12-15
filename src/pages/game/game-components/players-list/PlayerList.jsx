import React from 'react'

import { Player } from './Player';

export const PlayersList = ({ players }) => {
  return (
    <div className='PlayersList'>
      {players.map((element, colIndex) => (
        <Player key={colIndex} player={element}></Player>
      ))}
    </div>
  );
};