const fs = require('fs');

const zlib = require('zlib');

// 压缩 input.txt 文件为input.txt.gz
fs.createReadStream('nodejs/stream/input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('nodejs/stream/input.txt.gz'));

console.log('文件压缩完成。');
