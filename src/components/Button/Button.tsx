import { cva } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';

export const buttonStyle = cva({
  base: {
    textStyle: 'sh3Regular',
    flexShrink: 0,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    _active: {
      transform: 'translateY(0)',
      boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
      opacity: 1,
    },
  },
  variants: {
    size: {
      small: {
        height: '42px',
        padding: '0 18px',
        borderRadius: '10px',
      },
      medium: {
        height: '52px',
        padding: '0 40px',
        borderRadius: '12px',
      },
      large: {
        height: '58px',
        padding: '0 24px',
        width: '100%',
        borderRadius: '14px',
      },
    },
    variant: {
      primary: {
        background: 'linear-gradient(90deg, #4A6CF7 0%, #5C89FF 100%)',
        color: 'white',
      },
      secondary: {
        background: 'linear-gradient(90deg, #F44E77 0%, #FF6A88 100%)',
        color: 'white',
      },
      cta: {
        background: 'linear-gradient(90deg, #00C897 0%, #00E6A6 100%)',
        color: 'white',
      },
      primaryStroke: {
        background: 'transparent',
        color: '#4A6CF7',
        border: '2px solid #4A6CF7',
        _hover: {
          background: '#4A6CF7',
          color: 'white',
        },
      },
    },
  },
});

const Button = styled('button', buttonStyle);

export default Button;
