# 学習記録アプリ

## 概要

vite × supabase を用いた学習記録アプリを作ってみました。
React のコンポーネントの概念、DB 連携した登録・削除処理の理解を深めるために作成しました。

## インストール方法

1. レポジトリをクローン
2. Node.js と npm がインストールされているかを確認
   `node -v`
   `npm -v`
3. 依存関係のインストール
   `npm install`
4. 起動
   `npm run dev`

## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語フレームワーク | バージョン |
| ------------------ | ---------- |
| supabase           | 2.45.3     |
| Node.js            | 18.17.1    |
| React              | 18.3.1     |
| Vite               | 5.4.1      |
| firebase           | 10.13.0    |

## ディレクトリ構造

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->

> tree -a -I "node*modules|.next|.git|.cache|dist|static|.vscode|.firebase|\_cache*"

.
├── .babelrc
├── .env
├── .eslintrc.cjs
├── .firebaserc
├── .github
│   └── workflows
│   └── firebase-deploy.yml
├── .gitignore
├── Makefile
├── README.md
├── eslint.config.js
├── firebase.json
├── index.html
├── jest.config.mjs
├── jest.setup.js
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.css
│   ├── StudyRecordsApp.jsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── InputStudyRecord.jsx
│   │   └── ListStudyRecords.jsx
│   ├── index.css
│   ├── main.jsx
│   └── tests
│   ├── componentInputValidation.spec.jsx
│   ├── componentTest.spec.jsx
│   ├── componenteSample.spec.jsx
│   └── sample.spec.js
├── util
│   ├── supabase.js
│   └── supabaseFunction.js
└── vite.config.js

## 使用方法

アプリを起動後、学習内容と学習時間を入力し登録を実行すると、画面上に登録した内容がリスト表示されます。
登録した内容は削除することも可能です。
