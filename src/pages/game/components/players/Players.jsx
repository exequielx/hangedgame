import React from 'react';
import Player from './Player';
import classes from '@/styles/PlayerList.module.css';

const Players = ({ data, turn }) => {
  return (
    <div className={classes.playersList}>
      {
        data?.map((player, colIndex) => (
          <Player key={colIndex} player={player} colorized={player?.id === turn} />
        ))
      }
    </div>
  );
};

export default Players;