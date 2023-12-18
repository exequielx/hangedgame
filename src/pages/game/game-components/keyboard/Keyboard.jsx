import React from 'react'
import { Keys } from './Keys';
import clases from '@/styles/Keyboard.module.css'

const keyboardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

export const Keyboard = ({setChooseLetter}) => {
  return (
    <div className='key-board'>
        {keyboardLayout.map((colection, letterIndex) => (
          <div key={letterIndex} className={clases.rowKeyBoard} >
            {colection.map((element, colIndex) => (
              <Keys key={colIndex} setChooseLetter={setChooseLetter} className={clases.letter}>{element}</Keys>
            ))}
          </div>
        ))}
    </div>
  )
}
