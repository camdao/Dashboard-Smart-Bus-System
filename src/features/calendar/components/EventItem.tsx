import { TrashIcon } from '@/components/Icon/TrashIcon';
import { css } from '@/styled-system/css';

export default function EventItem({
  title,
  description,
  onDelete,
}: {
  title: string;
  description?: string;
  onDelete: () => void;
}) {
  const classes = `${wrapper}`.trim();
  const titleClasses = `${titleCss}`;
  const btnClasses = `${delBtn} event-delete-btn`;

  return (
    <div className={classes} title={description || ''}>
      <div className={titleClasses}>{title}</div>
      <button
        type="button"
        className={btnClasses}
        aria-label="Xóa sự kiện"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <TrashIcon width={16} height={16} />
      </button>
    </div>
  );
}

const wrapper = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  width: '100%',
});

const titleCss = css({
  color: 'white',
  fontWeight: '600',
  fontSize: '0.95em',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  flex: 1,
});

const delBtn = css({
  background: 'transparent',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  fontSize: '14px',
  padding: '0 4px',
  opacity: 0,
  transition: 'opacity 0.12s',
  '&:hover': {
    opacity: 1,
  },
});
