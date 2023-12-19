import { Server } from 'socket.io';


let finalWord = '';
const data = {
  word: '',
  players: [],
  winner: null,
  turn: null,
};

let io; //socket io global ref
const SocketHandler = async (req, res) => {
  if (!res.socket.server.io) {
    io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on('connection', (socket) => {
      console.log('cliente conectado: ' + socket.id);
      socket.on('start', () => { startGame(); });
      socket.on('play', (letter) => { play(letter); });

      data.players.push({ name: socket.id, id: socket.id });
      updateClients();

      socket.on('disconnect', () => {
        console.log('cliente desconectado: ' + socket.id);
        data.players = data.players.filter(r => r.id !== socket.id);
        updateClients();
      });
    });
  }
  res.end();
};

const startGame = async () => {
  await generateRandomWord();
  generateRandomPlayerTurn();
  updateClients();
}

const play = (letter) => {
  data.word = finalWord.split('').map((c, i) => ((c === letter || (data.word[i] !== '-')) ? c : '-')).join('');
  if(!checkWinner()) {
    setNextTurn();
  }
  updateClients();
}

const checkWinner = () => {
  if (data.word.indexOf('-') === -1) {
    data.winner = data.turn;
    return true;
  }
  return false;
}

const setNextTurn = () => {
  const index = data.players.findIndex(r => r.id === data.turn);
  data.turn = data.players[(index + 1) % data.players.length]?.id;
}

const generateRandomWord = async () => {
  const response = await fetch('https://random-word-api.herokuapp.com/word?lang=es');
  let word = await response.json();
  word = word[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
  finalWord = word;
  data.word = '-'.repeat(finalWord.length);
  console.log(data.word)
}

const generateRandomPlayerTurn = () => {
  data.turn = data.players[Math.floor(Math.random() * data.players.length)]?.id;
}

const updateClients = () => {
  io.emit('updategame', data);
}

export default SocketHandler