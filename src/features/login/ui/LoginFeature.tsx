'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { handleAuth } from '@/features/login/apis/getToken';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { css } from '@/styled-system/css';

export function LoginFeature() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);

    try {
      const result = await handleAuth(username, password);

      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={headerCss}>
        <Image src="/logo.svg" height={40} width={40} alt="Logo" />
      </div>
      <main className={container}>
        <section className={formContainer}>
          <form className={formCss} onSubmit={handleSubmit}>
            <div className={logoCss}>
              <Image src="/logo.svg" height={60} width={60} alt="Logo" />
              <div className={textGroup}>
                <div className={welcomeCss}>Welcome back</div>
                <div className={subtitle}>Login to your account</div>
              </div>
            </div>

            {error && (
              <div className={errorCss}>
                <span>{error}</span>
              </div>
            )}

            <div className={inputCss}>
              <Input icon="message" placeholder="Username" value={username} onChange={setUsername} disabled={loading} />
              <Input
                icon="lock"
                type="password"
                placeholder="Password"
                value={password}
                onChange={setPassword}
                disabled={loading}
              />
            </div>

            <Button className={buttonCss} size="medium" variant="primary" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
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
  height: '70px',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '40px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  zIndex: 10,
});

const container = css({
  background: 'linear-gradient(180deg, #f9fbff 0%, #eef3ff 100%)',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: '20vh',
});

const formContainer = css({
  width: '90%',
  maxWidth: '420px',
  backgroundColor: 'white',
  borderRadius: '16px',
  boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
  overflow: 'hidden',
  _hover: {
    boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
  },
});

const formCss = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '48px 36px',
});

const logoCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '12px',
  marginBottom: '48px',
});

const inputCss = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  marginBottom: '40px',
});

const buttonCss = css({
  alignSelf: 'center',
  cursor: 'pointer',
});

const welcomeCss = css({
  textStyle: 'sh3Medium',
  fontSize: '20px',
  color: 'black.90',
});

const subtitle = css({
  textStyle: 'p2Regular',
  fontSize: '15px',
  color: 'gray.500',
});

const textGroup = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
});

const errorCss = css({
  backgroundColor: 'red.50',
  color: 'red.600',
  padding: '12px 16px',
  borderRadius: '8px',
  fontSize: '14px',
  textAlign: 'center',
  marginBottom: '16px',
  border: '1px solid',
  borderColor: 'red.200',
});
