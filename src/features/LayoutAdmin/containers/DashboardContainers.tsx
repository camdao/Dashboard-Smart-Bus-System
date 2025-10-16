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
        <div className={contentWrapper}>{children}</div>
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
  borderLeft: '1px solid',
  borderColor: 'gray.100',
});

const contentWrapper = css({
  flex: 1,
  overflowY: 'auto',
  padding: '24px',
  backgroundColor: 'white.50',
});
