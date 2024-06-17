function getTableData(list, str) {
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

let list1 = [
  '1已申请',
  '2待执行',
  '3部分执行',
  '4暂存中',
  '5已结束',
  '8已关闭',
  '100已取消',
];
let [tableClo, tableObj] = getTableData(
  list1,
  'asset.wms.temporarySave.tempStatus'
);
console.log(tableObj);
console.log(tableClo);
