import Image from 'next/image';
import { NAVIGATION } from '@/src/features/share/constants/navigation';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import Icon from '../../../../../../components/Icon';
import NavItem from '../NavItem/NavItem';

interface Props {
  current: string;
  onClick?: (item: (typeof NAVIGATION)[number]) => void;
}

function SidebarView({ current, onClick }: Props) {
  return (
    <div className={containerCss}>
      <div className={logoCss}>
        <Image src="/logo.svg" height={52} width={52} alt="Logo" />
        <div className={textCss}>Metrix</div>
      </div>

      <div className={menuItemsCss}>
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
      </div>

      <div className={logOutCss}>
        <Icon name="Logout" />
        <div className={textLogoutCss}>Logout</div>
      </div>
    </div>
  );
}

export default SidebarView;

const containerCss = flex({
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
  maxWidth: '296px',
  width: '100%',
  padding: '24px 0',
});

const logoCss = flex({
  alignItems: 'center',
  maxWidth: '233px',
  width: '100%',
  paddingBottom: '62px',
});

const textCss = css({
  textStyle: 'sh3Bold',
  marginLeft: '8px',
});

const menuItemsCss = flex({
  flexDirection: 'column',
  maxWidth: '233px',
  width: '100%',
  gap: '8px',
});

const logOutCss = flex({
  maxWidth: '233px',
  width: '100%',
  alignItems: 'center',
  gap: '8px',
  marginTop: 'auto',
  cursor: 'pointer',
  paddingTop: '24px',
});

const textLogoutCss = css({
  textStyle: 'p2Regular',
  color: 'red.100',
});
