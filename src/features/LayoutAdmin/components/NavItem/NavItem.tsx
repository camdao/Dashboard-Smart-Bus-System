import Icon, { type IconComponentMap } from '@/components/Icon';
import { css } from '@/styled-system/css';
import { cx } from '@/styled-system/css/cx';

interface NavItemProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  icon: keyof typeof IconComponentMap;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => {
  return (
    <div onClick={onClick} className={cx(navItemStyles, isActive && navItemActiveStyles)}>
      <Icon color="black.40" className={cx(iconStyles, isActive && IconActiveStyles)} name={icon} />
      <span>{label}</span>
    </div>
  );
};

export default NavItem;

const navItemStyles = css({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '16px 20px',
  borderRadius: '12px',
  cursor: 'pointer',
  color: 'black.60',
  transition: 'background-color 0.2s, color 0.2s',
  '&:hover': {
    backgroundColor: 'gray.10',
  },
});

const navItemActiveStyles = css({
  backgroundColor: 'blue.100',
  color: 'white',
});
const IconActiveStyles = css({
  color: 'white',
});
const iconStyles = css({
  display: 'flex',
  alignItems: 'center',
});
