import React from 'react'
import { Keys } from './Keys';
const keyboardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

export const Keyboard = ({setplayerMove}) => {
  return (
    <div className='key-board'>
        {keyboardLayout.map((colection, letterIndex) => (
          <div key={letterIndex} className='row-key-board' >
            {colection.map((element, colIndex) => (
              <Keys key={colIndex} setplayerMove={setplayerMove} className="letter">{element}</Keys>
            ))}
          </div>
        ))}
    </div>
  )
}
