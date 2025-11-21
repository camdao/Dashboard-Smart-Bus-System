import { token } from '@/styled-system/tokens';

import { DEFAULT_ICON_COLOR, type IconComponentProps } from '.';

function MessageBubbleIcon(props: IconComponentProps) {
  const { color, size = 16, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      color={iconColor}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
    </svg>
  );
}

export default MessageBubbleIcon;
