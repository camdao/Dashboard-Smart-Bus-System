'use client';

import { usePathname } from 'next/navigation';
import { NAVIGATION } from '@/src/features/share/constants/navigation';
import { css } from '@/styled-system/css';

const TopNav = () => {
  const pathname = usePathname();

  const current = NAVIGATION.find((item) => item.path === pathname)?.name || NAVIGATION[0].key;

  return (
    <>
      <div className={topNavStyles}>
        <span className={dashboardTextStyles}>{current}</span>
      </div>
      <div className={breadcrumbs}></div>
    </>
  );
};
export default TopNav;

const topNavStyles = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '70px',
  borderBottom: '1px solid',
  borderColor: 'white.70',
});
const dashboardTextStyles = css({
  color: 'black.60',
  textStyle: 'sh3Medium',
  alignContent: 'center',
});
const breadcrumbs = css({
  height: '24px',
});
