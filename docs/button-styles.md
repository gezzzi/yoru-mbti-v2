# ボタンスタイルガイド

## トップページのボタン設定

### テストを受けるボタン
```jsx
<div className="inline-block relative overflow-hidden rounded-full p-1" onMouseEnter={handleMouseEnter}>
  <Link
    href="/test"
    className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#6366f1] to-[#a78bfa] text-white font-semibold rounded-full hover:from-[#818cf8] hover:to-[#a78bfa] transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-base md:text-lg relative z-10"
  >
    テストを受ける
    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </Link>
</div>
```

**特徴:**
- 背景色: グラデーション `from-[#6366f1] to-[#a78bfa]` → ホバー時: `from-[#818cf8] to-[#a78bfa]`（明るくなる）
- 文字色: `text-white`
- フォント: `font-semibold`
- パディング: `px-6 py-3`（モバイル）、`md:px-8 md:py-4`（デスクトップ）
- テキストサイズ: `text-base`（モバイル）、`md:text-lg`（デスクトップ）
- アイコン: カスタムSVG矢印
- ホバー効果: `hover:scale-105`（105%に拡大）
- 親要素: `overflow-hidden rounded-full p-1`（リップルエフェクト用）
- その他: リップルエフェクトアニメーション付き

## 結果ページのボタン設定

### 1. ダウンロードボタン
```jsx
<button 
  onClick={handleDownload}
  disabled={isDownloading}
  className="bg-blue-400 text-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-blue-300 transition-all transform hover:scale-105 inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
>
  <Download className="w-5 h-5" />
  <span>ダウンロード</span>
</button>
```

**特徴:**
- 背景色: `bg-blue-400` → ホバー時: `bg-blue-300`（薄くなる）
- 文字色: `text-blue-800`
- フォント: `font-semibold`
- アイコン: Download (lucide-react)
- ホバー効果: `hover:scale-105`（105%に拡大）
- disabled状態の処理あり

### 2. シェアボタン
```jsx
<button 
  onClick={() => setShowShareModal(true)}
  className="bg-teal-500 text-teal-900 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-teal-400 transition-all transform hover:scale-105 inline-flex items-center space-x-2 shadow-lg text-sm sm:text-base"
>
  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
  <span>シェア</span>
</button>
```

**特徴:**
- 背景色: `bg-teal-500` → ホバー時: `bg-teal-400`（薄くなる）
- 文字色: `text-teal-900`
- フォント: `font-semibold`
- パディング: `px-4 py-2`（モバイル）、`sm:px-6 sm:py-3`（デスクトップ）
- テキストサイズ: `text-sm`（モバイル）、`sm:text-base`（デスクトップ）
- アイコン: Share2 (lucide-react)、サイズ: `w-4 h-4`（モバイル）、`sm:w-5 sm:h-5`（デスクトップ）
- ホバー効果: `hover:scale-105`（105%に拡大）
- レイアウト: `inline-flex items-center space-x-2`
- テキストは`<span>`タグで囲む

### 3. 再診断ボタン
```jsx
<Link
  href="/test"
  className="bg-gray-500 text-gray-100 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-400 transition-all transform hover:scale-105 inline-flex items-center space-x-2 shadow-lg text-sm sm:text-base"
>
  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
  <span>再診断</span>
</Link>
```

**特徴:**
- 背景色: `bg-gray-500` → ホバー時: `bg-gray-400`（薄くなる）
- 文字色: `text-gray-100`（ページの文字色に合わせた柔らかい白）
- フォント: `font-semibold`
- パディング: `px-4 py-2`（モバイル）、`sm:px-6 sm:py-3`（デスクトップ）
- テキストサイズ: `text-sm`（モバイル）、`sm:text-base`（デスクトップ）
- アイコン: RefreshCw (lucide-react)、サイズ: `w-4 h-4`（モバイル）、`sm:w-5 sm:h-5`（デスクトップ）
- ホバー効果: `hover:scale-105`（105%に拡大）
- レイアウト: `inline-flex items-center space-x-2`
- テキストは`<span>`タグで囲む
- Next.js Linkコンポーネント使用

