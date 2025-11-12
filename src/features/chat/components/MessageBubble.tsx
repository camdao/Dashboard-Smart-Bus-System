import { css, cx } from '@/styled-system/css';

interface MessageBubbleProps {
  text: string;
  time?: string;
  timestamp?: string;
  fromSelf?: boolean;
  maxWidth?: string | number;
  showTimestamp?: boolean;
  className?: string;
  isRead?: boolean;
  senderOnline?: boolean;
}

const MessageBubble = ({
  text,
  time = '12:55 am',
  timestamp,
  fromSelf = false,
  maxWidth = '72%',
  showTimestamp = true,
  className,
  isRead = false,
  senderOnline = false,
}: MessageBubbleProps) => {
  const formatTime = (ts: string) => {
    const date = new Date(ts);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  const displayTime = timestamp ? formatTime(timestamp) : time;
  const bubbleClass = cx(bubbleBase, fromSelf ? selfBubbleCss : otherBubbleCss, className);

  return (
    <div className={cx(wrapperCss, fromSelf ? selfCss : otherCss)} style={{ maxWidth }}>
      <div className={bubbleClass}>
        {text}
        {fromSelf && <div className={readStatusCss}>{isRead ? '✓✓' : '✓'}</div>}
      </div>
      {showTimestamp && (
        <div className={timeWrapperCss}>
          <span className={timeCss}>{displayTime}</span>
          {!fromSelf && senderOnline && <span className={onlineDotCss} />}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;

const wrapperCss = css({ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '72%' });

const bubbleBase = css({
  padding: '10px 14px',
  borderRadius: '10px',
  fontSize: '14px',
  lineHeight: '20px',
  position: 'relative',
});

const timeWrapperCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  alignSelf: 'flex-end',
});

const timeCss = css({ fontSize: '12px', color: 'gray.400' });

const readStatusCss = css({
  fontSize: '10px',
  color: 'rgba(255, 255, 255, 0.7)',
  marginLeft: '8px',
  display: 'inline-block',
});

const onlineDotCss = css({
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  backgroundColor: '#10B981',
  flexShrink: 0,
});

const selfCss = css({ alignSelf: 'flex-end', textAlign: 'right', gap: '6px' });
const otherCss = css({ alignSelf: 'flex-start' });

// We'll apply color classes inline for clarity
const selfBubbleCss = css({
  backgroundColor: 'blue.500',
  color: 'white',
  borderTopRightRadius: '8px',
  boxShadow: '0 6px 18px rgba(74,108,247,0.08)',
});
const otherBubbleCss = css({ backgroundColor: 'gray.100', color: 'black.100', borderTopLeftRadius: '8px' });
