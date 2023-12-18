import classes from '@/styles/Board.module.css';
import Cell from './Cell';

const Board = ({ word }) => {
  return (
    <div className={classes.rowText}>
      {
        word?.split('')?.map((element, colIndex) => (
          <Cell key={colIndex}>{element}</Cell>
        ))
      }
    </div>
  );
};

export default Board;