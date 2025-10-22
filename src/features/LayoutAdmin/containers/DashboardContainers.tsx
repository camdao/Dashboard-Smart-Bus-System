import { css } from '@/styled-system/css';

import Sidebar from '../components/SideBar/SideBar';
import TopNav from '../components/TopNav/TopNav';

interface DashboardProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  return (
    <div className={containerCss}>
      <Sidebar />
      <div className={mainContainer}>
        <TopNav />
        <div className={contentWrapper}>
          <div className={container}> {children}</div>
        </div>
      </div>
    </div>
  );
}

const containerCss = css({
  display: 'flex',
  height: '100vh',
  backgroundColor: 'white.100',
  overflow: 'hidden',
});

const mainContainer = css({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  backgroundColor: 'white',
  boxShadow: '0 2px 10px rgba(15,23,42,0.04)',
});

const contentWrapper = css({
  flex: 1,
  overflowY: 'auto',
  padding: '24px',
  backgroundColor: 'white.50',
});
const container = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '32px',
  backgroundColor: 'white',
  minHeight: '100%',
});
