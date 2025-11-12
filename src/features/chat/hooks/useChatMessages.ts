import { useCallback, useEffect, useRef, useState } from 'react';

import type { ChatMessage } from '../types/chatTypes';
import { useSocket } from './useSocket';

interface UseChatMessagesOptions {
  chatRoomId?: string;
  username?: string;
}

export function useChatMessages(socketUrl: string, options: UseChatMessagesOptions = {}) {
  const { chatRoomId, username } = options;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef<ChatMessage[]>([]);

  const { socket, isConnected, emit } = useSocket(socketUrl, {
    autoConnect: !!chatRoomId && !!username,
  });

  // Keep messages ref in sync
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Handle new messages
  const handleNewMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  // Handle message updates (read status, edit, etc.)
  const handleMessageUpdate = useCallback((updatedMessage: ChatMessage) => {
    setMessages((prev) => prev.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg)));
  }, []);

  // Handle message deletion
  const handleMessageDelete = useCallback((messageId: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  }, []);

  // Setup socket listeners
  useEffect(() => {
    if (!socket || !isConnected) return;

    // Listen for chat events
    socket.on('new_message', handleNewMessage);
    socket.on('message_updated', handleMessageUpdate);
    socket.on('message_deleted', handleMessageDelete);

    // Join chat room
    if (chatRoomId) {
      socket.emit('join_room', { chatRoomId, username });
    }

    // Load message history
    if (chatRoomId) {
      setIsLoading(true);
      socket.emit('get_message_history', { chatRoomId }, (response: ChatMessage[]) => {
        setMessages(response || []);
        setIsLoading(false);
      });
    }

    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('message_updated', handleMessageUpdate);
      socket.off('message_deleted', handleMessageDelete);

      if (chatRoomId) {
        socket.emit('leave_room', { chatRoomId, username });
      }
    };
  }, [socket, isConnected, chatRoomId, username, handleNewMessage, handleMessageUpdate, handleMessageDelete]);

  // Send message
  const sendMessage = useCallback(
    (content: string, receiverUsername?: string) => {
      if (!socket || !isConnected || !chatRoomId || !username) {
        console.warn('Cannot send message: socket not connected or missing required data');
        return;
      }

      const messageData = {
        chatRoomId,
        content,
        senderUsername: username,
        receiverUsername,
        messageType: 'TEXT' as const,
        timestamp: new Date().toISOString(),
      };

      emit('send_message', messageData);
    },
    [socket, isConnected, chatRoomId, username, emit],
  );

  // Mark message as read
  const markAsRead = useCallback(
    (messageId: string) => {
      if (!socket || !isConnected || !username) return;

      emit('mark_as_read', { messageId, username });
    },
    [socket, isConnected, username, emit],
  );

  // Mark all messages in room as read
  const markAllAsRead = useCallback(() => {
    if (!socket || !isConnected || !chatRoomId || !username) return;

    emit('mark_all_as_read', { chatRoomId, username });
  }, [socket, isConnected, chatRoomId, username, emit]);

  // Get unread count
  const unreadCount = messages.filter((msg) => !msg.isRead && msg.receiverUsername === username).length;

  return {
    messages,
    isLoading,
    unreadCount,
    isConnected,
    sendMessage,
    markAsRead,
    markAllAsRead,
  };
}
