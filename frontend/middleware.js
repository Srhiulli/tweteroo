import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = req.cookies.get('token');

  if (!token && req.nextUrl.pathname === '/tweets') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/tweets', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)', 
  ],
};