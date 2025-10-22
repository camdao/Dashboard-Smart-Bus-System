import { css, cx } from '@/styled-system/css';

interface MessageBubbleProps {
  text: string;
  time?: string;
  fromSelf?: boolean;
  maxWidth?: string | number;
  showTimestamp?: boolean;
  className?: string;
}

const MessageBubble = ({
  text,
  time = '12:55 am',
  fromSelf = false,
  maxWidth = '72%',
  showTimestamp = true,
  className,
}: MessageBubbleProps) => {
  const bubbleClass = cx(bubbleBase, fromSelf ? selfBubbleCss : otherBubbleCss, className);

  return (
    <div className={cx(wrapperCss, fromSelf ? selfCss : otherCss)} style={{ maxWidth }}>
      <div className={bubbleClass}>{text}</div>
      {showTimestamp && <div className={timeCss}>{time}</div>}
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
});

const timeCss = css({ fontSize: '12px', color: 'gray.400', alignSelf: 'flex-end' });

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
