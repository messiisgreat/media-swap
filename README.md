# 環境構築方法

## 環境構築手順

0. slackに招待する
1. git clone <git@github.com>:developerhost/media-swap.git
2. node.js LTSをインストールする <https://nodejs.org/en/download/>
3. 使用するnode.jsバージョンを18.17.0以上に設定する
4.   参考　https://qiita.com/Sr_Bangs/items/bda855068576905a441f
5. pnpmをインストールする `npm install -g pnpm`
6. パッケージをインストールする `pnpm install`
7. [環境変数最新チャンネル](https://discord.com/channels/1173435345354887198/1173435866522329108)を参照し、最新の環境変数の値をもとに.envファイルをcloneしたディレクトリの直下に作成する
8. `pnpm prisma generate`を実行する
9. `pnpm run dev`を実行し、localhost:3000にアクセスして動作すればOK
10. MongoDB,vercel, google analytics, S3の中身を見る必要がある方はメールアドレスをslackで橋田に送ってください。プロジェクトに招待します。

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

## 各自がリモートのmongoDBを作成する手順(ローカル開発環境ではなく、こちらを実行してください)

### 1. mongoDBのサイトにログインする

[mongodb](https://www.mongodb.com/ja-jp)

ユーザー登録をしていない場合は登録する
これはgoogleでもgithubでもどちらでもOK

![スクリーンショット 2023-11-14 13 55 09](https://github.com/developerhost/media-swap/assets/50170789/b9ef59a2-4d1a-4b11-afc9-9ef265a3ab19)
![スクリーンショット 2023-11-14 13 55 17](https://github.com/developerhost/media-swap/assets/50170789/b9f28296-38fe-4362-ba96-0157e6b169a4)

### 2. 自身のOrganizationを作成する
歯車マークの左にあるトグルを押下し、View All Organizationsを押下する
![スクリーンショット 2023-12-02 12 45 05](https://github.com/developerhost/media-swap/assets/87302837/9f6c694b-53b9-4c32-bb46-29c09e306c87)


Create New Organizationを押下する
![スクリーンショット 2023-12-02 12 43 49](https://github.com/developerhost/media-swap/assets/87302837/537ff729-ffa8-4246-bdf4-93d6cf9f517e)

Name Your Organizationに任意の名前を入力し、以下の設定でnextを押下する
![スクリーンショット 2023-12-02 12 42 07](https://github.com/developerhost/media-swap/assets/87302837/da007b4b-c045-4489-bb9f-2cdc093cdc7a)


Members and Securityは編集せずCreate Organizationを押下する

### 3. 自分のプロジェクトを作成する
![スクリーンショット 2023-11-14 13 58 49](https://github.com/developerhost/media-swap/assets/50170789/e92795ba-0758-4f0f-a683-7c2ec05e13b7)

- クラスターはM0
- プロバイダーはAWS
- リージョンは日本
- create ボタンを押す

![スクリーンショット 2023-11-14 12 57 48](https://github.com/developerhost/media-swap/assets/50170789/e52341b5-575f-4f41-af1e-232f0d636b45)
![スクリーンショット 2023-11-14 12 58 07](https://github.com/developerhost/media-swap/assets/50170789/b3b5ad2b-f6ee-486a-90bf-ff5cb93bed81)

### 4.自分のユーザーネームとパスワードを設定する

- パスワードはコピペして保存しておくこと
- パスワードは外部公開しないでください

![スクリーンショット 2023-11-14 12 58 35](https://github.com/developerhost/media-swap/assets/50170789/e42a4a0f-81ec-4037-a6fd-94eeaa753adb)

### 5. 接続設定をする

![スクリーンショット 2023-11-14 13 00 51](https://github.com/developerhost/media-swap/assets/50170789/763dee5c-9e3d-419c-8add-64aaff73eb08)

![スクリーンショット 2023-11-14 13 03 22](https://github.com/developerhost/media-swap/assets/50170789/586e9379-d6b3-40a9-b70e-230b9ab43045)

Connectを押して、Driversを選択

### 6. urlを設定する

.envファイルに自分のmongoDBのURLを設定する

![スクリーンショット 2023-11-14 13 19 38](https://github.com/developerhost/media-swap/assets/50170789/3c9cca85-52a3-48cc-978e-1f325ba4728b)


例

DATABASE_URL="mongodb+srv://<your_username>:<your_password>@cluster0.z8hkn6f.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=AtlasApp"

注意！！！！！！！！

データベース名=ecommerceを入れてpasswordは自分のパスワードを設定してください！！

注意!!!!!!!!!!!


ecommerceの綴りとか注意！！！！


### 7. データベースを作成

![スクリーンショット 2023-11-14 13 16 37](https://github.com/developerhost/media-swap/assets/50170789/b1d6c775-0343-417e-a0a3-e128ea5b113b)

![スクリーンショット 2023-11-14 13 15 54](https://github.com/developerhost/media-swap/assets/50170789/a2644ae0-7764-454f-b9fe-aec59f9c2b77)

![スクリーンショット 2023-11-14 13 15 07](https://github.com/developerhost/media-swap/assets/50170789/54f6a1ab-b727-46f9-917d-b85c3e298678)

Brouse CollectionからAdd My Own Dataをクリックして、Database nameに"ecommerce"を設定してください

[!warning]
Eコマースの綴りは"ecommerce"なので、間違えないようにコピペしてください


![スクリーンショット 2023-11-14 13 17 41](https://github.com/developerhost/media-swap/assets/50170789/e84d69c6-6e75-4de8-aa74-23ba629f9947)
![スクリーンショット 2023-11-14 13 17 52](https://github.com/developerhost/media-swap/assets/50170789/07992f26-91ac-4491-88a7-8d7117a7ba51)


### 8. db pushする

ターミナルで

pnpm run db:push

を実行する

![スクリーンショット 2023-11-14 13 24 06](https://github.com/developerhost/media-swap/assets/50170789/56b320f2-385e-4866-aef6-f737670c0a6b)

自分の先ほど作成したmongoDBのプロジェクトのデータベースにスキーマ定義がされていたらOK

### 9. seedを作成する

ターミナルで

pnpm run build

を実行する

これでseedデータが作成され、商品の追加が可能になります。

お疲れ様でした！！！！

### 10.prettierの設定(commit時にprettierを走らせる)

```bash
pnpm prepare
```


## ローカル開発環境構築(まだ動かない人がいます(windows))
※リモートのmongoDBを作成する手順を完了すれば、こちらは実行しなくて良い

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
