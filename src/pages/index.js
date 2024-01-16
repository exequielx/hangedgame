import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Game } from './game/Game';
import styles from '@/styles/index.module.css'

const Home = () => {
  const [socketIo, setSocketIo] = useState(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const socketInitializer = async () => {
        await fetch('/api/socket');
        const _socketIo = await io.connect();
        setSocketIo(_socketIo);

        _socketIo.on('connect', (socket) => {
          
          console.log('connected', socket?.id, _socketIo?.id);
        });
      };
      socketInitializer();
    }
  }, []);
  return (
    <div className={styles.centerbox}>
      <Game socketIo={socketIo} />
    </div>
  ) 
};

export default Home;