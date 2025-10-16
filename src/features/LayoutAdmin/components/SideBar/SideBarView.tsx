import Image from 'next/image';
import Icon from '@/components/Icon';
import { NAVIGATION } from '@/features/share/constants/navigation';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns/flex';

import NavItem from '../NavItem/NavItem';

interface Props {
  current: string;
  onClick?: (item: (typeof NAVIGATION)[number]) => void;
}

function SidebarView({ current, onClick }: Props) {
  return (
    <aside className={containerCss}>
      {/* Logo */}
      <div className={logoCss}>
        <Image src="/logo.svg" height={48} width={48} alt="Logo" />
        <div className={textCss}>Metrix</div>
      </div>

      {/* Navigation */}
      <nav className={menuItemsCss}>
        {NAVIGATION.map((item) => {
          const isActive = item.key === current;
          return (
            <NavItem
              key={item.key}
              icon={item.icon}
              label={item.name}
              isActive={isActive}
              onClick={() => onClick?.(item)}
            />
          );
        })}
      </nav>

      {/* Logout */}
      <div className={logOutCss}>
        <div className={logoutInnerCss}>
          <Icon name="Logout" />
          <span className={textLogoutCss}>Đăng xuất</span>
        </div>
      </div>
    </aside>
  );
}

export default SidebarView;

const containerCss = flex({
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
  width: '260px',
  padding: '28px 20px',
  background: 'linear-gradient(180deg, #ffffff 0%, #f8faff 100%)',
  borderRight: '1px solid token(colors.gray.30)',
  boxShadow: '2px 0 6px rgba(0,0,0,0.04)',
});

const logoCss = flex({
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  marginBottom: '48px',
});

const textCss = css({
  fontWeight: 700,
  fontSize: '20px',
  color: 'blue.100',
  marginLeft: '10px',
});

const menuItemsCss = flex({
  flexDirection: 'column',
  gap: '6px',
  width: '100%',
  flexGrow: 1,
});

const logOutCss = flex({
  width: '100%',
  marginTop: 'auto',
  paddingTop: '24px',
  borderTop: '1px solid token(colors.gray.20)',
});

const logoutInnerCss = flex({
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  padding: '12px 16px',
  borderRadius: '10px',
  color: 'black.70',
  transition: 'all 0.2s ease',
  _hover: {
    backgroundColor: 'gray.10',
    color: 'red.90',
  },
});

const textLogoutCss = css({
  fontSize: '15px',
  fontWeight: 500,
});
