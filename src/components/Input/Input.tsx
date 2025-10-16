import { type InputHTMLAttributes, useState } from 'react';
import { css, cx } from '@/styled-system/css';
import { type Token, token } from '@/styled-system/tokens';
import { getBorderColor } from '@/utils/getBorderColor';

import Icon, { type IconComponentMap } from '../Icon';

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  errorMsg?: string;
  icon?: keyof typeof IconComponentMap;
  iconPosition?: 'left' | 'right';
  variant?: 'default' | 'filled';
  onChange?: (value: string) => void;
  value?: string;
}

const TextInput = ({ value, onChange, errorMsg, icon, variant, iconPosition = 'left', ...props }: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (props.maxLength && inputValue.length > props.maxLength) {
      return;
    }

    onChange?.(inputValue);
  };

  return (
    <div className={sectionCss}>
      <div
        className={cx(inputWrapperCss)}
        style={{
          borderColor: token.var(`colors.${getBorderColor(errorMsg, isFocused)}` as Token),
        }}
      >
        {icon && iconPosition === 'left' && <Icon color="black.40" className={iconCss} name={icon} />}
        <input
          className={inputCss}
          onChange={handleChange}
          onFocus={() => !props.readOnly && setIsFocused(true)}
          onBlur={() => !props.readOnly && setIsFocused(false)}
          readOnly={variant === 'filled'}
          {...props}
        />
        {icon && iconPosition === 'right' && <Icon color="black.40" name={icon} />}
      </div>
      {errorMsg && <p className={descriptionTextCss}>{errorMsg}</p>}
    </div>
  );
};

export default TextInput;

const sectionCss = css({});

const inputWrapperCss = css({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '10px 16px',
  height: '50px',
  border: '1.5px solid',
  borderRadius: '10px',
  borderColor: 'gray.300',
  backgroundColor: 'white',
  transition: 'all 0.2s ease-in-out',
  _focusWithin: {
    borderColor: 'blue.400',
    boxShadow: '0 0 0 3px rgba(59,130,246,0.15)',
  },
});

const descriptionTextCss = css({
  marginTop: '4px',
  fontSize: '14px',
  color: 'red.100',
  lineHeight: '20px',
});
const inputCss = css({
  flex: 1,
  height: '36px',
  textStyle: 'p1Regular',
  _focus: { outline: 'none' },
  _placeholder: { color: 'gray.gray300' },
});

const iconCss = css({
  marginRight: '16px',
});
