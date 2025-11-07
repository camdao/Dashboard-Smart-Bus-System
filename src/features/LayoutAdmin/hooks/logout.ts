'use client';

import { deleteCookie } from 'cookies-next';

export async function logout() {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
  deleteCookie('userData');
}
