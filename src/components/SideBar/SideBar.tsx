import { usePathname, useRouter } from 'next/navigation';
import { NAVIGATION } from '@/src/constants/navigation';

import SidebarView from './SideBarView';

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const current = NAVIGATION.find((item) => item.path === pathname)?.key || NAVIGATION[0].key;

  const handleClick = (item: (typeof NAVIGATION)[number]) => {
    router.push(item.path);
  };

  return <SidebarView current={current} onClick={handleClick} />;
}

export default Sidebar;
