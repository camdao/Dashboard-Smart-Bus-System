import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  type ChatRoom,
  type ChatRoomDTO,
  createChatRoom,
  getAllChatRoomsByMember,
  getChatHistory,
  type Message,
} from '../apis/chatApi';

// Hook to fetch chat history for a room
export function useChatHistory(chatRoomId?: number) {
  return useQuery({
    queryKey: ['chat', 'history', chatRoomId],
    queryFn: () => getChatHistory(chatRoomId!),
    enabled: !!chatRoomId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

// Hook to create or get existing chat room
export function useCreateChatRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      name,
      member1Username,
      member2Username,
    }: {
      name: string;
      member1Username: string;
      member2Username: string;
    }) => createChatRoom(name, member1Username, member2Username),
    onSuccess: (newRoom) => {
      // Update chat rooms list
      queryClient.setQueryData(['chat', 'rooms'], (oldRooms: ChatRoom[] = []) => {
        const existingIndex = oldRooms.findIndex((room) => room.id === newRoom.id);
        if (existingIndex >= 0) {
          return oldRooms; // Room already exists
        }
        return [...oldRooms, newRoom];
      });

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['chat', 'rooms'] });
    },
  });
}

// Hook to fetch all chat rooms for current user
export function useChatRooms() {
  return useQuery({
    queryKey: ['chat', 'rooms'],
    queryFn: getAllChatRoomsByMember,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: true,
  });
}

// Hook to add new message to cache when received via WebSocket
export function useAddMessageToCache() {
  const queryClient = useQueryClient();

  return (message: Message) => {
    // Add message to chat history cache
    queryClient.setQueryData(['chat', 'history', message.chatRoomId], (oldMessages: Message[] = []) => {
      const exists = oldMessages.find((m) => m.id === message.id);
      if (exists) return oldMessages;
      return [...oldMessages, message];
    });

    // Update last message in rooms list
    queryClient.setQueryData(['chat', 'rooms'], (oldRooms: ChatRoomDTO[] = []) => {
      return oldRooms.map((room) =>
        room.chatRoomId === message.chatRoomId ? { ...room, lastMessage: message } : room,
      );
    });
  };
}
