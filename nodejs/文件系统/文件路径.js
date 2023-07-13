const path = require('path');

console.log(
  path.dirname(__filename),
  path.basename(__filename),
  path.extname(__filename),
  path.resolve('nodejs/stream/input.txt')
);
