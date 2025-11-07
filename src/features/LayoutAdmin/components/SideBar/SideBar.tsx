'use client';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/features/LayoutAdmin/hooks/logout';
import { NAVIGATION } from '@/features/share/constants/navigation';

import SidebarView from './SideBarView';

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const current = NAVIGATION.find((item) => item.path === pathname)?.key || NAVIGATION[0].key;

  const handleClick = (item: (typeof NAVIGATION)[number]) => {
    router.push(item.path);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  return <SidebarView current={current} onClick={handleClick} onLogout={handleLogout} />;
}

export default Sidebar;
