import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const url = req.url;
    const parsedUrl = new URL(url);
    const pathName = parsedUrl.pathname;
    console.log('RedirectURL: ' + pathName);

    const isAgeCheckedThrough = req.cookies.get('isAgeCheckedThrough')?.value;
    const isAgeChecUnDefined = isAgeCheckedThrough == undefined;
    const isAgeCheckPath = pathName == '/age-check';
    const isNoAvailablePath = pathName == '/no-available-service';

    /// 年齢認証をしていない時
    if (isAgeChecUnDefined && !isAgeCheckPath) {
        if (isAgeCheckPath) {
            return;
        }
        console.log('年齢認証画面にリダイレクト');
        return NextResponse.redirect(new URL('/age-check', req.url))
    }

    /// 年齢確認 no の時
    if (isAgeCheckedThrough == 'false') {
        // cookie を取得してチェックする
        const hasAgeCheckedThrogh = req.cookies.has('isAgeCheckedThrough');

        if (isNoAvailablePath || isAgeCheckPath) {
            return;
        } else if (hasAgeCheckedThrogh) {
            req.cookies.delete('isAgeCheckedThrough');
            return NextResponse.redirect(new URL('/age-check', req.url))
        }
        console.log('サービス利用不可にリダイレクト');
        return NextResponse.redirect(new URL('/no-available-service', req.url))
    }

    /// 年齢確認 yes の時
    if (isAgeCheckedThrough == 'true') {
        if (isAgeCheckPath || isNoAvailablePath) {
            console.log('ホームにリダイレクト');
            return NextResponse.redirect(new URL('/', req.url))
        }
        return;
    }
}

export const config = {
    matcher: [
        '/',
        '/age-check',
        '/no-available-service',
        '/products/:path*',
    ],
}