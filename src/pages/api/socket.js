import { Server } from 'socket.io';


//player admin que pueda ver todos los conectados y eliminar de partida
//solo puede iniciar, parar, reiniciar, kikear etc 

const playersData = [];

let finalWord = '';
const data = {
  word: '',
  players: [],
  winner: null,
  turn: null,
  lobby: true,
  kickPlayers: []
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

     socket.on('exitLobby', () => {
        data.lobby = false;
        updateClients();
      });

      socket.on('kickPlayer', (id) => {
        data.players = data.players.filter(r => r.id !== id);
        data.kickPlayers.push(id);
        updateClients();
      });


      socket.on('newPlayer', (namePlayer, admin) => {
        playersData[socket.id] = { name: namePlayer, id: socket.id, points: 6, life: 5, admin: admin || false };
        data.players.push(playersData[socket.id]);
        updateClients();
      });

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
  data.winner = null;
  updateClients();
}

const play = (letter) => {
  finalWord.includes(letter) ? data.players.find(r => r.id === data.turn).points += 1 : data.players.find(r => r.id === data.turn).life -= 1
  data.word = finalWord.split('').map((c, i) => ((c === letter || (data.word[i] !== '-')) ? c : '-')).join('');
  if (!checkWinner()) {
    setNextTurn();
  }
  updateClients();
}

const checkWinner = () => {
  if (data.word.indexOf('-') === -1) {
    data.winner = data.players.filter(r => r.id === data.turn);
    return true;
  }
  return false;
}

const setNextTurn = () => {
  const index = data.players.findIndex(r => r.id === data.turn);
  data.turn = data.players[(index + 1) % data.players.length]?.id;
}

const generateRandomWord = async () => {
  const response = await fetch('https://random-word-api.herokuapp.com/word?number=1&length=4&lang=es');
  let word = await response.json();
  word = word[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
  finalWord = word;
  data.word = '-'.repeat(finalWord.length);
  console.log(word);
}

const generateRandomPlayerTurn = () => {
  data.turn = data.players[Math.floor(Math.random() * data.players.length)]?.id;
}

const updateClients = () => {
  io.emit('updategame', data);
}

export default SocketHandler