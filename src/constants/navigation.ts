import { type IconComponentMap } from '../components/Icon';
import { ROUTER } from './router';

export interface NavigationItemType {
  icon: keyof typeof IconComponentMap;
  key: string;
  name: string;
  path: string;
}

export const NAVIGATION: NavigationItemType[] = [
  {
    icon: 'CategoryIcon',
    key: 'dashboard',
    name: 'Dashboard',
    path: ROUTER.DASHBOARD,
  },
  {
    icon: 'ScheduleIcon',
    key: 'calendar',
    name: 'Calendar',
    path: ROUTER.CALENDAR,
  },
  {
    icon: 'MapIcon',
    key: 'map',
    name: 'Map',
    path: ROUTER.MAP,
  },
  {
    icon: 'ChatIcon',
    key: 'chat',
    name: 'Chat',
    path: ROUTER.CHAT,
  },
];
