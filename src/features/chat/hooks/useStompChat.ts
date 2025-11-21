import { useCallback, useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import type { ChatMessage } from '../types/chatTypes';
import { useChatHistory, useCreateChatRoom } from './useChatApi';

interface UseStompChatOptions {
  socketUrl: string;
  username?: string;
  chatRoomId?: string;
  receiverUsername?: string; 
  autoConnect?: boolean;
}

export function useStompChat(options: UseStompChatOptions) {
  const { socketUrl, username, chatRoomId, receiverUsername, autoConnect = true } = options;

  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [totalUnreadCount] = useState(0);

  const createRoomMutation = useCreateChatRoom();

  const { data: chatHistory = [], isError } = useChatHistory(chatRoomId ? parseInt(chatRoomId) : undefined);

  useEffect(() => {
    if (!chatRoomId) {
      return;
    }

    if (isError) {
      console.warn('⚠️ Error fetching chat history for room:', chatRoomId);
      setMessages([]);
      return;
    }

    if (chatHistory.length > 0) {
      setMessages(chatHistory as ChatMessage[]);
    } else {
      setMessages([]);
    }
  }, [chatRoomId, chatHistory.length, isError]);

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
      if (!clientRef.current?.connected) {
        return;
      }

      if (!username) {
        return;
      }

      if (!chatRoomId) {
        return;
      }

      if (!actualReceiver) {
        return;
      }

      if (!content.trim()) {
        return;
      }

      const message = {
        chatRoomId: parseInt(chatRoomId),
        content: content.trim(),
        receiverUsername: actualReceiver,
      };

      console.log('📤 Sending message:', message);

      const optimisticMessage: ChatMessage = {
        id: -Date.now(),
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
