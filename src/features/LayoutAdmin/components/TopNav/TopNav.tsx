'use client';
import { usePathname } from 'next/navigation';
import { NAVIGATION } from '@/features/share/constants/navigation';
import { css } from '@/styled-system/css';

const TopNav = () => {
  const pathname = usePathname();
  const current = NAVIGATION.find((item) => item.path === pathname)?.name || NAVIGATION[0].name;

  return (
    <header className={topNavStyles}>
      <h2 className={dashboardTextStyles}>{current}</h2>
    </header>
  );
};

export default TopNav;

const topNavStyles = css({
  display: 'flex',
  alignItems: 'center',
  height: '70px',
  padding: '0 28px',
  borderBottom: '1px solid ',
  borderBottomColor:'gray.50',
  backgroundColor: 'white',
  position: 'sticky',
  top: 0,
  zIndex: 20,
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  backdropFilter: 'blur(8px)',
});

const dashboardTextStyles = css({
  color: 'black.90',
  fontSize: '20px',
  fontWeight: 600,
  letterSpacing: '-0.2px',
});
