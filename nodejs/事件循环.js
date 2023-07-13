// 引入events模块
const events = require('events');
// 创建eventEmitter对象
const emitter = new events.EventEmitter();
// 创建事件处理程序
const connectHandler = function () {
  console.log('连接成功');
  // 触发事件
  emitter.emit('data_received');
};

// 绑定 connection 事件处理程序
emitter.on('connection', connectHandler);
// 使用匿名函数绑定 data_received 事件
emitter.on('data_received', function () {
  console.log('数据接收成功。');
});

// 触发 connection 事件
emitter.emit('connection');

console.log('程序执行完毕。');
