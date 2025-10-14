import { css } from '@/styled-system/css';

interface TopNavProps {
  navText?: string;
}

const TopNav = ({ navText }: TopNavProps) => {
  return (
    <>
      <div className={topNavStyles}>
        <span className={dashboardTextStyles}>{navText}</span>
      </div>
      <div className={breadcrumbs}></div>
    </>
  );
};
export default TopNav;

const topNavStyles = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50px',
  borderBottom: '1px solid',
  borderColor: 'white.70',
  paddingBottom: '14px',
});
const dashboardTextStyles = css({
  color: 'black.60',
  textStyle: 'sh3Medium',
  alignContent: 'center',
});
const breadcrumbs = css({
  height: '24px',
});
