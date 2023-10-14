import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const url = req.url;
    console.log('リダイレクトURL: ' + url);

    const parsedUrl = new URL(url);
    const pathName = parsedUrl.pathname;
    console.log(pathName);

    const isAgeCheckedThrough = req.cookies.get('isAgeCheckedThrough')?.value;
    const isAgeCheckPath = pathName == '/age-check';
    console.log(isAgeCheckPath);

    if (!isAgeCheckPath && isAgeCheckedThrough == undefined) {
        console.log('年齢認証画面にリダイレクト');
        return NextResponse.redirect(new URL('/age-check', req.url))
    } else if (isAgeCheckPath && isAgeCheckedThrough != undefined) {
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