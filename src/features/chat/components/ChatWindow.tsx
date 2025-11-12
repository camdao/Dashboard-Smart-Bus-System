'use client';

import { css, cx } from '@/styled-system/css';

import type { ChatMessage, ChatRoom, ChatUser } from '../types/chatTypes';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

interface ChatWindowProps {
  title?: string;
  subtitle?: string;
  currentRoom?: ChatRoom;
  messages?: ChatMessage[];
  currentUsername?: string;
  activeUsers?: ChatUser[];
  isConnected?: boolean;
  onSendMessage?: (content: string) => void;
}

const ChatWindow = ({
  title,
  subtitle,
  currentRoom,
  messages = [],
  currentUsername,
  activeUsers = [],
  isConnected = false,
  onSendMessage,
}: ChatWindowProps) => {
  const displayTitle = currentRoom?.name || title || 'Select a chat';
  const displaySubtitle = currentRoom
    ? `${currentRoom.participants?.length || 0} participants · ${isConnected ? 'Connected' : 'Disconnected'}`
    : subtitle || 'Select a contact to start messaging';

  const isUserOnline = (username: string) => activeUsers.find((user) => user.username === username)?.isOnline || false;

  const handleSend = (content: string) => {
    if (currentRoom && onSendMessage) {
      onSendMessage(content);
    }
  };

  // Nếu chưa chọn room, hiển thị màn hình chờ
  if (!currentRoom) {
    return (
      <section className={windowCss}>
        <div className={emptyStateCss}>
          <div className={emptyIconCss}>💬</div>
          <h3 className={emptyTitleCss}>No chat selected</h3>
          <p className={emptyDescriptionCss}>Choose a contact from the sidebar to start messaging</p>
        </div>
      </section>
    );
  }

  return (
    <section className={windowCss}>
      <div className={cardCss}>
        <div className={headerCss}>
          <div className={profileCss} />
          <div className={metaCss}>
            <div className={nameCss}>{displayTitle}</div>
            <div className={statusCss}>{displaySubtitle}</div>
          </div>
          <div className={connectionIndicatorCss}>
            <div className={cx(connectionDotCss, isConnected && connectedCss)} />
          </div>
        </div>

        <div className={messagesCss}>
          {messages.length > 0 ? (
            messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                text={msg.content}
                fromSelf={msg.senderUsername === currentUsername}
                timestamp={msg.timestamp}
                isRead={msg.isRead}
                senderOnline={isUserOnline(msg.senderUsername)}
              />
            ))
          ) : (
            <div className={emptyMessagesCss}>
              <p>No messages yet</p>
              <p className={emptySubtextCss}>Start the conversation!</p>
            </div>
          )}
        </div>

        <MessageInput
          onSend={handleSend}
          disabled={!currentRoom || !isConnected}
          placeholder={currentRoom ? 'Type a message...' : 'Select a chat to start messaging'}
        />
      </div>
    </section>
  );
};

export default ChatWindow;

const windowCss = css({ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'stretch' });
const cardCss = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: 'white',
  boxShadow: '0 2px 10px rgba(15,23,42,0.04)',
});
const headerCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '14px 16px',
  boxShadow: '0 2px 10px rgba(15,23,42,0.04)',
  backgroundColor: 'transparent',
});
const profileCss = css({ width: '48px', height: '48px', borderRadius: '9999px', backgroundColor: 'gray.200' });
const metaCss = css({ display: 'flex', flexDirection: 'column' });
const nameCss = css({ fontWeight: 700 });
const statusCss = css({ fontSize: '12px', color: 'gray.400' });
const messagesCss = css({
  padding: '18px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  overflowY: 'auto',
  flex: 1,
  backgroundColor: 'transparent',
});

const connectionIndicatorCss = css({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
});

const connectionDotCss = css({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#EF4444', // red for disconnected
  transition: 'background-color 0.3s ease',
});

const connectedCss = css({
  backgroundColor: '#10B981', // green for connected
});

const emptyMessagesCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  color: 'gray.500',
  textAlign: 'center',
});

const emptySubtextCss = css({
  fontSize: '12px',
  color: 'gray.400',
  marginTop: '4px',
});

const emptyStateCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  backgroundColor: '#FAFAFA',
  textAlign: 'center',
  padding: '60px 20px',
});

const emptyIconCss = css({
  fontSize: '64px',
  marginBottom: '20px',
  opacity: 0.5,
});

const emptyTitleCss = css({
  fontSize: '24px',
  fontWeight: 600,
  color: 'gray.700',
  marginBottom: '12px',
  margin: 0,
});

const emptyDescriptionCss = css({
  fontSize: '16px',
  color: 'gray.500',
  lineHeight: 1.5,
  maxWidth: '300px',
  margin: 0,
});
