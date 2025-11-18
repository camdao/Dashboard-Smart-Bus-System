'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import Dashboard from '@/features/LayoutAdmin/containers/DashboardContainers';
import { css } from '@/styled-system/css';

interface DashboardMetrics {
  totalBuses: number;
  activeBuses: number;
  totalRoutes: number;
  totalDrivers: number;
  totalSchedules: number;
  activeSchedules: number;
  totalUsers: number;
  activeUsers: number;
  busesChange: number;
  routesChange: number;
  driversChange: number;
  schedulesChange: number;
  usersChange: number;
}

export default function DashboardFeatures() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalBuses: 0,
    activeBuses: 0,
    totalRoutes: 0,
    totalDrivers: 0,
    totalSchedules: 0,
    activeSchedules: 0,
    totalUsers: 0,
    activeUsers: 0,
    busesChange: 0,
    routesChange: 0,
    driversChange: 0,
    schedulesChange: 0,
    usersChange: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/dashboard/metrics');
      if (response.ok) {
        const data = await response.json();
        setMetrics(data);
      } else {
        setMetrics({
          totalBuses: 45,
          activeBuses: 38,
          totalRoutes: 12,
          totalDrivers: 52,
          totalSchedules: 156,
          activeSchedules: 89,
          totalUsers: 1254,
          activeUsers: 892,
          busesChange: 5,
          routesChange: 2,
          driversChange: 8,
          schedulesChange: 12,
          usersChange: 15,
        });
      }
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
      setMetrics({
        totalBuses: 45,
        activeBuses: 38,
        totalRoutes: 12,
        totalDrivers: 52,
        totalSchedules: 156,
        activeSchedules: 89,
        totalUsers: 1254,
        activeUsers: 892,
        busesChange: 5,
        routesChange: 2,
        driversChange: 8,
        schedulesChange: 12,
        usersChange: 15,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard>
      <div className={header}>
        <div>
          <h1 className={title}>Bảng điều khiển</h1>
          <p className={subtitle}>Tổng quan hệ thống Smart Bus</p>
        </div>
      </div>

      <div className={statsGrid}>
        <StatCard
          icon={<Icon name="ScheduleIcon" className={iconCss('blue.600')} />}
          bgColor="blue.50"
          iconBg="blue.100"
          label="Tổng số xe bus"
          value={metrics.totalBuses.toString()}
          subValue={`${metrics.activeBuses} đang hoạt động`}
          change={`+${metrics.busesChange}%`}
          changePositive={metrics.busesChange >= 0}
        />
        <StatCard
          icon={<Icon name="MapIcon" className={iconCss('green.600')} />}
          bgColor="blue.50"
          iconBg="blue.100"
          label="Tuyến đường"
          value={metrics.totalRoutes.toString()}
          subValue="tuyến đang vận hành"
          change={`+${metrics.routesChange}%`}
          changePositive={metrics.routesChange >= 0}
        />
        <StatCard
          icon={<Icon name="ScheduleIcon" className={iconCss('purple.600')} />}
          bgColor="purple.50"
          iconBg="purple.100"
          label="Tài xế"
          value={metrics.totalDrivers.toString()}
          subValue="tài xế đang làm việc"
          change={`+${metrics.driversChange}%`}
          changePositive={metrics.driversChange >= 0}
        />
        <StatCard
          icon={<Icon name="ScheduleIcon" className={iconCss('orange.600')} />}
          bgColor="orange.50"
          iconBg="orange.100"
          label="Lịch trình"
          value={metrics.totalSchedules.toString()}
          subValue={`${metrics.activeSchedules} lịch hôm nay`}
          change={`+${metrics.schedulesChange}%`}
          changePositive={metrics.schedulesChange >= 0}
        />
        <StatCard
          icon={<Icon name="ScheduleIcon" className={iconCss('indigo.600')} />}
          bgColor="indigo.50"
          iconBg="indigo.100"
          label="Người dùng"
          value={metrics.totalUsers.toString()}
          subValue={`${metrics.activeUsers} đang online`}
          change={`+${metrics.usersChange}%`}
          changePositive={metrics.usersChange >= 0}
        />
      </div>
    </Dashboard>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  bgColor: string;
  iconBg: string;
  label: string;
  value: string;
  subValue: string;
  change: string;
  changePositive: boolean;
}

const StatCard = ({ icon, bgColor, iconBg, label, value, subValue, change, changePositive }: StatCardProps) => {
  return (
    <div className={statCard(bgColor)}>
      <div className={statIconWrapper(iconBg)}>{icon}</div>
      <div className={statContent}>
        <p className={statLabel}>{label}</p>
        <div className={statValueRow}>
          <span className={statValue}>{value}</span>
          <span className={statChange(changePositive)}>
            {changePositive ? '↗' : '↘'} {change}
          </span>
        </div>
        <p className={statSubValue}>{subValue}</p>
      </div>
    </div>
  );
};

// Styles
const header = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '32px',
  flexWrap: 'wrap',
  gap: '16px',
});

const title = css({
  fontSize: '3xl',
  fontWeight: 'bold',
  color: 'gray.800',
  marginBottom: '4px',
});

const subtitle = css({
  fontSize: 'md',
  color: 'gray.600',
});

const statsGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: '20px',
  marginBottom: '32px',
  '@media (min-width: 640px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (min-width: 768px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  '@media (min-width: 1024px)': {
    gridTemplateColumns: 'repeat(5, 1fr)', // ✅ 5 cột thay vì 4
  },
});

const statCard = (bgColor: string) =>
  css({
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '2xl',
    boxShadow: 'sm',
    border: '1px solid',
    borderColor: 'gray.100',
    transition: 'all 0.3s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: 'lg',
    },
  });

const statIconWrapper = (iconBg: string) =>
  css({
    width: '56px',
    height: '56px',
    backgroundColor: iconBg,
    borderRadius: 'xl',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  });

const statContent = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const statLabel = css({
  fontSize: 'sm',
  color: 'gray.600',
  fontWeight: 'medium',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

const statValueRow = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '12px',
});

const statValue = css({
  fontSize: '3xl',
  fontWeight: 'bold',
  color: 'gray.900',
});

const statChange = (positive: boolean) =>
  css({
    fontSize: 'sm',
    fontWeight: 'semibold',
    color: positive ? 'green.600' : 'red.600',
  });

const statSubValue = css({
  fontSize: 'xs',
  color: 'gray.500',
});

const iconCss = (color: string) =>
  css({
    width: '24px',
    height: '24px',
    color,
  });
