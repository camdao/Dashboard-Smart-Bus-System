import { useState } from 'react';
import { css } from '@/styled-system/css';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import TextInput from './Input';

const meta: Meta<typeof TextInput> = {
  title: 'Component/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: ['message', 'lock', 'EyeOffIcon', 'EyeIcon'],
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '375px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    placeholder: 'Username',
  },
};

const validatedCss = css({
  backgroundColor: 'gray.gray100',
  border: 'none',
  _focus: { outline: 'none' },
});

export const Validated: Story = {
  args: {
    placeholder: 'Username',
    readOnly: true,
    className: validatedCss,
  },
};

export const WithError: StoryObj<typeof TextInput> = {
  render: (args) => {
    const [value, setValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('Username không được để trống');

    const handleChange = (newValue: string) => {
      setValue(newValue);
      if (errorMsg) setErrorMsg('');
    };

    return <TextInput {...args} value={value} errorMsg={errorMsg} onChange={handleChange} />;
  },
  args: {
    placeholder: 'Error',
  },
};
export const WithIcon: Story = {
  args: {
    placeholder: 'Enter your password',
    icon: 'lock',
    iconPosition: 'left',
    type: 'password',
  },
};

export const Filled: Story = {
  args: {
    placeholder: 'Readonly filled input',
    variant: 'filled',
    value: 'readonly value',
  },
};
