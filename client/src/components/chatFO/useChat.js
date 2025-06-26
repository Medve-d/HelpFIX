// useChat.js
import { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuthContext } from './useAuthContext';

export const useChat = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const { user } = useAuthContext();

    useEffect(() => {
        if (!user) return;

        const socketInstance = io(process.env.REACT_APP_API_URL, {
            withCredentials: true,
            auth: { token: user.token }
        });

        socketInstance.on('connect', () => {
            setIsConnected(true);
            socketInstance.emit('register', user._id);
        });

        socketInstance.on('newMessage', (message) => {
            setMessages(prev => [...prev, message]);
        });

        socketInstance.on('disconnect', () => {
            setIsConnected(false);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [user]);

    const sendMessage = useCallback((receiverId, message) => {
        if (socket && isConnected) {
            socket.emit('sendMessage', { 
                receiverId, 
                message,
                senderName: user.name 
            });
        }
    }, [socket, isConnected, user]);

    return { socket, messages, sendMessage, isConnected };
};