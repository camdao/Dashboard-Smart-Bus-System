export interface ChatMessage {
  id: number;
  chatRoomId: number;
  content: string;
  senderUsername: string;
  receiverUsername: string;
  timestamp: string;
  messageType?: 'text' | 'image' | 'file';
  isRead?: boolean;
}

export interface ChatRoom {
  id: number;
  name: string;
  member1Username: string;
  member2Username: string;
  createdAt: string;
  lastMessage?: ChatMessage;
  unreadCount?: number;
  isOnline?: boolean;
  participants?: string[];
}

export interface ChatRoomDTO {
  chatRoomId: number;
  chatRoomName: string;
  otherMemberName: string;
}

export interface ChatUser {
  username: string;
  displayName: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: string;
  role?: 'ADMIN' | 'DRIVER' | 'PASSENGER';
}
