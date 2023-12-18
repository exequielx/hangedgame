import React, { useEffect, useState } from 'react'
import classes from '@/styles/Key.module.css'

const Key = ({ onChange, children }) => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    onChange(children);
    setClicked(true);
    setTimeout(() => { setClicked(false); }, 100);
  };
  return (
    <div onClick={handleClick} className={`${classes.letter} ${clicked ? classes.clicked : ''}`}>
      {children}
    </div>
  );
};

export default Key;