import { useCallback, useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import type { ChatMessage } from '../types/chatTypes';
import { useChatHistory, useCreateChatRoom } from './useChatApi';

interface UseStompChatOptions {
  socketUrl: string;
  username?: string;
  chatRoomId?: string;
  receiverUsername?: string; // Add this
  autoConnect?: boolean;
}

export function useStompChat(options: UseStompChatOptions) {
  const { socketUrl, username, chatRoomId, receiverUsername, autoConnect = true } = options;

  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [totalUnreadCount] = useState(0);

  // Use API for room creation
  const createRoomMutation = useCreateChatRoom();

  // Fetch chat history when chatRoomId changes
  const { data: chatHistory = [], isError } = useChatHistory(chatRoomId ? parseInt(chatRoomId) : undefined);

  // Load chat history into messages when it changes
  useEffect(() => {
    // Only update messages when we have a chatRoomId
    if (!chatRoomId) {
      return; // Don't clear messages if no room is selected
    }

    // If there's an error fetching history, just clear messages and don't retry
    if (isError) {
      console.warn('⚠️ Error fetching chat history for room:', chatRoomId);
      setMessages([]);
      return;
    }

    if (chatHistory.length > 0) {
      console.log('📜 Loading chat history:', chatHistory.length, 'messages');
      setMessages(chatHistory as ChatMessage[]);
    } else {
      // Clear messages when switching rooms or no history for this room
      setMessages([]);
    }
  }, [chatRoomId, chatHistory.length, isError]); // Use length instead of entire array

  useEffect(() => {
    if (!autoConnect || !username) return;

    setIsLoading(true);

    const client = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      connectHeaders: {
        username: username,
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      setIsConnected(true);
      setIsLoading(false);

      client.subscribe(`/user/${username}/queue/messages`, (message) => {
        const chatMessage = JSON.parse(message.body) as ChatMessage;
        console.log('📩 Received personal message:', chatMessage);

        setMessages((prev) => {
          // Check if message already exists to prevent duplicates
          const exists = prev.some(
            (m) =>
              m.id === chatMessage.id ||
              (m.content === chatMessage.content &&
                m.senderUsername === chatMessage.senderUsername &&
                m.timestamp === chatMessage.timestamp),
          );

          if (exists) {
            console.log('⚠️ Message already exists, skipping');
            return prev;
          }

          console.log('✅ Adding new message to chat');
          return [...prev, chatMessage];
        });
      });

      if (chatRoomId) {
        client.subscribe(`/topic/room/${chatRoomId}`, (message) => {
          const roomMessage = JSON.parse(message.body) as ChatMessage;
          console.log('📩 Received room message:', roomMessage);

          setMessages((prev) => {
            // Check if message already exists to prevent duplicates
            const exists = prev.some(
              (m) =>
                m.id === roomMessage.id ||
                (m.content === roomMessage.content &&
                  m.senderUsername === roomMessage.senderUsername &&
                  m.timestamp === roomMessage.timestamp),
            );

            if (exists) {
              console.log('⚠️ Message already exists, skipping');
              return prev;
            }

            console.log('✅ Adding new room message to chat');
            return [...prev, roomMessage];
          });
        });
      }
    };

    client.onStompError = (frame) => {
      console.error('❌ STOMP Error:', frame.headers['message']);
      console.error('Additional details:', frame.body);
      setIsConnected(false);
      setIsLoading(false);
    };

    client.onDisconnect = () => {
      setIsConnected(false);
    };

    clientRef.current = client;
    client.activate();

    return () => {
      client.deactivate();
    };
  }, [socketUrl, username, chatRoomId, autoConnect]);

  const sendMessage = useCallback(
    (content: string, receiverUsernameOverride?: string) => {
      const actualReceiver = receiverUsernameOverride || receiverUsername;

      // Detailed logging for debugging
      console.log('🔍 sendMessage debug:', {
        connected: clientRef.current?.connected,
        username,
        chatRoomId,
        receiverUsername: actualReceiver,
        content,
      });

      if (!clientRef.current?.connected) {
        console.warn('❌ WebSocket not connected');
        return;
      }

      if (!username) {
        console.warn('❌ Username is missing');
        return;
      }

      if (!chatRoomId) {
        console.warn('❌ ChatRoomId is missing');
        return;
      }

      if (!actualReceiver) {
        console.warn('❌ ReceiverUsername is missing');
        return;
      }

      if (!content.trim()) {
        console.warn('❌ Message content is empty');
        return;
      }

      const message = {
        chatRoomId: parseInt(chatRoomId),
        content: content.trim(),
        receiverUsername: actualReceiver,
      };

      console.log('📤 Sending message:', message);

      // Optimistically add message to UI immediately
      const optimisticMessage: ChatMessage = {
        id: -Date.now(), // Temporary negative ID to distinguish from real messages
        chatRoomId: parseInt(chatRoomId),
        senderUsername: username,
        receiverUsername: actualReceiver,
        content: content.trim(),
        timestamp: new Date().toISOString(),
        isRead: false,
      };

      setMessages((prev) => [...prev, optimisticMessage]);

      clientRef.current.publish({
        destination: '/app/chat.send',
        body: JSON.stringify(message),
      });
    },
    [username, chatRoomId, receiverUsername],
  );

  const createRoom = useCallback(
    async (roomName: string, participants: string[]) => {
      if (!username || participants.length < 2) {
        console.warn('❌ Cannot create room: invalid parameters');
        return;
      }

      // Find the other participant (assuming participants includes current user)
      const otherParticipant = participants.find((p) => p !== username) || participants[1];

      try {
        const room = await createRoomMutation.mutateAsync({
          name: roomName,
          member1Username: username,
          member2Username: otherParticipant,
        });

        console.log('✅ Room created successfully:', room);
        return room;
      } catch (error) {
        console.error('❌ Failed to create room:', error);
        throw error;
      }
    },
    [username, createRoomMutation],
  );

  return {
    isConnected,
    isLoading,
    messages,
    totalUnreadCount,
    sendMessage,
    createRoom,
  };
}
