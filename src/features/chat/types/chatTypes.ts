export interface ChatMessage {
  id: string;
  chatRoomId: string;
  content: string;
  senderUsername: string;
  receiverUsername: string;
  timestamp: string;
  messageType?: 'text' | 'image' | 'file';
  isRead?: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  participants: string[];
  lastMessage?: ChatMessage;
  unreadCount?: number;
  isOnline?: boolean;
}

export interface ChatUser {
  username: string;
  displayName: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: string;
  role?: 'ADMIN' | 'DRIVER' | 'PASSENGER';
}
