import { Server } from 'socket.io';
import { players,selectedWord, board } from './test/test';
import { verifyBoardState } from './LogicGame';


const SocketHandler = async (req, res) => {  
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on('connection', (socket) => {
      console.log('cliente conectado: ' + socket?.id);
      
      io.emit ('initialBoard',board)
      io.emit('players', players);
      io.emit('word', selectedWord)
      console.log(selectedWord)

      socket.on('stateGame', (chooseLetter) => {
        console.log('Received stateGame');
        io.emit('newStateGame', verifyBoardState(chooseLetter, selectedWord, board));
      });
    });
  }
  res.end();
};

export default SocketHandler