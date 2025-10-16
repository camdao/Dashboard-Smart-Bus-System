import { type IconComponentMap } from '../../../components/Icon';
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
    icon: 'CategoryIcon',
    key: 'calendar',
    name: 'Calendar',
    path: ROUTER.CALENDAR,
  },
];
