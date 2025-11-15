import { useQuery } from '@tanstack/react-query';

import { getAllNonAdmins, type MemberResponse } from '../apis/memberApi';

export function useFetchMembers() {
  return useQuery({
    queryKey: ['chat', 'members'],
    queryFn: getAllNonAdmins,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

// Transform member to chat user format
export function memberToChatUser(member: MemberResponse) {
  return {
    username: member.username,
    displayName: member.fullName || member.username, // Fallback to username if fullName not available
    avatar: member.avatar,
    isOnline: member.isActive || false, // Default to false if not provided
    role: member.role,
  };
}

// Create room name for 1:1 chat
export function createRoomName(member: MemberResponse) {
  const displayName = member.fullName || member.username;
  return `${displayName} (${member.role})`;
}

// Create room ID for 1:1 chat
export function createDirectRoomId(username1: string, username2: string) {
  // Sort usernames to ensure consistent room ID
  const [user1, user2] = [username1, username2].sort();
  return `direct_${user1}_${user2}`;
}
