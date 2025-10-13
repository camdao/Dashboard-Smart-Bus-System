import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import TopNav from './TopNav';

const meta: Meta<typeof TopNav> = {
  title: 'Component/TopNav',
  component: TopNav,
  tags: ['autodocs'],
  argTypes: {
    navText: {
      control: 'text',
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof TopNav>;

export const Default: Story = {};

export const CustomTitle: Story = {
  args: {
    navText: 'User Profile',
  },
};
