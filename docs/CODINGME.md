# コーディング規約

## ディレクトリ構成

コロケーションの原則を意識し、ページやコンポーネントで使用するファイルやテストなどは同じディレクトリに配置する。
ファイル数が多くなる場合はそのディレクトリに`_components`のようにアンダースコア始まりのフォルダを切り、その中にファイルを配置する。
インポートは原則上層からの使用のみとする。
逆転する場合それは共通コンポーネントになるため、`src/ui`以下に配置する。
ただし、index.tsで再エクスポートすることで上位層でも使えるようにするのは許容する。

<https://nextjs.org/docs/app/building-your-application/routing/colocation>

## 各ディレクトリの意味

```dir
src
├─app ルーティングのためのディレクトリ
│  ├─(contents) メインコンテンツを配置するディレクトリ
│  │  ├─(auth) ログインが必要なページを配置するディレクトリ
│  ├─(support) 年齢認証が不要な、サポート系のページを配置するディレクトリ
│  │  ├─(static) 動的でないページを配置するディレクトリ
│  ├─api route handrer専用のディレクトリディレクトリ
│  └─_layout layout.tsxで使用するコンポーネントを配置するディレクトリ
├─constants 定数を配置するディレクトリ
├─features 機能ごとにフォルダを作成し、その中に必要なファイルを配置するディレクトリ
├─images 画像を配置するディレクトリ
├─lib 外部のライブラリのラッパーや、それ単体でOSSとして公開することができるような機能を配置するディレクトリ
├─middlewares middlewareの処理を書く
├─repositories データベースのテーブル毎にファイルを作成し、CRUD関数を書く
├─types 基本的には使用しない。共通型定義を置く想定のディレクトリ
├─ui ドメインに依存しないUIを配置する
└─utils 特定の機能に依存しない共通ロジックを配置する
```

### app

こちらはルーティング目的のファイルのみ配置する
そのページでしか使わない機能などは基本的にそのフォルダ内に置く
例: add-listing/ListingForm.tsxなど

参考
<https://nextjs.org/docs/app/building-your-application/routing/colocation#store-project-files-outside-of-app>

### \_layout

このような書き方はPrivate Folderといいます。
プライベートフォルダーは、ディレクトリ名の前にアンダースコアを付けることで作成できます。
これによりフォルダーとそのすべてのサブフォルダーがルーティングから除外されます。

### (static)

このような書き方はRoute Groupsといいます。
ディレクトリ名に`()`を使用することで作成できます。
以下の2つの役割があります。

- 意味のあるまとまりを作る

直下に大量のファイルやディレクトリがあると、どのファイルがどの機能に属しているのかわかりにくくなります。
そこで、意味のあるまとまりを作るために、ディレクトリを作成します。

- 一部のページのみに適用したい処理やコンポーネント、
URLには反映したくないが、共通の処理やコンポーネントの配置を行いたいときがあります。
その際に、Route Groupsにlayout.tsx,template.tsx,open-graph-image.*などを置けば全てに書くこと無く適用することができます。

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

### 参考

<https://zenn.dev/yodaka/articles/eca2d4bf552aeb>

<https://nextjs.org/docs/getting-started/project-structure>

<https://medium.com/@mertenercan/nextjs-13-folder-structure-c3453d780366>

## コード規則

1. タイプセーフな実装を心がける
   anyを使わない
   オブジェクトを定義する際は必ず型指定を行う。
2. import { Button } from '@/components'　左記のように絶対パスを使用する

## デザイン

1. まずはdaisy UIをベースにクラスを当てる
2. daisy UIだけで書けないところのみtailwindcssでコンポーネントを作成する。
3. flex,grid,padding,margin,gapなど、レイアウトに関するものはや色などはTailwind CSSで指定する。
4. marginなど、コンポーネントの外側に影響するCSSはコンポーネント内に書かない。
5. mr,ptなど微妙な調整は避け、親要素のgapで調整するように心がける。
6. スマホの見た目だけ作れば良い
