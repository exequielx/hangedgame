import React,{useEffect, useState} from 'react'
import { Square } from './Square'

const word='NARANJA'


export const Board = ({move}) => {
  const text= word
  const [board, setBoard] = useState(() =>
  Array(text.length).fill(null));

   useEffect(() => {
    if (text.includes(move)) {
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        for (let i = 0; i < text.length; i++) {
          if (text[i] === move) {
            newBoard[i] = move;
          }
        }
        return newBoard;
      });
    }else{
      console.log("erraste!");

    }
      
    
  }, [move, text]);
   
    return (
        <div className='row-text'>
          {board.map((element, colIndex) => (
            <Square key={colIndex}>{element}</Square>
          ))}
        </div>
      );
}
