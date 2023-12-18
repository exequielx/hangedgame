import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Game } from './game/Game';

const Home = () => {
  const [socketIo, setSocketIo] = useState(null);

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch('/api/socket');
      const _socketIo = await io.connect();
      setSocketIo(_socketIo);

      _socketIo.on('connect', () => {
        console.log('connected');
      });
    };
    socketInitializer();
  }, []);
  return <Game socketIo={socketIo} />;
};

export default Home;
