import React from 'react'
import Key from './Key';
import classes from '@/styles/Keyboard.module.css'

const keyboardLayout = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const Keyboard = ({ onChange }) => {
  return (
    <div className='key-board'>
      {
        keyboardLayout.map((colection, letterIndex) => (
          <div key={letterIndex} className={classes.rowKeyBoard}>
            {
              colection.map(element => (
                <Key key={element} onChange={onChange} className={classes.letter}>{element}</Key>
              ))
            }
          </div>
        ))
      }
    </div>
  )
};

export default Keyboard;