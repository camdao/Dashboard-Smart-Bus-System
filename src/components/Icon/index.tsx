import { type SVGProps } from 'react';
import { type ColorToken } from '@/styled-system/tokens';

import CategoryIcon from './CategoryIcon';
import ChatIcon from './ChatIcon';
import EyeIcon from './EyeIcon';
import EyeOffIcon from './EyeOffIcon';
import GroupIcon from './GroupIcon';
import LockIcon from './LockIcon';
import Logout from './Logout';
import MapIcon from './MapIcon';
import MessageBubbleIcon from './MessageBubbleIcon';
import MessageIcon from './MessageIcon';
import ScheduleIcon from './ScheduleIcon';
import { TrashIcon } from './TrashIcon';

export const IconComponentMap = {
  message: MessageIcon,
  lock: LockIcon,
  EyeOffIcon: EyeOffIcon,
  EyeIcon: EyeIcon,
  Logout: Logout,
  CategoryIcon: CategoryIcon,
  ScheduleIcon: ScheduleIcon,
  ChatIcon: ChatIcon,
  MapIcon: MapIcon,
  TrashIcon: TrashIcon,
  GroupIcon: GroupIcon,
  MessageBubbleIcon: MessageBubbleIcon,
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
