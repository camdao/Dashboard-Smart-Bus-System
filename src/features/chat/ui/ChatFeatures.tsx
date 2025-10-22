import Dashboard from '@/features/LayoutAdmin/containers/DashboardContainers';
import { css } from '@/styled-system/css';

import ChatSidebar from '../components/ChatSidebar';
import ChatWindow from '../components/ChatWindow';

export default function ChatFeatures() {
  return (
    <Dashboard>
      <div className={layoutCss}>
        <div className={sidebarCss}>
          <ChatSidebar width={340} searchPlaceholder="Search contacts..." />
        </div>
        <div className={chatWindowCss}>
          <ChatWindow title="Jane Doe" subtitle="Online · 12:55 am" />
        </div>
      </div>
    </Dashboard>
  );
}

const layoutCss = css({
  display: 'flex',
  height: 'calc(100vh - 190px)',
  width: '100%',
  backgroundColor: 'transparent',
});

const sidebarCss = css({
  flexShrink: 0,
  borderRight: '1px solid #eee',
});

const chatWindowCss = css({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
});
