const fs = require('fs');

const txt = '知不可乎骤得，托遗响于悲风';

fs.writeFile('nodejs/stream/input.txt', txt, (err) => {
  if (err) return console.error(err);
  console.log('异步文件写入成功');
});

try {
  fs.writeFileSync('nodejs/stream/input.txt', txt);
  console.log('同步文件写入成功');
} catch (err) {
  console.error(err);
}

fs.appendFile('nodejs/stream/input.txt', '\n我是追加的内容', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Content has been appended successfully');
});

