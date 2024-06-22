const fs = require('fs');

const onWrite = (text, src = './output.js') => {
  try {
    fs.writeFileSync(src, 'const res =' + JSON.stringify(text));
    console.log('写入成功');
  } catch (err) {
    console.error(err);
  }
};
module.exports = onWrite;
