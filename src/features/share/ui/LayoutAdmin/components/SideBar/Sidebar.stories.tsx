import { useState } from 'react';
import type { Meta } from '@storybook/nextjs-vite';

import SidebarView from './SideBarView';

const meta: Meta<typeof SidebarView> = {
  title: 'Component/SidebarView',
  component: SidebarView,
  tags: ['autodocs'],
};

export default meta;

export const Default = () => {
  const [current, setCurrent] = useState('dashboard');

  return <SidebarView current={current} onClick={(item) => setCurrent(item.key)} />;
};
