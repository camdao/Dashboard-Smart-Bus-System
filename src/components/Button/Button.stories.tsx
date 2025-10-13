import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from './Button';

const meta = {
  title: 'Component/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    controls: {
      include: ['variant', 'size', 'children', 'disabled'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: '327px', minHeight: '52px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: 'large',
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const CTA: Story = {
  args: {
    size: 'large',
    children: 'CTA Button',
    variant: 'cta',
  },
};

export const SecondaryButton: Story = {
  args: {
    size: 'large',
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const MediumButton: Story = {
  args: {
    size: 'medium',
    variant: 'primary',
    children: 'Button',
  },
};

export const SmallButton: Story = {
  args: {
    size: 'small',
    variant: 'primary',
    children: 'Button',
  },
};

export const PrimaryStroke = {
  args: {
    size: 'medium',
    variant: 'ctaStroke',
    children: 'Primary Stroke',
  },
};
