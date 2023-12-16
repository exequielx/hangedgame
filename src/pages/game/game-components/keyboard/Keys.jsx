import React from 'react'

export const Keys = ({ setplayerMove, children }) => {
    const handleClick = () => {
      setplayerMove(children);
    };
  
    return (
      <div onClick={handleClick} className='letter'>
        {children}
      </div>
    );
  };
