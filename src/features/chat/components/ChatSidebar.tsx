import { css } from '@/styled-system/css';

import ContactItem from './ContactItem';

const ChatSidebar = () => {
  return (
    <aside className={sidebarCss}>
      <div className={headerCss}>
        <h3 className={titleCss}>Contacts</h3>
        <span className={countCss}>34</span>
      </div>

      <div className={searchCss}>
        <input placeholder="Search" className={searchInputCss} />
      </div>

      <div className={listCss}>
        <ContactItem name="Jane Doe" lastMessage="Hi, I want make enquiries about you..." unread={2} />
        <ContactItem name="Janet Adebayo" lastMessage="I want to know if the price is negotiable" />
        <ContactItem name="Kunle Adekunle" lastMessage="Is delivery available?" />
      </div>
    </aside>
  );
};

export default ChatSidebar;

const sidebarCss = css({
  width: '340px',
  padding: '18px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  backgroundColor: 'white',
});

const headerCss = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const titleCss = css({ fontSize: '16px', fontWeight: 700 });
const countCss = css({ fontSize: '13px', color: 'gray.400' });

const searchCss = css({});
const searchInputCss = css({
  width: '100%',
  padding: '12px 14px',
  borderRadius: '10px',
  border: '1px solid',
  borderColor: 'gray.200',
  backgroundColor: 'gray.50',
});

const listCss = css({
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  paddingRight: '4px',
});
