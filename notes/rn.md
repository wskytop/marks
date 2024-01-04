##### Android 文字默认会有内边距且基于基线对齐，这会导致文字垂直居中时偏下。因此垂直居中时，最好把内边距关掉，并把文字放在中线而不是基线上

```css
// 文字默认内边距，会导致垂直居中偏下 
includeFontPadding: false;
// 文字默认基于基线对齐，会导致垂直居中偏下 
textAlignVertical: 'center'
```

