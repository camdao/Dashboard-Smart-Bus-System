'use client';

import Sidebar from '@/src/components/SideBar/SideBar';
import TopNav from '@/src/components/TopNav/TopNav';
import { css } from '@/styled-system/css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={containerCss}>
      <Sidebar />
      <div className={mainContainer}>
        <TopNav navText="Dashboard" />
        <div className={mainCss}>{children}</div>
      </div>
    </div>
  );
}

const containerCss = css({
  display: 'flex',
  height: '100vh',
});

const mainContainer = css({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

const mainCss = css({
  flex: 1,
  backgroundColor: 'white.50',
});
