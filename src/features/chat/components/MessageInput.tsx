'use client';
import { useState } from 'react';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { css } from '@/styled-system/css';

interface MessageInputProps {
  onSend?: (text: string) => void;
  placeholder?: string;
  buttonVariant?: 'primary' | 'secondary' | 'primaryStroke' | 'cta';
  compact?: boolean;
}

const MessageInput = ({
  onSend,
  placeholder = 'Write a message...',
  buttonVariant = 'primary',
  compact = false,
}: MessageInputProps) => {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (!value.trim()) return;
    onSend?.(value.trim());
    setValue('');
  };

  return (
    <div className={inputWrapCss}>
      <div className={inputContainerCss}>
        <Input value={value} onChange={setValue} placeholder={placeholder} />
      </div>

      <div className={actionsCss}>
        <Button variant={buttonVariant} size={compact ? 'small' : 'small'} onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;

const inputWrapCss = css({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  padding: '10px 12px',
  backgroundColor: 'transparent',
});

const inputContainerCss = css({
  flex: 1,
  minWidth: 0,
});

const actionsCss = css({ display: 'flex', gap: '8px', alignItems: 'center' });

// slightly smaller button style can be handled via Button props; keep CSS minimal here
