'use client';
import Image from 'next/image';
import Button from '@/src/components/Button/Button';
import Input from '@/src/components/Input/Input';
import { css } from '@/styled-system/css';

export default function loginPage() {
  return (
    <>
      <div className={headerCss}>
        <Image src="/logo.svg" height={52} width={52} alt="Logo" />
      </div>
      <div className={container}>
        <div className={formContainer}>
          <div className={formCss}>
            <div className={LogoCss}>
              <Image className={imgCss} src="/logo.svg" height={52} width={52} alt="Logo" />
              <div className={introContent}>
                <div className={welcomeCss}>Welcome back!</div>
                <div className={subtitle}>Login to your account</div>
              </div>
            </div>
            <div className={inputCss}>
              <Input icon="message" placeholder="Username" />
              <Input icon="lock" type="password" placeholder="Password" />
            </div>
            <Button className={buttonCss} size="medium" variant="primary">
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

const headerCss = css({
  backgroundColor: 'white',
  height: '76px',
  alignItems: 'center',
  display: 'flex',
  paddingLeft: '40px',
});

const container = css({
  backgroundColor: '#F4F5FA',
  height: 'calc(100vh - 76px)',
  paddingTop: '121px',
});

const formContainer = css({
  maxWidth: '443px',
  height: '533px',
  margin: '0 auto',
  backgroundColor: 'white',
  borderRadius: '12px',
});

const formCss = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '44px 34px',
});

const inputCss = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
});

const buttonCss = css({
  margin: '48px auto',
  cursor: 'pointer',
});

const LogoCss = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  paddingBottom: '60px',
});

const introContent = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '8px',
});

const welcomeCss = css({
  textStyle: 'sh3Medium',
});

const subtitle = css({
  textStyle: 'p2Regular',
  color: 'black.30',
});

const imgCss = css({
  paddingBottom: '30px',
});
