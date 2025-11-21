'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Dashboard from '@/features/LayoutAdmin/containers/DashboardContainers';
import { css } from '@/styled-system/css';
import { getCurrentUserId } from '@/utils/auth';

import { useUserInfo } from '../apis/memberApi';
import ChatSidebar from '../components/ChatSidebar';
import ChatWindow from '../components/ChatWindow';
import { useChatRooms } from '../hooks/useChatApi';
import { useFetchMembers } from '../hooks/useMembers';
import { useStompChat } from '../hooks/useStompChat';

export default function ChatFeatures() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentUserId = getCurrentUserId();

  const { data: userInfo } = useUserInfo(currentUserId);
  const currentUsername = userInfo?.username || null;
  const [selectedRoom, setSelectedRoom] = useState<{
    roomId: string;
    username: string;
  } | null>(null);

  useEffect(() => {
    if (isMounted) {
      const roomId = searchParams.get('roomId');
      const username = searchParams.get('username');

      if (roomId && username) {
        setSelectedRoom({ roomId, username });
      } else {
        setSelectedRoom(null);
      }
    }
  }, [isMounted, searchParams, currentUsername]);

  const { isConnected, messages, totalUnreadCount, sendMessage, createRoom } = useStompChat({
    socketUrl: 'http://localhost:8080/api/websocket',
    username: currentUsername || undefined,
    chatRoomId: selectedRoom?.roomId,
    receiverUsername: selectedRoom?.username,
    autoConnect: true,
  });

  const handleRoomSelect = useCallback((roomId: string, username: string) => {
    router.push(`/chat?roomId=${encodeURIComponent(roomId)}&username=${encodeURIComponent(username)}`);
  }, []);

  const handleCreateRoom = useCallback(async (roomName: string, participants: string[]) => {
    try {
      await createRoom(roomName, participants);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  }, []);

  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };

  const { data: chatRooms = [], isLoading: roomsLoading } = useChatRooms();
  const { data: members = [], isLoading: membersLoading } = useFetchMembers();

  return (
    <Dashboard>
      <div className={layoutCss}>
        <div className={sidebarCss}>
          <ChatSidebar
            width={340}
            searchPlaceholder="Tìm liên hệ..."
            chatRooms={chatRooms}
            members={members}
            selectedRoomId={selectedRoom?.roomId}
            totalUnreadCount={totalUnreadCount}
            currentUsername={currentUsername || undefined}
            onRoomSelect={handleRoomSelect}
            onCreateRoom={handleCreateRoom}
            isLoading={roomsLoading || membersLoading}
          />
        </div>
        <div className={chatWindowCss}>
          {selectedRoom ? (
            <ChatWindow
              title={selectedRoom.username}
              messages={messages || []}
              currentUsername={currentUsername || undefined}
              isConnected={isConnected}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className={emptyChatCss}>
              <div className={emptyIconCss}>💬</div>
              <h3 className={emptyTitleCss}>Chọn cuộc trò chuyện</h3>
              <p className={emptyDescriptionCss}>Chọn liên hệ từ sidebar để bắt đầu nhắn tin</p>
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
}

const layoutCss = css({
  display: 'flex',
  height: 'calc(100vh - 190px)',
  width: '100%',
  backgroundColor: 'transparent',
});

const sidebarCss = css({
  flexShrink: 0,
  borderRight: '1px solid #eee',
});

const chatWindowCss = css({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
});

const emptyChatCss = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FAFAFA',
  color: '#666',
});

const emptyIconCss = css({
  fontSize: '4rem',
  marginBottom: '1rem',
  opacity: 0.5,
});

const emptyTitleCss = css({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  color: '#333',
});

const emptyDescriptionCss = css({
  fontSize: '1rem',
  textAlign: 'center',
  maxWidth: '300px',
  lineHeight: 1.5,
});
