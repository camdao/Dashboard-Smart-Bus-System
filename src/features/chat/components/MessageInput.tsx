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
  disabled?: boolean;
}

const MessageInput = ({
  onSend,
  placeholder = 'Write a message...',
  buttonVariant = 'primary',
  compact = false,
  disabled = false,
}: MessageInputProps) => {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend?.(value.trim());
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={inputWrapCss}>
      <div className={inputContainerCss}>
        <Input
          value={value}
          onChange={setValue}
          placeholder={placeholder}
          disabled={disabled}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className={actionsCss}>
        <Button
          variant={buttonVariant}
          size={compact ? 'small' : 'small'}
          onClick={handleSend}
          disabled={disabled || !value.trim()}
        >
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
