import Sidebar from '@/src/features/share/ui/LayoutAdmin/components/SideBar/SideBar';
import TopNav from '@/src/features/share/ui/LayoutAdmin/components/TopNav/TopNav';
import { css } from '@/styled-system/css';

interface DashboardProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  return (
    <div className={containerCss}>
      <Sidebar />
      <div className={mainContainer}>
        <TopNav />
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
