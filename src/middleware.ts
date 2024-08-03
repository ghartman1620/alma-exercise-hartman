import { MOCK_AUTH_TOKEN } from '@/pages/api/login'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
    console.log('hello from middleware!');
    const currentAuthToken = request.nextUrl.searchParams.get('auth');
    console.log(currentAuthToken);
    console.log(request.nextUrl.pathname);
    if (currentAuthToken !== MOCK_AUTH_TOKEN) {
        console.log('to login');
        return NextResponse.redirect(new URL('/login', request.url))
    }
    console.log('no change');
}

export const config = {
    matcher: ['/leads']
}