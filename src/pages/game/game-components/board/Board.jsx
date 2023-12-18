import classes from '@/styles/Board.module.css';
import { Cell } from './Cell';


export const Board = ({ board}) => {
  
  return (
    <div className={classes.rowText}>
      {board?.map((element, colIndex) => (
        <Cell key={colIndex}>{element}</Cell>
      ))}
    </div>
  );
};

