import React, { useEffect, useState } from 'react';
import classes from '@/styles/Board.module.css';
import { Cell } from './Cell';


export const Board = ({ chooseLetter, socketIo,word }) => {
  
  const [board, setBoard] = useState(Array(7).fill('_'));

  useEffect(() => {
    console.log(' before emit:');
  
    if (socketIo) {

      socketIo.on('initalBoard', (board)=>{
        setBoard(board)
      });
      socketIo.emit('stateGame', chooseLetter);
  
      socketIo.on('newStateGame', (newBoard) => {
        console.log('Received newStateGame:', newBoard);
        setBoard(newBoard);
      });
    }
  }, [chooseLetter, socketIo]);

  return (
    <div className={classes.rowText}>
      {board?.map((element, colIndex) => (
        <Cell key={colIndex}>{element}</Cell>
      ))}
    </div>
  );
};

