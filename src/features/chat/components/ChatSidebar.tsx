import Input from '@/components/Input/Input';
import { css } from '@/styled-system/css';

import ContactItem from './ContactItem';

interface ChatSidebarProps {
  width?: number | string;
  searchPlaceholder?: string;
}

const ChatSidebar = ({ width = '340px', searchPlaceholder = 'Search' }: ChatSidebarProps) => {
  return (
    <aside className={sidebarCss} style={{ width }}>
      <div className={headerCss}>
        <h3 className={titleCss}>Contacts</h3>
        <span className={countCss}>34</span>
      </div>

      <div className={searchCss}>
        <Input placeholder={searchPlaceholder} />
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

const listCss = css({
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  paddingRight: '4px',
});
