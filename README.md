This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## MongoDBの環境構築

- データソースアクセスユーザーを作成する
- IPアドレスをホワイトリストに入れる(ネットワークの設定のところ)

## 環境構築手順

0. slackに招待する
1. git clone git@github.com:developerhost/media-swap.git
2. npm i
3. .envファイルを作成し設定する
4. npm run devでlocalhost:3000でページを開けるか確認する
5. MongoDBの中身を見る必要がある方はメールアドレスをslackで橋田に送ってください。プロジェクトに招待します。
6. vercel, google analytics, S3も同じく

## 共有したいリンク集

1. 資料まとめ-[notion](https://ring-brand-8a1.notion.site/web-a21f7d21402e4837bee9dc095379d784?pvs=4)
2. サービス説明スライド[slide](https://docs.google.com/presentation/d/1bpopnTWIMddWTKF0L7PbIC5OX9K09WoX1sfmDqGdR6c/edit?usp=sharing)
3. [MongoDB](https://cloud.mongodb.com/v2/650570ecc24c6674dfe276c1#/overview)
4. デザイン規則[material](https://m3.material.io/components/buttons/overview)
5. 参考動画[youtube](https://www.youtube.com/watch?v=PGPGcKBpAk8&t=18s)
6. [vercel](https://vercel.com/dirtyman69/media-swap)
7. ドメイン[swappy](https://www.swappy.jp/)
8. [Figma](https://www.figma.com/file/hGDNS4SqUcCFPEO7QktPpm/Untitled?type=design&node-id=0-1&mode=design&t=RXinljJlgKGIVOjm-0)

その他資料はslackの資料chにあるので、PR出す前に確認してください
