const fs = require('fs');

const zlib = require('zlib');

// 压缩 input.txt 文件为input.txt.gz
fs.createReadStream('nodejs/stream/input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('nodejs/stream/input2.txt'));

console.log('文件解压完成。');
