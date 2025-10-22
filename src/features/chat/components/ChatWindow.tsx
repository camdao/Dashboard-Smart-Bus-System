'use client';

import { useState } from 'react';
import { css } from '@/styled-system/css';

import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

interface ChatWindowProps {
  title?: string;
  subtitle?: string;
}

const ChatWindow = ({ title = 'Jane Doe', subtitle = 'Online · 12:55 am' }: ChatWindowProps) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello, I want to make enquiries about your product', fromSelf: false },
    { id: 2, text: 'Hello Janet, thank you for reaching out', fromSelf: true },
  ] as Array<{ id: number; text: string; fromSelf?: boolean }>);

  const handleSend = (text: string) => {
    setMessages((m) => [...m, { id: Date.now(), text, fromSelf: true }]);
  };

  return (
    <section className={windowCss}>
      <div className={cardCss}>
        <div className={headerCss}>
          <div className={profileCss} />
          <div className={metaCss}>
            <div className={nameCss}>{title}</div>
            <div className={statusCss}>{subtitle}</div>
          </div>
        </div>

        <div className={messagesCss}>
          {messages.map((m) => (
            <MessageBubble key={m.id} text={m.text} fromSelf={m.fromSelf} />
          ))}
        </div>

        <MessageInput onSend={handleSend} />
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
