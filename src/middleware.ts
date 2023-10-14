import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const url = req.url;
    console.log('リダイレクトURL' + url);

    const ageUrls = <string[]>[
        'http://localhost:3000/age-check',
        'https://www.swappy.jp/age-check',
    ];

    const isAgeCheckedThrough = req.cookies.get('isAgeCheckedThrough')?.value;

    if (isAgeCheckedThrough == undefined) {
        console.log('年齢認証画面にリダイレクト');
        return NextResponse.redirect(new URL('/age-check', req.url))
    } else if (ageUrls.includes(url)) {
        // age-check が終わってるけどリダイレクトしてしまった場合はホームに返す
        return NextResponse.redirect(new URL('/', req.url))
    }
}

export const config = {
    matcher: [
        '/',
        '/age-check',
        '/products/:path*',
    ],
}