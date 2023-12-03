# コーディング規約

## ディレクトリ構成

コロケーションの原則を意識し、ページやコンポーネントで使用するファイルやテストなどは同じディレクトリに配置する。
ファイル数が多くなる場合はそのディレクトリに`_components`のようにアンダースコア始まりのフォルダを切り、その中にファイルを配置する。
インポートは原則上層からの使用のみとする。
逆転する場合それは共通コンポーネントになるため、`src/components`以下に配置する。
ただし、index.tsで再エクスポートすることで上位層でも使えるようにするのは許容する。

<https://nextjs.org/docs/app/building-your-application/routing/colocation>

## 各ディレクトリの意味

```
.
├── app
│   ├── (static)
│   ├── _layout
│   ├── api
├── components
├── constants
├── images
├── lib
├── middlewares
├── services
├── test
├── types
└── utils
```

### app

こちらはルーティング目的のファイルのみ配置する
そのページでしか使わない機能などは基本的にそのフォルダ内に置く
例: add-listing/ListingForm.tsxなど

参考
https://nextjs.org/docs/app/building-your-application/routing/colocation#store-project-files-outside-of-app

### \_layout

プライベートフォルダーは、フォルダーの前にアンダースコアを付けることで作成できます。
これによりフォルダーとそのすべてのサブフォルダーがルーティングから除外されます。

つまりここにはルーティングすべきでないものを配置します。

### (static)

ルート グループは、フォルダーを括弧で囲むことによって作成できます。
これはフォルダーが意味のあるまとまりになります。そして()をつけるとurlパスに含まれません。
ここは静的なページを配置します。

### ui

アプリケーション全体で使うuiを入れる

### constants

使い回す定数を全て入れる

### lib

ライブラリのラッパーや設定済みのインスタンスをexportするファイルなどを置く。

### middleware

middlewareの処理を書く

### repositories

DB操作系の処理を入れる

### types

型定義を入れる

### utils

アプリケーション全体で使う共通ロジックを置く。

### features

ある特定の機能、ドメインでしか使わないapiへのアクセサや定数、型、hooks、コンポーネントなど全てを詰め込む場所。
ただし現在はないので、必要になったら作成する。

### 参考

https://zenn.dev/yodaka/articles/eca2d4bf552aeb

https://nextjs.org/docs/getting-started/project-structure

https://medium.com/@mertenercan/nextjs-13-folder-structure-c3453d780366

## コード規則

1. タイプセーフな実装を心がける
   anyを使わない
   オブジェクトを定義する際は必ず型指定を行う。
2. import { Button } from '@/components'　同一ディレクトリからのインポートを除き、左記のように絶対パスを使用する

## デザイン

1. まずはdaisy UIをベースにクラスを当てる
2. daisy UIだけで書けないところのみtailwindcssでコンポーネントを作成する。
3. flex,grid,padding,margin,gapなど、レイアウトに関するものはや色などはTailwind CSSで指定する。
4. marginなど、コンポーネントの外側に影響するCSSはコンポーネント内に書かない。
5. mr,ptなど微妙な調整は避け、親要素のgapで調整するように心がける。
6. スマホの見た目だけ作れば良い
