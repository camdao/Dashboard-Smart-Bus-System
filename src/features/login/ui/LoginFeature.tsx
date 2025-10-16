'use client';
import Image from 'next/image';
import Button from '@/src/components/Button/Button';
import Input from '@/src/components/Input/Input';
import { css } from '@/styled-system/css';

export function LoginFeature() {
  return (
    <>
      <div className={headerCss}>
        <Image src="/logo.svg" height={52} width={52} alt="Logo" />
      </div>
      <main className={container}>
        <section className={formContainer}>
          <div className={formCss}>
            <div className={LogoCss}>
              <Image src="/logo.svg" height={52} width={52} alt="Logo" />
              <div className={textGroup}>
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
        </section>
      </main>
    </>
  );
}

const headerCss = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  backgroundColor: 'white',
  height: '76px',
  alignItems: 'center',
  display: 'flex',
  paddingLeft: '40px',
});

const container = css({
  backgroundColor: 'white.50',
  minHeight: '100vh',
  paddingTop: '121px',
});

const formContainer = css({
  width: '90%',
  maxWidth: '443px',
  backgroundColor: 'white',
  borderRadius: '12px',
  margin: '0 auto',
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
  marginBottom: '48px',
});

const buttonCss = css({
  alignSelf: 'center',
  cursor: 'pointer',
});

const LogoCss = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: '60px',
  gap: '20px',
});

const welcomeCss = css({
  textStyle: 'sh3Medium',
});

const subtitle = css({
  textStyle: 'p2Regular',
  color: 'black.30',
});

const textGroup = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '8px',
});
