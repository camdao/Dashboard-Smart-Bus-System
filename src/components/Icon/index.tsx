import { type SVGProps } from 'react';
import { type ColorToken } from '@/styled-system/tokens';

import CategoryIcon from './CategoryIcon';
import EyeIcon from './EyeIcon';
import EyeOffIcon from './EyeOffIcon';
import LockIcon from './LockIcon';
import Logout from './Logout';
import MessageIcon from './MessageIcon';
import ScheduleIcon from './ScheduleIcon';

export const IconComponentMap = {
  message: MessageIcon,
  lock: LockIcon,
  EyeOffIcon: EyeOffIcon,
  EyeIcon: EyeIcon,
  Logout: Logout,
  CategoryIcon: CategoryIcon,
  ScheduleIcon: ScheduleIcon,
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
