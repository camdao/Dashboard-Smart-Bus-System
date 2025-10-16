import Icon, { type IconComponentMap } from '@/components/Icon';
import { css, cx } from '@/styled-system/css';

interface NavItemProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  icon: keyof typeof IconComponentMap;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => {
  return (
    <div onClick={onClick} className={cx(navItemBase, isActive && navItemActive)}>
      <Icon className={cx(iconBase, isActive && iconActive)} name={icon} />
      <span className={cx(labelBase, isActive && labelActive)}>{label}</span>
    </div>
  );
};

export default NavItem;

// 🎨 CSS
const navItemBase = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  padding: '12px 16px',
  borderRadius: '10px',
  color: 'black.70',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  _hover: {
    backgroundColor: 'gray.10',
    color: 'black.90',
    transform: 'translateX(3px)',
  },
});

const navItemActive = css({
  background: 'linear-gradient(90deg, token(colors.blue.100), token(colors.blue.80))',
  color: 'white',
  boxShadow: '0 3px 6px rgba(0,0,0,0.08)',
});

const iconBase = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  transition: 'color 0.2s ease',
});

const iconActive = css({
  color: 'white',
});

const labelBase = css({
  fontSize: '15px',
  fontWeight: '500',
  transition: 'color 0.2s ease',
});

const labelActive = css({
  color: 'white',
});
