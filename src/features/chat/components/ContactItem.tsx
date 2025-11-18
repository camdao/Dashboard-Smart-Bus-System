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
    <div 
      className={cx(containerCss, isActiveContact && selectedCss, 'group')} 
      onClick={onClick}
    >
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
  borderRadius: '12px',
  transition: 'all 0.2s ease',
  position: 'relative',
  overflow: 'hidden',
  
  _hover: { 
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    transform: 'translateX(4px)',
    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.1)',
  },
  
  _active: {
    transform: 'translateX(2px)',
  },
});

const avatarCss = css({
  width: '48px',
  height: '48px',
  borderRadius: '9999px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  flexShrink: 0,
  transition: 'transform 0.2s ease',
  boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
  
  _groupHover: {
    transform: 'scale(1.05)',
  },
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
  backgroundColor: 'blue.500',
  color: 'white',
  fontSize: '11px',
  fontWeight: 600,
  padding: '3px 8px',
  borderRadius: '9999px',
  minWidth: '20px',
  textAlign: 'center',
  boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
});

const selectedCss = css({ 
  backgroundColor: 'rgba(59, 130, 246, 0.15)',
  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.15)',
  
  _hover: {
    backgroundColor: 'rgba(59, 130, 246, 0.18)',
  },
});

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
  boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)',
  animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
  
  _before: {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '9999px',
    backgroundColor: '#10B981',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
});
