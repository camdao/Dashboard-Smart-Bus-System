import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  type ChatRoom,
  type ChatRoomDTO,
  createChatRoom,
  getAllChatRoomsByMember,
  getChatHistory,
  type Message,
} from '../apis/chatApi';

export function useChatHistory(chatRoomId?: number) {
  return useQuery({
    queryKey: ['chat', 'history', chatRoomId],
    queryFn: () => getChatHistory(chatRoomId!),
    enabled: !!chatRoomId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
    refetchOnMount: false,
  });
}

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
      queryClient.setQueryData(['chat', 'rooms'], (oldRooms: ChatRoom[] = []) => {
        const existingIndex = oldRooms.findIndex((room) => room.id === newRoom.id);
        if (existingIndex >= 0) {
          return oldRooms;
        }
        return [...oldRooms, newRoom];
      });

      queryClient.invalidateQueries({ queryKey: ['chat', 'rooms'] });
    },
  });
}

export function useChatRooms() {
  return useQuery({
    queryKey: ['chat', 'rooms'],
    queryFn: getAllChatRoomsByMember,
  });
}

export function useAddMessageToCache() {
  const queryClient = useQueryClient();

  return (message: Message) => {
    queryClient.setQueryData(['chat', 'history', message.chatRoomId], (oldMessages: Message[] = []) => {
      const exists = oldMessages.find((m) => m.id === message.id);
      if (exists) return oldMessages;
      return [...oldMessages, message];
    });

    queryClient.setQueryData(['chat', 'rooms'], (oldRooms: ChatRoomDTO[] = []) => {
      return oldRooms.map((room) =>
        room.chatRoomId === message.chatRoomId ? { ...room, lastMessage: message } : room,
      );
    });
  };
}
