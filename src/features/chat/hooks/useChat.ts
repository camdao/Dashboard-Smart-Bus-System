import { useCallback, useMemo } from 'react';

import { useChatMessages } from './useChatMessages';
import { useChatRooms } from './useChatRooms';

interface UseChatOptions {
  socketUrl: string;
  username?: string;
  chatRoomId?: string;
  autoConnect?: boolean;
}

export function useChat(options: UseChatOptions) {
  const { socketUrl, username, chatRoomId, autoConnect = true } = options;

  // Get rooms and users data
  const roomsHook = useChatRooms(socketUrl, {
    username: autoConnect ? username : undefined,
  });

  // Get messages for current room
  const messagesHook = useChatMessages(socketUrl, {
    chatRoomId: autoConnect && chatRoomId ? chatRoomId : undefined,
    username: autoConnect ? username : undefined,
  });

  // Get current room details
  const currentRoom = useMemo(
    () => roomsHook.rooms.find((room) => room.id === chatRoomId),
    [roomsHook.rooms, chatRoomId],
  );

  // Enhanced send message with room context
  const sendMessage = useCallback(
    (content: string, receiverUsername?: string) => {
      if (!currentRoom) {
        console.warn('Cannot send message: no active room');
        return;
      }

      messagesHook.sendMessage(content, receiverUsername);
    },
    [messagesHook, currentRoom],
  );

  // Switch to different room
  const switchRoom = useCallback(
    (roomId: string) => {
      if (chatRoomId && chatRoomId !== roomId) {
        roomsHook.leaveRoom(chatRoomId);
      }
      roomsHook.joinRoom(roomId);
    },
    [roomsHook, chatRoomId],
  );

  // Create new room and join it
  const createAndJoinRoom = useCallback(
    (roomName: string, participants: string[]) => {
      roomsHook.createRoom(roomName, participants);
    },
    [roomsHook],
  );

  // Mark all messages in current room as read
  const markCurrentRoomAsRead = useCallback(() => {
    if (chatRoomId) {
      messagesHook.markAllAsRead();
    }
  }, [messagesHook, chatRoomId]);

  // Check if user is online
  const isUserOnline = useCallback(
    (targetUsername: string) => {
      return roomsHook.activeUsers.some((user) => user.username === targetUsername && user.isOnline);
    },
    [roomsHook.activeUsers],
  );

  // Get user details
  const getUserDetails = useCallback(
    (targetUsername: string) => {
      return roomsHook.activeUsers.find((user) => user.username === targetUsername);
    },
    [roomsHook.activeUsers],
  );

  const isConnected = roomsHook.isConnected && messagesHook.isConnected;
  const isLoading = roomsHook.isLoading || messagesHook.isLoading;

  return {
    // Connection status
    isConnected,
    isLoading,

    // Rooms data
    rooms: roomsHook.rooms,
    currentRoom,
    totalUnreadCount: roomsHook.totalUnreadCount,

    // Messages data
    messages: messagesHook.messages,
    unreadCount: messagesHook.unreadCount,

    // Users data
    activeUsers: roomsHook.activeUsers,

    // Room actions
    createRoom: createAndJoinRoom,
    joinRoom: roomsHook.joinRoom,
    leaveRoom: roomsHook.leaveRoom,
    switchRoom,

    // Message actions
    sendMessage,
    markAsRead: messagesHook.markAsRead,
    markAllAsRead: markCurrentRoomAsRead,

    // User actions
    updateUserStatus: roomsHook.updateUserStatus,
    isUserOnline,
    getUserDetails,
  };
}
