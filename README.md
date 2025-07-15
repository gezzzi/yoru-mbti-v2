# 夜の性格診断 - Next.js版

ViteからNext.jsに移行された夜の性格診断アプリケーションです。

## 概要

5つの軸（外向性/内向性、支配性/従属性、刺激志向/安定志向、羞恥耐性/羞恥敏感、愛着/非愛着）から16のユニークな性格タイプを診断するWebアプリケーションです。

## 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Runtime**: Node.js

## 機能

- 📊 25問の心理学ベースの質問
- 🎯 16の詳細な性格タイプ分析
- 📱 レスポンシブデザイン
- 🎨 美しいグラデーションUI
- 📤 SNS共有機能
- 📋 結果のコピー機能

## 開発環境のセットアップ

1. 依存関係のインストール:
```bash
npm install
```

2. 開発サーバーの起動:
```bash
npm run dev
```

3. ブラウザで http://localhost:3000 を開く

## ビルドとデプロイ

```bash
# プロダクションビルド
npm run build

# プロダクションサーバーの起動
npm start
```

## 16の性格タイプ

### 主導者（Dom）系
- **EDTA** - 快楽王: 独占欲が強く、主導権を握りながらも深い愛着を持つ
- **EDTN** - 支配者: 衝動的で支配的、感情よりも本能を重視
- **EDSA** - 愛情家: 尽くす系のドSで、安定した関係を求めながらも主導権を握る
- **EDSN** - 調教師: 感情を切り離し、技術的なスキルと支配に重点

### 従属者（Sub）系
- **ESTA** - 恋愛者: 甘えん坊で愛されたい欲求が強く、明るい従属的な性格
- **ESTN** - パーティーピーポー: 刺激中毒でスリルを好み、受け身ながらも外向的
- **ESSA** - 依存者: 恋愛依存傾向があり、甘えることが得意で一途
- **ESSN** - ムードメーカー: 快楽を優先し、感情を軽視して自由奔放

### 隠密（Introvert）系
- **IDTA** - 情熱家: 無口で威圧感があり、静かながらも主導権を握る
- **IDTN** - 変態分析者: 研究熱心で観察力に優れ、変態的な探究心を持つ
- **IDSA** - 守護者: 優しい主導でスキンシップを重視し、包容力がある
- **IDSN** - 指揮者: 無感情でプレイに特化し、孤高を保つ

### 妄想・回避系
- **ISTA** - 妄想者: 空想癖があり、従属願望を持ち、自己投影型
- **ISTN** - ドM者: 孤独を好み、快楽を逃避手段として使い、感情をカット
- **ISSA** - ヒーラー: 依存傾向があり、一途で愛されたい欲求が強い
- **ISSN** - 提供者: 感情が薄く、身体だけを差し出すクールなM

## プロジェクト構造

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # グローバルスタイル
│   ├── layout.tsx      # ルートレイアウト
│   └── page.tsx        # ホームページ
├── components/         # Reactコンポーネント
│   ├── Hero.tsx        # ヒーローセクション
│   ├── Navigation.tsx  # ナビゲーション
│   ├── PersonalityGrid.tsx  # 性格タイプグリッド
│   ├── PersonalityTypesPage.tsx  # タイプ詳細ページ
│   ├── Quiz.tsx        # 診断クイズ
│   └── Results.tsx     # 結果表示
├── data/               # データファイル
│   ├── personalityTypes.ts  # 性格タイプ定義
│   └── questions.ts    # 質問データ
├── types/              # TypeScript型定義
│   └── personality.ts  # 性格診断関連の型
└── utils/              # ユーティリティ関数
    └── testLogic.ts    # 診断ロジック
```

## 変更履歴

### v2.0.0 (Next.js移行版)
- ViteからNext.js 14 App Routerに移行
- TypeScript + Tailwind CSSの最新版に更新
- コンポーネント構造の最適化
- パフォーマンスとSEOの改善

## ライセンス

MIT License
