// Updated to match Spring Boot API
export interface ChatMessage {
  id: number; // Changed from string to number
  chatRoomId: number; // Changed from string to number
  content: string;
  senderUsername: string;
  receiverUsername: string;
  timestamp: string;
  messageType?: 'text' | 'image' | 'file';
  isRead?: boolean;
}

export interface ChatRoom {
  id: number; // Changed from string to number
  name: string;
  member1Username: string; // Changed from participants array
  member2Username: string;
  createdAt: string;
  lastMessage?: ChatMessage;
  unreadCount?: number;
  isOnline?: boolean;
  // Computed property for compatibility
  participants?: string[]; // Will be computed from member1Username + member2Username
}

// DTO from backend matching ChatRoomDTO
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
