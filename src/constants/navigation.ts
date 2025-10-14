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
    path: ROUTER.HOME,
  },
  {
    icon: 'CategoryIcon',
    key: 'dashboard2',
    name: 'Dashboard',
    path: ROUTER.HOME,
  },
];
