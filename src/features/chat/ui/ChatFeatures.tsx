'use client';

import { useState } from 'react';
import Dashboard from '@/features/LayoutAdmin/containers/DashboardContainers';
import { css } from '@/styled-system/css';

import ChatSidebar from '../components/ChatSidebar';
import ChatWindow from '../components/ChatWindow';
import { useChat } from '../hooks';

export default function ChatFeatures() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>();
  const [currentUsername] = useState<string>('user123'); // TODO: get from auth context

  const {
    isConnected,
    isLoading,
    rooms,
    currentRoom,
    messages,
    activeUsers,
    totalUnreadCount,
    sendMessage,
    createRoom,
    switchRoom,
    markAllAsRead,
  } = useChat({
    socketUrl: 'ws://localhost:8080/api/websocket',
    username: currentUsername,
    chatRoomId: selectedRoomId,
    autoConnect: false, // Disable auto-connect temporarily for debugging
  });

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoomId(roomId);
    switchRoom(roomId);
    markAllAsRead();
  };

  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };

  return (
    <Dashboard>
      <div className={layoutCss}>
        <div className={sidebarCss}>
          <ChatSidebar
            width={340}
            searchPlaceholder="Search contacts..."
            rooms={rooms}
            activeUsers={activeUsers}
            selectedRoomId={selectedRoomId}
            totalUnreadCount={totalUnreadCount}
            onRoomSelect={handleRoomSelect}
            onCreateRoom={createRoom}
            isLoading={isLoading}
          />
        </div>
        <div className={chatWindowCss}>
          <ChatWindow
            currentRoom={currentRoom}
            messages={messages}
            currentUsername={currentUsername}
            activeUsers={activeUsers}
            isConnected={isConnected}
            onSendMessage={handleSendMessage}
          />
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
