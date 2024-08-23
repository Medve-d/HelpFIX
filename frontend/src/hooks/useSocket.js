// hooks/useSocket.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = '/'; // Adjust the URL as necessary

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(SOCKET_URL);
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return socket;
};
