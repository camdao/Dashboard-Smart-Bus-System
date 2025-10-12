import { token } from '@/styled-system/tokens';

import { DEFAULT_ICON_COLOR, type IconComponentProps } from '.';

function EyeIcon(props: IconComponentProps) {
  const { color, size = 16, ...restProps } = props;

  const iconColor = color ? token.var(`colors.${color}`) : DEFAULT_ICON_COLOR;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      color={iconColor}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M0.666504 8C0.666504 8 3.33317 2.66667 7.99984 2.66667C12.6665 2.66667 15.3332 8 15.3332 8C15.3332 8 12.6665 13.3333 7.99984 13.3333C3.33317 13.3333 0.666504 8 0.666504 8Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default EyeIcon;
