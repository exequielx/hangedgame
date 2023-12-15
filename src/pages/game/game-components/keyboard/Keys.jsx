import React from 'react'

export const Keys = ({ setMove, children }) => {
    const handleClick = () => {
      setMove(children);
    };
  
    return (
      <div onClick={handleClick} className='letter'>
        {children}
      </div>
    );
  };
