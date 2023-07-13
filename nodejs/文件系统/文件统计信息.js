const fs = require('fs');
fs.stat('nodejs/stream/input.txt', (err, stats) => {
  if (err) console.log(err);
  console.log('异步：', stats.isSymbolicLink());
});

// try {
//   const stats = fs.statSync('nodejs/stream/input.txt');
//   console.log('同步：', stats);
// } catch (err) {
//   console.error(err);
// }
