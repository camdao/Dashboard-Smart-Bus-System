import { useState } from 'react';
import Input from '@/components/Input/Input';
import { css } from '@/styled-system/css';

import type { ChatRoom, ChatUser } from '../types/chatTypes';
import ContactItem from './ContactItem';

interface ChatSidebarProps {
  width?: number | string;
  searchPlaceholder?: string;
  rooms?: ChatRoom[];
  activeUsers?: ChatUser[];
  selectedRoomId?: string;
  totalUnreadCount?: number;
  onRoomSelect?: (roomId: string) => void;
  onCreateRoom?: (roomName: string, participants: string[]) => void;
  isLoading?: boolean;
}

const ChatSidebar = ({
  width = '340px',
  searchPlaceholder = 'Search',
  rooms = [],
  activeUsers = [],
  selectedRoomId,
  totalUnreadCount = 0,
  onRoomSelect,
  onCreateRoom: _onCreateRoom,
  isLoading = false,
}: ChatSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRooms = rooms.filter((room) => room.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleRoomClick = (roomId: string) => {
    onRoomSelect?.(roomId);
  };

  return (
    <aside className={sidebarCss} style={{ width }}>
      <div className={headerCss}>
        <h3 className={titleCss}>Contacts</h3>
        <span className={countCss}>{totalUnreadCount > 0 ? totalUnreadCount : rooms.length}</span>
      </div>

      <div className={searchCss}>
        <Input placeholder={searchPlaceholder} value={searchTerm} onChange={(value) => setSearchTerm(value)} />
      </div>

      <div className={listCss}>
        {isLoading ? (
          <div className={loadingCss}>Loading chats...</div>
        ) : filteredRooms.length > 0 ? (
          filteredRooms.map((room) => {
            const isOnline = room.participants?.some(
              (username) => activeUsers.find((user) => user.username === username)?.isOnline,
            );

            return (
              <ContactItem
                key={room.id}
                name={room.name}
                lastMessage={
                  typeof room.lastMessage === 'string'
                    ? room.lastMessage
                    : room.lastMessage?.content || 'No messages yet'
                }
                unread={room.unreadCount}
                isOnline={isOnline}
                isSelected={room.id === selectedRoomId}
                onClick={() => handleRoomClick(room.id)}
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
