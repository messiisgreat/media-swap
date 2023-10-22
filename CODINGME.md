## コーディング規約

### ディレクトリ構成

https://nextjs.org/docs/app/building-your-application/routing/colocation

### コード規則

1. 基本的にはinterfaceではなくtypeを使う
2. import { Button } from '@/components/button'と@を使用する

### デザイン
1. まずはdaisyui UIをベースにクラスを当てる
2. daisyui UIだけで書けないところのみtailwindcssを当てる
3. スマホの見た目だけ作れば良い