'use client';

import { getCookie } from 'cookies-next';

interface DecodedToken {
  sub: string; // username
  exp: number;
  iat: number;
  [key: string]: unknown;
}

/**
 * Decode JWT token without verification (client-side only)
 * For production, token verification should be done on the server
 */
export function decodeJWT(token: string): DecodedToken | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

/**
 * Get current username from JWT token
 */
export function getCurrentUserId(): string | null {
  const accessToken = getCookie('accessToken');
  if (!accessToken || typeof accessToken !== 'string') {
    return null;
  }

  const decoded = decodeJWT(accessToken);
  return decoded?.sub || null;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const accessToken = getCookie('accessToken');
  if (!accessToken || typeof accessToken !== 'string') {
    return false;
  }

  const decoded = decodeJWT(accessToken);
  if (!decoded) return false;

  // Check if token is expired
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
}
