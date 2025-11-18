'use client';

import { useEffect, useRef } from 'react';
import { css, cx } from '@/styled-system/css';

import type { ChatMessage } from '../types/chatTypes';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

interface ChatWindowProps {
  title?: string;
  subtitle?: string;
  messages?: ChatMessage[];
  currentUsername?: string;
  isConnected?: boolean;
  onSendMessage?: (content: string) => void;
}

const ChatWindow = ({ title, messages = [], currentUsername, isConnected = false, onSendMessage }: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (content: string) => {
    if (title && onSendMessage) {
      onSendMessage(content);
    }
  };

  return (
    <section className={windowCss}>
      <div className={cardCss}>
        <div className={headerCss}>
          <div className={profileCss} />
          <div className={metaCss}>
            <div className={nameCss}>{title}</div>
          </div>
          <div className={connectionIndicatorCss}>
            <div className={cx(connectionDotCss, isConnected && connectedCss)} />
          </div>
        </div>

        <div className={messagesCss}>
          {messages.length > 0 ? (
            <>
              {messages.map((msg, index) => {
                const isFromSelf = msg.senderUsername === currentUsername;
                console.log('Message:', {
                  id: msg.id,
                  content: msg.content,
                  senderUsername: msg.senderUsername,
                  currentUsername: currentUsername,
                  isFromSelf: isFromSelf,
                });
                return (
                  <MessageBubble
                    key={msg.id ? `${msg.id}-${index}` : `temp-${index}`}
                    text={msg.content}
                    fromSelf={isFromSelf}
                    timestamp={msg.timestamp}
                    isRead={msg.isRead}
                    senderOnline={false}
                  />
                );
              })}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <div className={emptyMessagesCss}>
              <p>No messages yet</p>
              <p className={emptySubtextCss}>Start the conversation!</p>
            </div>
          )}
        </div>

        <MessageInput
          onSend={handleSend}
          disabled={!title || !isConnected}
          placeholder={title ? 'Type a message...' : 'Select a chat to start messaging'}
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
  backgroundColor: '#EF4444',
  transition: 'background-color 0.3s ease',
});

const connectedCss = css({
  backgroundColor: '#10B981',
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
