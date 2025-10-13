import { cva } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';

export const buttonStyle = cva({
  base: {
    textStyle: 'sh3Regular',
    flexShrink: 0,
    display: 'block',
    textAlign: 'center',
    userSelect: 'none',
  },
  variants: {
    size: {
      small: {
        height: '58px',
        borderRadius: '12px',
        width: 'fit-content',
        padding: '0 12px',
        lineHeight: '34px',
      },
      medium: {
        width: 'fit-content',
        height: '58px',
        padding: '0 50px',
        borderRadius: '12px',
        lineHeight: '44px',
      },
      large: {
        width: '100%',
        height: '58px',
        padding: '0 24px',
        borderRadius: '12px',
        lineHeight: '44px',
      },
    },
    variant: {
      cta: {
        background: 'green.70',
        color: 'white.70',
      },
      primary: {
        background: 'blue.100',
        color: 'white.70',
      },
      secondary: {
        background: 'red.70',
        color: 'white.70',
      },
      ctaStroke: {
        background: 'transparent',
        color: 'green.70',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'green.70',
      },
      primaryStroke: {
        background: 'transparent',
        color: 'blue.100',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'blue.100',
      },
      secondaryStroke: {
        background: 'transparent',
        color: 'red.70',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'red.70',
      },
    },
  },
});

const Button = styled('button', buttonStyle);

export default Button;
