import { Server } from 'socket.io';


let finalWord = '';
const data = {
  word: '',
  players: [],
  winner: null,
  actualTurn: 0,
};

let io; //socket io global ref
const allClients = []; // all clients connected
const SocketHandler = async (req, res) => {
  if (!res.socket.server.io) {
    io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on('connection', (socket) => {
      allClients.push(socket);
      console.log('cliente conectado: ' + socket.id);
      socket.on('start', () => { startGame(); });
      socket.on('play', (letter) => { play(letter); });

      data.players.push({ name: socket.id, id: socket.id });
      updateClients();

      socket.on('disconnect', () => {
        console.log('cliente desconectado: ' + socket.id);
        data.players = data.players.filter(r => r.id !== socket.id);
        allClients.splice(allClients.indexOf(socket), 1);
        updateClients();
      });
    });
  }
  res.end();
};

const startGame = async () => {
  finalWord = await generateRandomWord();
  data.word = '-'.repeat(finalWord.length);
  updateClients();
}

const generateRandomWord = async () => {
  const response = await fetch('https://random-word-api.herokuapp.com/word?lang=es');
  let word = await response.json();
  word = word[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
  return word;
}

const play = (letter) => {
  data.word = finalWord.split('').map((c, i) => ((c === letter || (data.word[i] !== '-')) ? c : '-')).join('');
  checkWinner();
  updateClients();
}

const checkWinner = () => {
  if (data.word.indexOf('-') === -1) {
    data.winner = 'ganador...';
  }
}

const updateClients = () => {
  io.emit('updategame', data);
}

export default SocketHandler