import React from 'react'
import clases from '@/styles/Key.module.css'

export const Keys = ({ setChooseLetter, children }) => {
    const handleClick = () => {
      setChooseLetter(children);
    };
    return (
      <div onClick={handleClick} className={clases.letter}>
        {children}
      </div>
    );
  };
