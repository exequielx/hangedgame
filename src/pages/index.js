import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Home = () => {
  const [msg, setMsg] = useState('');
  const [game, setGame] = useState('');
  const [socketIo, setSocketIo] = useState(null);

  useEffect(() => socketInitializer(), [])

  const socketInitializer = async () => {
    await fetch('/api/socket');
    const _socketIo = await io.connect();
    setSocketIo(_socketIo);

    _socketIo.on('connect', () => {
      console.log('connected');
    });
    _socketIo.on('3726', (_msg) => {
      setMsg(_msg);
    });
  }


  const onInputChange = (event) => {
    socketIo.emit('picha', event.target.value);
  }


  return <div>
    <input onChange={onInputChange}></input>
    <br></br>
    {msg}
  </div>
};

export default Home;