import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Game } from './game/Game';


const Home = () => {
  const [msg, setMsg] = useState('');
  const [socketIo, setSocketIo] = useState(null);

  useEffect(() => {
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
    };
    socketInitializer();
  }, [])

  const onInputChange = (event) => {
    socketIo.emit('picha', event.target.value);
  }
  return <Game/> 
};

export default Home;