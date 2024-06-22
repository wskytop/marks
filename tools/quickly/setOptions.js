const onWrite = require('./tools/write.cjs');
function onSetOptions(list, str) {
  let obj = {};
  let clo = '{';
  list.map((item, index, arr) => {
    let typeIndex = parseInt(item);
    obj[`${str}${typeIndex}`] = item.replace(/[0-9]/g, '');
    clo += `\n${typeIndex}: '${str}${index}', // ${item.replace(/[0-9]/g, '')}`;
    if (index === arr.length - 1) clo += `\n }`;
    return {
      [typeIndex]: `t('${str}${index}'), // ${item.replace(/[0-9]/g, '')}`,
    };
  });
  return [clo, obj];
}

const list1 = [
  '1已申请',
  '2待执行',
  '3部分执行',
  '4暂存中',
  '5已结束',
  '8已关闭',
  '100已取消',
];
const [columns, language] = onSetOptions(
  list1,
  'asset.wms.temporarySave.tempStatus'
);
console.log(columns);
onWrite({ language });
