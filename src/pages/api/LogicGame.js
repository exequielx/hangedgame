

export const verifyBoardState = (chooseLetter, selectedWord, board)=>{

    if (selectedWord.includes(chooseLetter)) {
      const newBoard = board;
      for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === chooseLetter) {
          newBoard[i] = chooseLetter;
        }
      }
      return newBoard;
  }else{
    return board
  }

}


const verifyWinner = (text)=>{
  if(!text.includes('_')) return 'game over';
};