import { Server } from 'socket.io';
import { players,selectedWord, board } from './test/test';
import { verifyBoardState } from './LogicGame';


const SocketHandler = async (req, res) => {  
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on('connection', (socket) => {
      console.log('cliente conectado: ' + socket?.id);

      socket.on('stateGame', (chooseLetter) => {
        console.log('stateGame');
        io.emit('newStateGame', [verifyBoardState(chooseLetter, selectedWord, board), players]);
      });
    });
  }
  res.end();
};

export default SocketHandler