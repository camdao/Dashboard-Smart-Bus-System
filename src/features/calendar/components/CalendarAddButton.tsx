import { css, cx } from '@/styled-system/css';
interface CalendarAddButtonProps {
  onClick: () => void;
  className?: string;
}
export default function CalendarAddButton({ onClick, className }: CalendarAddButtonProps) {
  return (
    <button
      type="button"
      className={cx(addBtn, className)}
      tabIndex={0}
      aria-label="Thêm sự kiện mới"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        }
      }}
    >
      +
    </button>
  );
}
const addBtn = css({
  position: 'absolute',
  top: '6px',
  left: '6px',
  width: '22px',
  height: '22px',
  backgroundColor: 'blue.500',
  color: 'white',
  borderRadius: '50%',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: '700',
  cursor: 'pointer',
  zIndex: 10,
  opacity: 0,
  transition: 'opacity 0.15s, transform 0.15s, box-shadow 0.12s',
  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  '&:focus, &:focus-visible': {
    opacity: 1,
    transform: 'scale(1)',
    outline: 'none',
    boxShadow: '0 0 0 4px rgba(59,130,246,0.12)',
  },
});
