import { css } from '@/styled-system/css';

interface TopNavProps {
  navText?: string;
}

const TopNav = ({ navText }: TopNavProps) => {
  return (
    <nav className={topNavStyles}>
      <span className={dashboardTextStyles}>{navText}</span>
    </nav>
  );
};
export default TopNav;

const topNavStyles = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px',
  borderBottom: '1px solid',
  borderColor: 'white.70',
  paddingBottom: '14px',
});
const dashboardTextStyles = css({
  color: 'black.60',
  textStyle: 'sh3Medium',
  alignContent: 'center',
});
