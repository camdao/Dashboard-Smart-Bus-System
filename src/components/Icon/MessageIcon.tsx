import { token } from '@/styled-system/tokens';

import { DEFAULT_ICON_COLOR, type IconComponentProps } from '.';

function Message(props: IconComponentProps) {
  const { color, size = 24, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      color={iconColor}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M16.9024 6.85107L12.4591 10.4641C11.6196 11.1301 10.4384 11.1301 9.59895 10.4641L5.11816 6.85107"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.9089 19C18.9502 19.0084 21 16.5095 21 13.4384V6.57001C21 3.49883 18.9502 1 15.9089 1H6.09114C3.04979 1 1 3.49883 1 6.57001V13.4384C1 16.5095 3.04979 19.0084 6.09114 19H15.9089Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Message;
