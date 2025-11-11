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
    border: 'none',
    outline: 'none',
    transition: 'all 0.2s ease',

    _hover: {
      opacity: 0.9,
      transform: 'translateY(-1px)',
    },

    _active: {
      transform: 'translateY(0)',
      opacity: 1,
    },

    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      transform: 'none',
    },
  },
  variants: {
    size: {
      small: {
        height: '38px',
        padding: '0 20px',
        borderRadius: '8px',
        textStyle: 'p2Medium',
      },
      medium: {
        height: '44px',
        padding: '0 30px',
        borderRadius: '10px',
        textStyle: 'p1Medium',
      },
      large: {
        height: '52px',
        padding: '0 36px',
        width: '100%',
        borderRadius: '12px',
        textStyle: 'p1Bold',
      },
    },
    variant: {
      primary: {
        background: 'linear-gradient(135deg, #4A6CF7 0%, #5C89FF 100%)',
        color: 'white',
        boxShadow: '0 2px 8px rgba(74, 108, 247, 0.25)',
        _hover: {
          boxShadow: '0 4px 12px rgba(74, 108, 247, 0.35)',
        },
      },
      secondary: {
        background: '#6B7280',
        color: 'white',
        boxShadow: '0 2px 8px rgba(107, 114, 128, 0.2)',
        _hover: {
          background: '#4B5563',
          boxShadow: '0 4px 12px rgba(107, 114, 128, 0.3)',
        },
      },
      cta: {
        background: 'linear-gradient(135deg, #00C897 0%, #00E6A6 100%)',
        color: 'white',
        boxShadow: '0 2px 8px rgba(0, 200, 151, 0.25)',
        _hover: {
          boxShadow: '0 4px 12px rgba(0, 200, 151, 0.35)',
        },
      },
      primaryStroke: {
        background: 'transparent',
        color: '#4A6CF7',
        border: '2px solid #4A6CF7',
        boxShadow: 'none',
        _hover: {
          background: 'rgba(74, 108, 247, 0.05)',
        },
      },
    },
  },
});

const Button = styled('button', buttonStyle);

export default Button;
