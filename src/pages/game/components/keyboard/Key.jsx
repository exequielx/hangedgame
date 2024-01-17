import React, {useState } from 'react'
import classes from '@/styles/Key.module.css'

const Key = ({ onChange, children,colorKey }) => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    onChange(children);
    setClicked(true);
    setTimeout(() => { setClicked(false); }, 100);
  };
  return (
    <div onClick={handleClick} className={`${colorKey  === true ? classes.letterTurn : classes.letter}`}>
      {children}
    </div>
  );
};

export default Key;