'use client';
import { useState } from 'react';
import { css } from '@/styled-system/css';

interface EventFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: { title: string; description: string }) => void;
  selectedDate: string;
}

export default function EventFormDialog({ isOpen, onClose, onSubmit, selectedDate }: EventFormDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle('');
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={overlay}>
      <div className={modal}>
        <h2 className={modalTitle}>Thêm sự kiện mới</h2>
        <p className={dateText}>Ngày: {selectedDate}</p>

        <form onSubmit={handleSubmit}>
          <div className={formGroup}>
            <label htmlFor="title" className={label}>
              Tiêu đề
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={input}
              required
            />
          </div>

          <div className={formGroup}>
            <label htmlFor="description" className={label}>
              Mô tả
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={textarea}
              rows={4}
            />
          </div>

          <div className={buttonGroup}>
            <button type="button" onClick={onClose} className={cancelButton}>
              Hủy
            </button>
            <button type="submit" className={submitButton}>
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlay = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
});

const modal = css({
  backgroundColor: 'white',
  padding: '24px',
  borderRadius: 'lg',
  width: '90%',
  maxWidth: '500px',
  boxShadow: 'lg',
});

const modalTitle = css({
  fontSize: 'xl',
  fontWeight: 'bold',
  marginBottom: '16px',
  color: 'gray.800',
});

const dateText = css({
  marginBottom: '20px',
  color: 'gray.600',
});

const formGroup = css({
  marginBottom: '16px',
});

const label = css({
  display: 'block',
  marginBottom: '8px',
  color: 'gray.700',
  fontSize: 'sm',
  fontWeight: 'medium',
});

const input = css({
  width: '100%',
  padding: '8px 12px',
  border: '1px solid',
  borderColor: 'gray.300',
  borderRadius: 'md',
  fontSize: 'sm',
  '&:focus': {
    outline: 'none',
    borderColor: 'blue.500',
    boxShadow: '0 0 0 1px blue.500',
  },
});

const textarea = css({
  width: '100%',
  padding: '8px 12px',
  border: '1px solid',
  borderColor: 'gray.300',
  borderRadius: 'md',
  fontSize: 'sm',
  resize: 'vertical',
  '&:focus': {
    outline: 'none',
    borderColor: 'blue.500',
    boxShadow: '0 0 0 1px blue.500',
  },
});

const buttonGroup = css({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  marginTop: '24px',
});

const buttonBase = {
  padding: '8px 16px',
  borderRadius: 'md',
  fontSize: 'sm',
  fontWeight: 'medium',
  cursor: 'pointer',
};

const cancelButton = css({
  ...buttonBase,
  backgroundColor: 'gray.100',
  color: 'gray.700',
  '&:hover': {
    backgroundColor: 'gray.200',
  },
});

const submitButton = css({
  ...buttonBase,
  backgroundColor: 'blue.500',
  color: 'white',
  '&:hover': {
    backgroundColor: 'blue.600',
  },
});
