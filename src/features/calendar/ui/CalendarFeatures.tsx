import Icon from '@/components/Icon';
import Dashboard from '@/features/LayoutAdmin/containers/DashboardContainers';
import { css } from '@/styled-system/css';

export default function CalendarFeatures() {
  return (
    <Dashboard>
      <div className={container}>
        <h1 className={title}>Lịch làm việc</h1>

        <div className={statsGrid}>
          <StatCard icon={<Icon name="EyeIcon" className={iconCss('blue.500')} />} label="Sự kiện hôm nay" value="5" />
          <StatCard
            icon={<Icon name="EyeIcon" className={iconCss('orange.500')} />}
            label="Sự kiện sắp tới"
            value="12"
          />
          <StatCard icon={<Icon name="EyeIcon" className={iconCss('green.500')} />} label="Đã hoàn thành" value="8" />
        </div>

        <div className={contentBox}>
          <h2 className={subTitle}>Lịch tổng quan</h2>
          <p>
            Đây là khu vực hiển thị lịch làm việc hoặc sự kiện trong hệ thống. Bạn có thể tích hợp thêm component lịch
            (ví dụ <code>react-calendar</code> hoặc <code>fullcalendar</code>) vào khu vực này sau.
          </p>

          <div className={calendarPlaceholder}>
            <Icon name="EyeIcon" className={iconCss('gray.400')} />
            <p>Hiện chưa có lịch — bạn có thể thêm mới hoặc kết nối API lịch.</p>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const StatCard = ({ icon, label, value }: StatCardProps) => {
  return (
    <div className={statCard}>
      <div className={statIcon}>{icon}</div>
      <div className={statInfo}>
        <p className={statLabel}>{label}</p>
        <p className={statValue}>{value}</p>
      </div>
    </div>
  );
};

// 🎨 Styles
const container = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '32px',
  backgroundColor: 'gray.50',
  minHeight: '100vh',
});

const title = css({
  fontSize: '2xl',
  fontWeight: 'bold',
  marginBottom: '24px',
});

const statsGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '20px',
  width: '100%',
  maxWidth: '800px',
  marginBottom: '32px',
});

const statCard = css({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '2xl',
  boxShadow: 'md',
  gap: '16px',
});

const statIcon = css({
  backgroundColor: 'gray.100',
  padding: '12px',
  borderRadius: 'xl',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const statInfo = css({
  flex: 1,
});

const statLabel = css({
  color: 'gray.500',
  fontSize: 'sm',
});

const statValue = css({
  fontSize: 'xl',
  fontWeight: 'bold',
});

const contentBox = css({
  width: '100%',
  maxWidth: '800px',
  backgroundColor: 'white',
  padding: '24px',
  borderRadius: '2xl',
  boxShadow: 'md',
  textAlign: 'center',
});

const subTitle = css({
  fontSize: 'lg',
  fontWeight: 'semibold',
  marginBottom: '12px',
});

const calendarPlaceholder = css({
  marginTop: '24px',
  border: '2px dashed #d1d5db',
  borderRadius: 'xl',
  padding: '40px',
  color: 'gray.500',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  fontSize: 'sm',
});

const iconCss = (color: string) =>
  css({
    width: '24px',
    height: '24px',
    color,
  });
