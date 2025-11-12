import { css, cx } from '@/styled-system/css';

interface ContactItemProps {
  name: string;
  lastMessage?: string;
  time?: string;
  unread?: number;
  selected?: boolean;
  isSelected?: boolean;
  isOnline?: boolean;
  avatarSize?: number;
  onClick?: () => void;
}

const ContactItem = ({
  name,
  lastMessage,
  time = '12:55 am',
  unread = 0,
  selected = false,
  isSelected = false,
  isOnline = false,
  avatarSize = 48,
  onClick,
}: ContactItemProps) => {
  const isActiveContact = selected || isSelected;

  return (
    <div className={cx(containerCss, isActiveContact && selectedCss)} onClick={onClick}>
      <div className={avatarContainerCss}>
        <div className={avatarCss} style={{ width: avatarSize, height: avatarSize }} aria-hidden />
        {isOnline && <div className={onlineIndicatorCss} />}
      </div>
      <div className={contentCss}>
        <div className={rowCss}>
          <span className={nameCss}>{name}</span>
          <span className={timeCss}>{time}</span>
        </div>
        <div className={rowCss}>
          <span className={messageCss}>{lastMessage}</span>
          {unread > 0 && <span className={badgeCss}>{unread}</span>}
        </div>
      </div>
    </div>
  );
};

export default ContactItem;

const containerCss = css({
  display: 'flex',
  gap: '12px',
  padding: '12px',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: '10px',
  transition: 'background 0.15s ease',
  _hover: { backgroundColor: 'gray.50' },
});

const avatarCss = css({
  width: '48px',
  height: '48px',
  borderRadius: '9999px',
  background: 'linear-gradient(135deg,#E6F0FF,#D6E9FF)',
  flexShrink: 0,
});

const contentCss = css({
  flex: 1,
  minWidth: 0,
});

const rowCss = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const nameCss = css({
  fontWeight: 700,
  fontSize: '14px',
  color: 'black.100',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const timeCss = css({
  fontSize: '12px',
  color: 'gray.400',
  marginLeft: '8px',
  flexShrink: 0,
});

const messageCss = css({
  fontSize: '13px',
  color: 'gray.500',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const badgeCss = css({
  marginLeft: '8px',
  backgroundColor: 'blue.400',
  color: 'white',
  fontSize: '12px',
  padding: '4px 8px',
  borderRadius: '9999px',
});

const selectedCss = css({ backgroundColor: 'blue.50', borderLeft: '3px solid', borderColor: 'blue.400' });

const avatarContainerCss = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

const onlineIndicatorCss = css({
  position: 'absolute',
  bottom: '2px',
  right: '2px',
  width: '12px',
  height: '12px',
  backgroundColor: '#10B981',
  borderRadius: '9999px',
  border: '2px solid white',
});
