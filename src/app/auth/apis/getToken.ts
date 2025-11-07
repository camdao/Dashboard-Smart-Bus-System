'use client';

import { client } from '@/apis/client';
import { AxiosError } from 'axios';
import { setCookie } from 'cookies-next';

interface TokenData {
  accessToken: string;
  refreshToken: string;
}

export async function login(username: string, password: string) {
  const response = await client.post<{ username: string; password: string }, { data: TokenData }>('/auth/login', {
    username,
    password,
  });

  return response.data;
}

export async function handleAuth(username: string, password: string) {
  try {
    const tokenData: TokenData = await login(username, password);

    setCookie('accessToken', tokenData.accessToken);
    setCookie('refreshToken', tokenData.refreshToken);

    return { success: true };
  } catch (error: unknown) {
    console.error('Login error:', error);

    let errorMessage = 'Login failed';

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.data?.message || error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}
