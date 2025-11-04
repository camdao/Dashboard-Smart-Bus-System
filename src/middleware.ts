import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  const isFile = request.nextUrl.pathname.match(/\.(.*)$/);

  const authPublicPaths = ['/auth/login', '/api/auth', '/api/auth/callback'];

  const openAccessPaths = ['/'];

  const isAuthPublicPath = authPublicPaths.some(
    (publicPath) => path === publicPath || path.startsWith(`${publicPath}/`),
  );

  const isOpenAccessPath = openAccessPaths.some((openPath) => path === openPath || path.startsWith(`${openPath}/`));

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  const isAuthenticated = accessToken && refreshToken;

  if (isFile) {
    return NextResponse.next();
  }

  if (isAuthPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isOpenAccessPath) {
    return NextResponse.next();
  }

  if (!isAuthPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
