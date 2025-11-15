import { useCallback, useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import type { ChatMessage } from '../types/chatTypes';
import { useCreateChatRoom } from './useChatApi';

interface UseStompChatOptions {
  socketUrl: string;
  username?: string;
  chatRoomId?: string;
  autoConnect?: boolean;
}

export function useStompChat(options: UseStompChatOptions) {
  const { socketUrl, username, chatRoomId, autoConnect = true } = options;

  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [totalUnreadCount] = useState(0);

  // Use API for room creation
  const createRoomMutation = useCreateChatRoom();

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
        setMessages((prev) => [...prev, chatMessage]);
      });

      if (chatRoomId) {
        client.subscribe(`/topic/room/${chatRoomId}`, (message) => {
          const roomMessage = JSON.parse(message.body) as ChatMessage;
          setMessages((prev) => [...prev, roomMessage]);
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
    (content: string) => {
      if (!clientRef.current?.connected || !username || !chatRoomId) {
        console.warn('❌ Cannot send message: not connected or missing data');
        return;
      }

      const message = {
        chatRoomId: parseInt(chatRoomId),
        content,
        senderUsername: username,
        receiverUsername: chatRoomId,
        timestamp: new Date().toISOString(),
      };

      clientRef.current.publish({
        destination: '/app/chat.send',
        body: JSON.stringify(message),
      });
    },
    [username, chatRoomId],
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
