import React,{useEffect, useState} from 'react'
import { Cell} from './Cell'

const word='NARANJA'


export const Board = ({playerMove}) => {
  const text= word
  const [board, setBoard] = useState(() =>
  Array(text.length).fill(null));

   useEffect(() => {
    if (text.includes(playerMove)) {
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        for (let i = 0; i < text.length; i++) {
          if (text[i] === playerMove) {
            newBoard[i] = playerMove;
          }
        }
        return newBoard;
      });
    }else{
      console.log("erraste!");

    }
      
    
  }, [playerMove, text]);
   
    return (
        <div className='row-text'>
          {board.map((element, colIndex) => (
            <Cell key={colIndex}>{element}</Cell>
          ))}
        </div>
      );
}