### 4. 相性診断へ進むボタン
```jsx
<Link
  href="/compatibility"
  className="bg-gradient-to-r from-[#ec4899] to-[#ffb8ce] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:from-[#ffb8ce] hover:to-[#ffb8ce] transition-all transform hover:scale-105 inline-flex items-center space-x-2 shadow-lg text-sm sm:text-base"
>
  <span>相性診断へ進む</span>
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
</Link>
```

**特徴:**
- 背景色: グラデーション `from-[#ec4899] to-[#ffb8ce]` → ホバー時: `from-[#ffb8ce] to-[#ffb8ce]`（単色効果）
- 文字色: `text-white`
- フォント: `font-semibold`
- パディング: `px-4 py-2`（モバイル）、`sm:px-6 sm:py-3`（デスクトップ）
- テキストサイズ: `text-sm`（モバイル）、`sm:text-base`（デスクトップ）
- アイコン: SVG矢印アイコン、サイズ: `w-4 h-4`（モバイル）、`sm:w-5 sm:h-5`（デスクトップ）
- ホバー効果: `hover:scale-105`（105%に拡大）
- レイアウト: `inline-flex items-center space-x-2`
- テキストは`<span>`タグで囲む
- Next.js Linkコンポーネント使用

## 共通のスタイル設定

### パディング・サイズ（レスポンシブ）
- モバイル: `px-4 py-2` (水平16px、垂直8px)
- デスクトップ: `sm:px-6 sm:py-3` (水平24px、垂直12px)

### テキストサイズ（レスポンシブ）
- モバイル: `text-sm` (14px)
- デスクトップ: `sm:text-base` (16px)

### アイコンサイズ（レスポンシブ）
- モバイル: `w-4 h-4` (16px × 16px)
- デスクトップ: `sm:w-5 sm:h-5` (20px × 20px)

### 角丸
- `rounded-lg`: 大きめの角丸

### フォント
- `font-semibold`: セミボールド（やや太い）

### トランジション
- `transition-all`: すべてのプロパティにトランジション効果
- `transform hover:scale-105`: ホバー時に105%に拡大

### 影
- `shadow-lg`: 大きめの影

### レイアウト
- `inline-flex items-center`: インラインフレックスボックスで中央揃え
- `space-x-2`: 子要素間の統一された間隔（推奨）
- **重要**: テキストは必ず`<span>`タグで囲む（ホバー時のずれ防止）

## カラーパレット

### 単色
- **青系**: `bg-blue-400` / `text-blue-800`
- **ティール系（シーフォーム）**: `bg-teal-500` / `text-teal-900`  
- **紫系**: `bg-purple-400` / `text-purple-800`

### グラデーション
- **インディゴ→紫**: `from-[#6366f1] to-[#a78bfa]`（トップページ）
- **ピンクグラデーション**: `from-[#ec4899] to-[#ffb8ce]`（結果ページ - 相性診断）

### 特殊な色
- **淡いラベンダーブルー**: `text-[#e0e7ff]`

## アイコン

### SVG矢印アイコン（共通）
```jsx
<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
</svg>
```

**使用箇所:**
- テストを受けるボタン（トップページ）
- 性格診断をするボタン（性格タイプページ）
- 相性診断をするボタン（性格タイプページ）

**特徴:**
- サイズ: `w-5 h-5`（20px × 20px）
- 左マージン: `ml-2`（8px）
- ストローク幅: `strokeWidth={2}`
- 色: `currentColor`（親要素のテキスト色を継承）

## デザインの特徴

1. **ホバー時の動作**: より薄い色に変化（通常とは逆のパターン）
2. **スケール効果**: ホバー時に105%に拡大
3. **統一感**: すべて同じパディング、角丸、影を使用
4. **アイコン**: lucide-reactのアイコンを統一使用（一部カスタムSVG矢印）