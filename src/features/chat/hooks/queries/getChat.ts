import { client } from '@/apis/client';
import { CLIENT_SIDE_URL } from '@/constants';
import { type ApiResponse } from '@/features/login/types/auth';
import { type Message } from '@stomp/stompjs';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

export function useChatHistory(chatRoomId?: number, options?: UseQueryOptions<Message[]>) {
  return useQuery<Message[]>({
    queryKey: ['chat', 'history', chatRoomId],
    queryFn: async () => {
      const response = await client.get<ApiResponse<Message[]>>(`${CLIENT_SIDE_URL}/api/chat/history/${chatRoomId}`);
      return response.data ?? [];
    },
    ...options,
    enabled: !!chatRoomId,
  });
}

export default useChatHistory;
