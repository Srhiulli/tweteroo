import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = req.cookies.get('token');
  console.log(token);
  if (token) {
    return NextResponse.redirect(new URL('/tweets', req.url));
  }

  if (req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};