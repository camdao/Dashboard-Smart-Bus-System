import Icon from '@/components/Icon';
import Dashboard from '@/features/LayoutAdmin/containers/DashboardContainers';
import { css } from '@/styled-system/css';

export default function DashboardFeatures() {
  return (
    <Dashboard>
      <h1 className={title}>Bảng điều khiển</h1>
      <div className={statsGrid}>
        <StatCard
          icon={<Icon name="EyeIcon" className={iconCss('blue.500')} />}
          label="Người dùng"
          value="1,254"
          change="+12%"
        />
        <StatCard
          icon={<Icon name="EyeIcon" className={iconCss('green.500')} />}
          label="Doanh thu"
          value="$8,420"
          change="+8%"
        />
        <StatCard
          icon={<Icon name="EyeIcon" className={iconCss('purple.500')} />}
          label="Đơn hàng"
          value="327"
          change="+5%"
        />
        <StatCard
          icon={<Icon name="EyeIcon" className={iconCss('orange.500')} />}
          label="Lượt truy cập"
          value="12,540"
          change="+15%"
        />
      </div>

      <div className={contentBox}>
        <h2 className={subTitle}>Tổng quan hoạt động</h2>
        <p>
          Dưới đây là phần thống kê nhanh về hệ thống của bạn. Các chỉ số được cập nhật theo thời gian thực để giúp bạn
          nắm bắt hiệu suất tổng thể.
        </p>
      </div>
    </Dashboard>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
}

const StatCard = ({ icon, label, value, change }: StatCardProps) => {
  return (
    <div className={statCard}>
      <div className={statIcon}>{icon}</div>
      <div className={statInfo}>
        <p className={statLabel}>{label}</p>
        <p className={statValue}>{value}</p>
        <p className={statChange}>{change}</p>
      </div>
    </div>
  );
};

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
  maxWidth: '1000px',
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

const statChange = css({
  fontSize: 'sm',
  color: 'green.500',
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

const iconCss = (color: string) =>
  css({
    width: '24px',
    height: '24px',
    color,
  });
