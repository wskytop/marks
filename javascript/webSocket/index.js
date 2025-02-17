const WebSocket = require('ws');

// 1. 创建 WebSocket 服务器
const wss = new WebSocket.Server({ port: 8080 });

// 2. 监听客户端连接
wss.on('connection', (ws) => {
  console.log('客户端已连接');

  // 3. 监听客户端消息
  ws.on('message', (message) => {
    console.log('收到客户端消息:', message.toString());

    // 4. 广播消息给所有客户端
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`服务器收到: ${message}`);
      }
    });
  });

  // 5. 监听客户端断开连接
  ws.on('close', () => {
    console.log('客户端已断开连接');
  });
});

console.log('WebSocket 服务器已启动，端口 8080');
