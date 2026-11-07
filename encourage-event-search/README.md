# エンカレイベント検索

添付されたイベント一覧（2,265件）から作成した、Next.js 16の検索サイトです。

## 起動
1. Node.jsをインストール
2. このフォルダで `npm install`
3. `npm run dev`
4. ブラウザーで http://localhost:3000

## 更新方法
元データを更新した場合は、`app/events.json` を同じ項目構成で差し替えます。公開用の確認データは `public/events.csv` にあります。

JSON項目: `id`, `status`, `title`, `genre`, `needs`, `start`（YYYY-MM-DDTHH:mm）, `startLabel`, `endLabel`, `url`

## Vercel公開
GitHubにこのフォルダをアップロードし、VercelでリポジトリをImportしてDeployします。ビルド設定は通常、自動認識されます。

## 注意
公開範囲、イベント情報の転載・再配布、ロゴや名称の利用について、運営ルールと利用規約を確認してから共有してください。この試作にはログイン情報や非公開APIは含めていません。
