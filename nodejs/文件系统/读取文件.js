const fs = require('fs');

// 异步读取
fs.readFile('nodejs/stream/input.txt', (err, data) => {
  if (err) return console.log(err);
  console.log('异步读取：' + data.toString());
});

// 同步读取
const data = fs.readFileSync('nodejs/stream/input.txt');
console.log('同步读取：' + data.toString());
console.log('程序执行完毕');
