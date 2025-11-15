import { client } from '@/apis/client';

export interface Message {
  id: number;
  content: string;
  senderUsername: string;
  receiverUsername: string;
  chatRoomId: number;
  timestamp: string;
  isRead?: boolean;
}

export interface ChatRoom {
  id: number;
  name: string;
  member1Username: string;
  member2Username: string;
  createdAt: string;
  lastMessage?: Message;
}

// DTO from backend matching ChatRoomDTO
export interface ChatRoomDTO {
  chatRoomId: number;
  chatRoomName: string;
  otherMemberName: string;
}

export interface ChatMessage {
  chatRoomId: number;
  content: string;
  receiverUsername: string;
}

interface ApiResponse<T> {
  success: boolean;
  status: number;
  data: T;
  timestamp: string;
}

// Get chat history for a specific room
export async function getChatHistory(chatRoomId: number): Promise<Message[]> {
  const response = await client.get(`/api/chat/history/${chatRoomId}`);
  const apiResponse = response as ApiResponse<Message[]>;
  return apiResponse.data;
}

// Create or get existing chat room between two members
export async function createChatRoom(
  name: string,
  member1Username: string,
  member2Username: string,
): Promise<ChatRoom> {
  const response = await client.post('/api/chat/room', null, {
    params: {
      name,
      member1Username,
      member2Username,
    },
  });
  const apiResponse = response as ApiResponse<ChatRoom>;
  return apiResponse.data;
}

// Get all chat rooms for current member
export async function getAllChatRoomsByMember(): Promise<ChatRoomDTO[]> {
  const response = await client.get('/api/chat/rooms/member');
  const apiResponse = response as ApiResponse<ChatRoomDTO[]>;
  return apiResponse.data;
}
