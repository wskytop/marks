const fs = require('fs');

// 可读流
const readerStream = fs.createReadStream('nodejs/stream/input.txt');

// 可写流
const writerStream = fs.createWriteStream('nodejs/stream/output.txt');

// 管道读写操作
// 读取input.txt文件内容，并写入到output文件中
readerStream.pipe(writerStream);

console.log('程序执行完毕');
