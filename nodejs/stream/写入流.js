const fs = require('fs');
const data = '云想衣裳花想容，春风不度玉花荣';

// 创建一个可以写入的流，写入到output.txt中
const writerStream = fs.createWriteStream('nodejs/stream/output.txt');

// 使用utf-8编码写入数据
writerStream.write(data, 'utf-8');

// 标记文件末尾
writerStream.end();

// 处理流事件 --> finish,error
writerStream.on('finish', () => {
  console.log('写入完成');
});

writerStream.on('error', (err) => {
  console.log(err.stack);
});

console.log('程序执行完毕');
