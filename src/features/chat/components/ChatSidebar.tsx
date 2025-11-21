import { useState } from 'react';
import Icon from '@/components/Icon';
import Input from '@/components/Input/Input';
import { css } from '@/styled-system/css';

import { useChatRooms } from '../hooks/useChatApi';
import { createRoomName, useFetchMembers } from '../hooks/useMembers';
import type { ChatRoomDTO, ChatUser } from '../types/chatTypes';
import ContactItem from './ContactItem';

interface ChatSidebarProps {
  width?: number | string;
  searchPlaceholder?: string;
  rooms?: ChatRoomDTO[];
  activeUsers?: ChatUser[];
  selectedRoomId?: string;
  totalUnreadCount?: number;
  currentUsername?: string;
  onRoomSelect?: (roomId: string, username: string) => void; // Updated signature
  onCreateRoom?: (roomName: string, participants: string[]) => Promise<void>;
  isLoading?: boolean;
}

const ChatSidebar = ({
  width = '340px',
  searchPlaceholder = 'Search',
  rooms: _rooms = [],
  activeUsers: _activeUsers = [],
  selectedRoomId,
  totalUnreadCount: _totalUnreadCount = 0,
  currentUsername = 'user123',
  onRoomSelect,
  onCreateRoom,
  isLoading = false,
}: ChatSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);

  const { data: chatRooms = [], isLoading: roomsLoading } = useChatRooms();

  const { data: members = [], isLoading: membersLoading } = useFetchMembers();

  const filteredRooms = chatRooms.filter((room) => {
    return (
      room.chatRoomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.otherMemberName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const existingChatMembers = new Set(chatRooms.map((room) => room.otherMemberName));

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.fullName && member.fullName.toLowerCase().includes(searchTerm.toLowerCase()));

    const hasNoExistingChat = !existingChatMembers.has(member.username);

    return matchesSearch && hasNoExistingChat;
  });

  const handleRoomClick = (room: (typeof chatRooms)[0]) => {
    onRoomSelect?.(room.chatRoomId.toString(), room.otherMemberName);
  };

  const handleMemberClick = async (member: (typeof members)[0]) => {
    try {
      const roomName = createRoomName(member);
      await onCreateRoom?.(roomName, [currentUsername, member.username]);

      setIsSearchMode(false);
      setSearchTerm('');
      onRoomSelect?.('', member.username);
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };

  const isLoadingData = isLoading || roomsLoading || membersLoading;

  return (
    <aside className={sidebarCss} style={{ width }}>
      <div className={headerCss}>
        {isSearchMode ? (
          <>
            <div className={backButtonContainerCss}>
              <button
                type="button"
                className={backButtonCss}
                onClick={() => setIsSearchMode(false)}
                title="Back to chats"
              >
                ←
              </button>
              <h3 className={titleCss}>New Conversation</h3>
            </div>
            <span className={countCss}>{filteredMembers.length} available</span>
          </>
        ) : (
          <>
            <h3 className={titleCss}>Chats</h3>
            <div className={headerActionsCss}>
              <span className={countCss}>{chatRooms.length}</span>
              <button type="button" className={toggleButtonCss} onClick={() => setIsSearchMode(!isSearchMode)}>
                <Icon name="GroupIcon" size={18} />
              </button>
            </div>
          </>
        )}
      </div>

      <div className={searchCss}>
        <Input
          placeholder={isSearchMode ? 'Search contacts...' : searchPlaceholder}
          value={searchTerm}
          onChange={(value) => setSearchTerm(value)}
        />
      </div>

      <div className={listCss}>
        {isLoadingData ? (
          <div className={loadingCss}>Loading {isSearchMode ? 'users' : 'chats'}...</div>
        ) : isSearchMode ? (
          filteredMembers.length > 0 ? (
            filteredMembers.map((member) => {
              const displayName = member.fullName || member.username;
              const subtext = `Start conversation • ${member.role}`;

              return (
                <ContactItem
                  key={member.id}
                  name={displayName}
                  lastMessage={subtext}
                  time="💬"
                  unread={0}
                  isOnline={member.isActive || false}
                  isSelected={false}
                  onClick={() => handleMemberClick(member)}
                />
              );
            })
          ) : (
            <div className={emptyStateCss}>
              <p>No available users found</p>
              {searchTerm ? (
                <p className={emptySubtextCss}>Try searching with different keywords</p>
              ) : (
                <p className={emptySubtextCss}>All non-admin users already have conversations</p>
              )}
            </div>
          )
        ) : filteredRooms.length > 0 ? (
          filteredRooms.map((room) => {
            const isSelected = room.chatRoomId.toString() === selectedRoomId;
            const lastMessage = `Chat with ${room.otherMemberName}`;

            return (
              <ContactItem
                key={room.chatRoomId}
                name={room.otherMemberName}
                lastMessage={lastMessage}
                unread={0}
                isOnline={false} 
                isSelected={isSelected}
                onClick={() => handleRoomClick(room)}
              />
            );
          })
        ) : (
          <div className={emptyStateCss}>
            <p>No chats found</p>
            {searchTerm && <p className={emptySubtextCss}>Try adjusting your search</p>}
          </div>
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;

const sidebarCss = css({
  width: '340px',
  padding: '18px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  backgroundColor: 'white',
});

const headerCss = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const headerActionsCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const toggleButtonCss = css({
  background: 'none',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
  padding: '4px',
  borderRadius: '4px',
  transition: 'background-color 0.2s',
  _hover: {
    backgroundColor: 'gray.100',
  },
});

const backButtonContainerCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const backButtonCss = css({
  background: 'none',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
  padding: '4px',
  borderRadius: '4px',
  transition: 'background-color 0.2s',
  _hover: {
    backgroundColor: 'gray.100',
  },
});

const titleCss = css({ fontSize: '16px', fontWeight: 700 });
const countCss = css({ fontSize: '13px', color: 'gray.400' });

const searchCss = css({});

const listCss = css({
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  paddingRight: '4px',
});

const loadingCss = css({
  padding: '20px',
  textAlign: 'center',
  color: 'gray.500',
  fontSize: '14px',
});

const emptyStateCss = css({
  padding: '40px 20px',
  textAlign: 'center',
  color: 'gray.500',
});

const emptySubtextCss = css({
  fontSize: '12px',
  marginTop: '4px',
  color: 'gray.400',
});
