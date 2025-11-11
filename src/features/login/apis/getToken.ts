'use client';

import { client } from '@/apis/client';
import { CLIENT_SIDE_URL } from '@/constants';
import { AxiosError } from 'axios';
import { setCookie } from 'cookies-next';

import { type AuthDto, type LoginPayloadDto } from '../types/auth';

export async function login(username: string, password: string): Promise<AuthDto> {
  try {
    const requestBody = { username, password };
    const data = await client.post<LoginPayloadDto, AuthDto>(`${CLIENT_SIDE_URL}/auth/login`, requestBody);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function handleAuth(username: string, password: string) {
  try {
    const tokenData: AuthDto = await login(username, password);

    setCookie('accessToken', tokenData.data.data.accessToken);
    setCookie('refreshToken', tokenData.data.data.refreshToken);

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
