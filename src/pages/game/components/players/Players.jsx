import React from 'react'
import Player from './Player';
import classes from '@/styles/PlayerList.module.css'

const Players = ({ data }) => {
  return (
    <div className={classes.playersList}>
      {
        data?.map((player, colIndex) => (
          <Player key={colIndex} player={player} />
        ))
      }
    </div>
  );
};

export default Players;