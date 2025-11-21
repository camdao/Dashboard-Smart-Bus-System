import { useQuery } from '@tanstack/react-query';

import { getAllNonAdmins, type MemberResponse } from '../apis/memberApi';

export function useFetchMembers() {
  return useQuery({
    queryKey: ['chat', 'members'],
    queryFn: getAllNonAdmins,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function memberToChatUser(member: MemberResponse) {
  return {
    username: member.username,
    displayName: member.fullName || member.username,
    avatar: member.avatar,
    isOnline: member.isActive || false,
    role: member.role,
  };
}

export function createRoomName(member: MemberResponse) {
  const displayName = member.fullName || member.username;
  return `${displayName} (${member.role})`;
}

export function createDirectRoomId(username1: string, username2: string) {
  const [user1, user2] = [username1, username2].sort();
  return `direct_${user1}_${user2}`;
}
