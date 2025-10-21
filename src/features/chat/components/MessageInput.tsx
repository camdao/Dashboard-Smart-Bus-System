'use client';
import { useState } from 'react';
import Button from '@/components/Button/Button';
import { css } from '@/styled-system/css';

interface MessageInputProps {
  onSend?: (text: string) => void;
}

const MessageInput = ({ onSend }: MessageInputProps) => {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (!value.trim()) return;
    onSend?.(value.trim());
    setValue('');
  };

  return (
    <div className={inputWrapCss}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={inputCss}
        placeholder="Write a message..."
      />
      <div className={actionsCss}>
        <Button variant="primary" size="small" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;

const inputWrapCss = css({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  padding: '14px',
  backgroundColor: 'white',
});

const inputCss = css({
  flex: 1,
  padding: '12px 14px',
  borderRadius: '12px',
  border: '1px solid',
  borderColor: 'gray.200',
  backgroundColor: 'gray.50',
});

const actionsCss = css({ display: 'flex', gap: '8px', alignItems: 'center' });
