import { type SVGProps } from 'react';
import { type ColorToken } from '@/styled-system/tokens';

import EyeIcon from './EyeIcon';
import EyeOffIcon from './EyeOffIcon';
import LockIcon from './LockIcon';
import MessageIcon from './MessageIcon';

export const IconComponentMap = {
  message: MessageIcon,
  lock: LockIcon,
  EyeOffIcon: EyeOffIcon,
  EyeIcon: EyeIcon,
} as const;

interface Props extends IconComponentProps {
  name: keyof typeof IconComponentMap;
  color?: ColorToken;
}

export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  color?: ColorToken;
  onClick?: () => void;
  size?: number;
}

export default function Icon({ name, ...props }: Props) {
  const IconComponent = IconComponentMap[name];

  return <IconComponent {...props} />;
}

export const DEFAULT_ICON_COLOR = 'black.40';
