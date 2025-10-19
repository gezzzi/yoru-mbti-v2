# 相性診断ページの背景デバッグ方法

## デバッグページ

### 1. /debug-compatibility
- 診断結果がある状態で相性診断ページを表示
- 右上のコントロールパネルで背景の透明度とblur量を調整可能
- リアルタイムで変更を確認できる

### 2. /debug-stars  
- 星の表示状態を確認
- 星をハイライト表示して位置を確認
- DOM構造とz-indexの情報を出力

## URLパラメータでの調整

相性診断ページで以下のパラメータが使用可能：

```
/compatibility?opacity=0.01&blur=4&debug=true
```

- `opacity`: 背景の透明度（0-1の値、デフォルト: 0.03）
- `blur`: ぼかしの強さ（px単位、デフォルト: 8）
- `debug=true`: デバッグ情報を表示

## 推奨テスト値

1. **最小限の効果**
   - `?opacity=0.01&blur=2`
   - 星が最もよく見える設定

2. **バランスの取れた設定**
   - `?opacity=0.02&blur=4`
   - 星が見えつつ、コンテンツも読みやすい

3. **現在の設定**
   - `?opacity=0.03&blur=8`
   - デフォルト値

## トラブルシューティング

### 星が見えない場合のチェックリスト

1. **z-indexの確認**
   - 開発者ツールで`.star`要素のz-indexを確認
   - 親要素の`overflow: hidden`がないか確認

2. **背景の重なり**
   - 複数の半透明要素が重なっていないか
   - backdrop-filterが重複していないか

3. **ブラウザの対応**
   - Safari/iOSではbackdrop-filterの挙動が異なる場合がある
   - Firefoxでは一部のCSSプロパティが異なる表示になることがある

### コンソールでの確認コマンド

```javascript
// すべての背景を一時的に透明にする
document.querySelectorAll('[style*="background"]').forEach(el => {
  el.style.backgroundColor = 'transparent';
});

// backdrop-filterを無効化
document.querySelectorAll('[style*="backdrop"]').forEach(el => {
  el.style.backdropFilter = 'none';
});

// 星の数を確認
console.log('星の数:', document.querySelectorAll('.star').length);
```