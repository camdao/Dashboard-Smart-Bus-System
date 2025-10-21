import { css, cx } from '@/styled-system/css';

interface MessageBubbleProps {
  text: string;
  time?: string;
  fromSelf?: boolean;
}

const MessageBubble = ({ text, time = '12:55 am', fromSelf = false }: MessageBubbleProps) => {
  const bubbleClass = cx(bubbleBase, fromSelf ? selfBubbleCss : otherBubbleCss);

  return (
    <div className={cx(wrapperCss, fromSelf ? selfCss : otherCss)}>
      <div className={bubbleClass}>{text}</div>
      <div className={timeCss}>{time}</div>
    </div>
  );
};

export default MessageBubble;

const wrapperCss = css({ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '72%' });

const bubbleBase = css({
  padding: '12px 16px',
  borderRadius: '12px',
  fontSize: '14px',
  lineHeight: '20px',
  boxShadow: '0 4px 16px rgba(15,23,42,0.03)',
});

const timeCss = css({ fontSize: '12px', color: 'gray.400', alignSelf: 'flex-end' });

const selfCss = css({ alignSelf: 'flex-end', textAlign: 'right', gap: '6px' });
const otherCss = css({ alignSelf: 'flex-start' });

// We'll apply color classes inline for clarity
const selfBubbleCss = css({ backgroundColor: 'blue.500', color: 'white', borderTopRightRadius: '6px' });
const otherBubbleCss = css({ backgroundColor: 'gray.100', color: 'black.100', borderTopLeftRadius: '6px' });
