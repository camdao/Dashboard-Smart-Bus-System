import { useEffect, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';

interface UseSocketOptions {
  autoConnect?: boolean;
  token?: string;
}

export function useSocket(url: string, options: UseSocketOptions = {}) {
  const { autoConnect = true, token } = options;
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!autoConnect) return;

    // Initialize socket connection
    socketRef.current = io(url, {
      auth: {
        token, // JWT token for authentication
      },
      transports: ['websocket', 'polling'],
      timeout: 20000,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    const socket = socketRef.current;

    // Connection event handlers
    socket.on('connect', () => {
      setIsConnected(true);
      setError(null);
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', (reason: string) => {
      setIsConnected(false);
      console.log('Socket disconnected:', reason);
    });

    socket.on('connect_error', (err: Error) => {
      setError(err.message);
      setIsConnected(false);
      console.error('Socket connection error:', err);
      console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        url,
        token: !!token,
      });
    });

    socket.on('reconnect', (attemptNumber: number) => {
      setIsConnected(true);
      setError(null);
      console.log('Socket reconnected after', attemptNumber, 'attempts');
    });

    socket.on('reconnect_error', (err: Error) => {
      console.error('Socket reconnection failed:', err);
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
        socketRef.current = null;
      }
    };
  }, [url, autoConnect, token]);

  const emit = <T = unknown>(event: string, data: T) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
    } else {
      console.warn('Socket not connected, cannot emit:', event);
    }
  };

  const on = <T = unknown>(event: string, callback: (data: T) => void) => {
    socketRef.current?.on(event, callback);
  };

  const off = <T = unknown>(event: string, callback?: (data: T) => void) => {
    socketRef.current?.off(event, callback);
  };

  return {
    socket: socketRef.current,
    isConnected,
    error,
    emit,
    on,
    off,
  };
}
