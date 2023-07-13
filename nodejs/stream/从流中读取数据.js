const fs = require('fs');
let data = '';

// 创建可读流
const readerStream = fs.createReadStream('nodejs/stream/input.txt');

// 设置编码为utf-8
readerStream.setEncoding('utf-8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function (chunk) {
  data += chunk;
});

readerStream.on('end', function () {
  console.log(data);
});

readerStream.on('error', function (err) {
  console.log(err.stack);
});

console.log('程序执行完毕');
