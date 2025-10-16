import { useState } from 'react';
import { css } from '@/styled-system/css';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import NavItem from './NavItem';

const meta: Meta<typeof NavItem> = {
  title: 'Component/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof NavItem>;

const wrapper = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '233px',
});

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState<string>('Trang chủ');

    const handleClick = (label: string) => {
      setActive(label);
    };

    return (
      <div className={wrapper}>
        <NavItem
          icon="lock"
          label="Dashboard"
          isActive={active === 'Trang chủ'}
          onClick={() => handleClick('Trang chủ')}
        />
        <NavItem icon="lock" label="Cài đặt" isActive={active === 'Cài đặt'} onClick={() => handleClick('Cài đặt')} />
      </div>
    );
  },
};
