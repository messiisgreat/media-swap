# 環境構築方法

## 環境構築手順

0. slackに招待する
1. git clone <git@github.com>:developerhost/media-swap.git
2. node.js LTSをインストールする <https://nodejs.org/en/download/>
3. pnpmをインストールする `npm install -g pnpm`
4. パッケージをインストールする `pnpm install`
5. .envファイルを作成し設定する
6. `pnpm run dev`を実行し、localhost:3000にアクセスして動作すればOK
7. MongoDB,vercel, google analytics, S3の中身を見る必要がある方はメールアドレスをslackで橋田に送ってください。プロジェクトに招待します。

## 共有したいリンク集

1. 資料まとめ-[notion](https://ring-brand-8a1.notion.site/web-a21f7d21402e4837bee9dc095379d784?pvs=4)
2. サービス説明スライド[slide](https://docs.google.com/presentation/d/1bpopnTWIMddWTKF0L7PbIC5OX9K09WoX1sfmDqGdR6c/edit?usp=sharing)
3. コーディング規約 リポジトリのルートにある[CODINGME.md]
4. デザイン規則[material](https://m3.material.io/components/buttons/overview)
5. [Figma](https://www.figma.com/file/hGDNS4SqUcCFPEO7QktPpm/Untitled?type=design&node-id=0-1&mode=design&t=RXinljJlgKGIVOjm-0)
6. 参考動画[youtube](https://www.youtube.com/watch?v=PGPGcKBpAk8&t=18s)
7. [MongoDB](https://cloud.mongodb.com/v2/650570ecc24c6674dfe276c1#/overview)
8. [vercel](https://vercel.com/dirtyman69/media-swap)
9. ドメイン[swappy](https://www.swappy.jp/)

## ローカル開発環境構築

### dockerの起動・停止コマンド

- 起動コマンド `docker-compose up -d`
- 停止コマンド `docker-compose down`
  
### リストアの方法

ローカルのデータベースを更新したい場合は以下のような操作を行う

1. 次のリストアコマンドを実行して`dump.gz`をダウンロードする`mongorestore --uri mongodb+srv://<USER>:<PASSWORD>@cluster0.c1apanj.mongodb.net`
2. ダウンロードされた`dump.gz`を`media-swap/initdb`に格納する

## MongoDBの環境構築

- データソースアクセスユーザーを作成する
- IPアドレスをホワイトリストに入れる(ネットワークの設定のところ)

### 初期設定

- Docker Desktop, docker-composeなどがない人はインストール
- .envファイルで`MONGO_URI="mongodb+srv://<user>:<password>@cluster0.c1apanj.mongodb.net/ecommerce?retryWrites=true&w=majority"`, `DATABASE_URL="mongodb://localhost:27018/ecommerce?replicaSet=replset&directConnection=true"`を設定
- `sh mongodb_dump.sh`を実行してdump.gzをダウンロード(オプション)
- `docker-compose build`を実行してビルド

### 起動

- `docker-compose up -d`を実行してMongoDBコンテナを起動
- `sh replicaset_init.sh`を実行してレプリカセットを初期化
- `npm run dev`を実行してホストマシンでNextJSを起動

### データの投入

- リモートと同じデータを使用したい場合
  - `sh mongodb_restore.sh`を実行
- prisma/seed.jsで初期データを作りたい場合
  - `npx prisma db seed`を実行

### 停止

- `docker-compose down`でコンテナ停止
  - `-v`オプションをつけるとボリューム(コンテナ内のデータベースを削除)

### MongoDB CompassでのGUI操作

- MongoDB Compassを起動
- URIに`mongodb://localhost:27018/?directConnection=true`と入力
- Connect

### Prisma StudioでのGUI操作

- `pnpx prisma studio`を実行

### リモートDBに切り替え

- .envファイルで`DATABASE_URL="mongodb+srv://<user>:<password>@cluster0.c1apanj.mongodb.net/ecommerce?retryWrites=true&w=majority"`に切り替え
