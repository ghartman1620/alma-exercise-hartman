import { MOCK_AUTH_TOKEN } from '@/pages/api/login';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(request: NextRequest) {
    const currentAuthToken = request.nextUrl.searchParams.get('auth');
    if (currentAuthToken !== MOCK_AUTH_TOKEN) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/leads']
};