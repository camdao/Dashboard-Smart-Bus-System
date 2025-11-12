import { useCallback, useEffect, useState } from 'react';

import type { ChatRoom, ChatUser } from '../types/chatTypes';
import { useSocket } from './useSocket';

interface UseChatRoomsOptions {
  username?: string;
}

export function useChatRooms(socketUrl: string, options: UseChatRoomsOptions = {}) {
  const { username } = options;
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [activeUsers, setActiveUsers] = useState<ChatUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { socket, isConnected, emit } = useSocket(socketUrl, {
    autoConnect: !!username,
  });

  // Handle room list updates
  const handleRoomsUpdate = useCallback((updatedRooms: ChatRoom[]) => {
    setRooms(updatedRooms);
  }, []);

  // Handle active users updates
  const handleActiveUsersUpdate = useCallback((users: ChatUser[]) => {
    setActiveUsers(users);
  }, []);

  // Handle room updates (new messages, unread counts, etc.)
  const handleRoomUpdate = useCallback((updatedRoom: ChatRoom) => {
    setRooms((prev) => prev.map((room) => (room.id === updatedRoom.id ? updatedRoom : room)));
  }, []);

  // Handle user status changes
  const handleUserStatusChange = useCallback((user: ChatUser) => {
    setActiveUsers((prev) => prev.map((u) => (u.username === user.username ? user : u)));
  }, []);

  // Setup socket listeners
  useEffect(() => {
    if (!socket || !isConnected || !username) return;

    // Listen for room-related events
    socket.on('rooms_list', handleRoomsUpdate);
    socket.on('active_users', handleActiveUsersUpdate);
    socket.on('room_updated', handleRoomUpdate);
    socket.on('user_status_changed', handleUserStatusChange);

    // Request initial data
    setIsLoading(true);
    socket.emit('get_user_rooms', { username }, (response: ChatRoom[]) => {
      setRooms(response || []);
      setIsLoading(false);
    });

    socket.emit('get_active_users', {}, (response: ChatUser[]) => {
      setActiveUsers(response || []);
    });

    return () => {
      socket.off('rooms_list', handleRoomsUpdate);
      socket.off('active_users', handleActiveUsersUpdate);
      socket.off('room_updated', handleRoomUpdate);
      socket.off('user_status_changed', handleUserStatusChange);
    };
  }, [
    socket,
    isConnected,
    username,
    handleRoomsUpdate,
    handleActiveUsersUpdate,
    handleRoomUpdate,
    handleUserStatusChange,
  ]);

  // Create new room
  const createRoom = useCallback(
    (roomName: string, participants: string[]) => {
      if (!socket || !isConnected || !username) return;

      emit('create_room', {
        name: roomName,
        participants: [username, ...participants],
        createdBy: username,
      });
    },
    [socket, isConnected, username, emit],
  );

  // Join existing room
  const joinRoom = useCallback(
    (roomId: string) => {
      if (!socket || !isConnected || !username) return;

      emit('join_room', { roomId, username });
    },
    [socket, isConnected, username, emit],
  );

  // Leave room
  const leaveRoom = useCallback(
    (roomId: string) => {
      if (!socket || !isConnected || !username) return;

      emit('leave_room', { roomId, username });
    },
    [socket, isConnected, username, emit],
  );

  // Update user status
  const updateUserStatus = useCallback(
    (isOnline: boolean) => {
      if (!socket || !isConnected || !username) return;

      emit('update_user_status', {
        username,
        isOnline,
        lastSeen: new Date().toISOString(),
      });
    },
    [socket, isConnected, username, emit],
  );

  // Get total unread count across all rooms
  const totalUnreadCount = rooms.reduce((total, room) => total + (room.unreadCount || 0), 0);

  return {
    rooms,
    activeUsers,
    isLoading,
    totalUnreadCount,
    isConnected,
    createRoom,
    joinRoom,
    leaveRoom,
    updateUserStatus,
  };
}
