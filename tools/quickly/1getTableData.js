function getTableData(list, str) {
  let obj = {};
  let clo = [];
  clo = list.map((item, index) => {
    obj[`${str}.${index}`] = item;
    return {
      title: `t('${str}.${index}'),//${item}`,
      field: item+'change',
    };
  });
  return [clo, obj];
}
let list1 = [
  "单据号",
  "单据类型",
  "业务单号",
  "业务类型",
  "设备编码",
  "设备自编码",
  "设备型号",
  "品类/系列",
  "关键参数",
  "品牌",
  "来源",
  "租户",
  "区域",
  "运营主体",
  "仓库名称",
  "仓库类型",
  "数量",
  "操作人",
  "操作时间",
];
let [tableClo, tableObj] = getTableData(
  list1,
  'asset.wms.stockDetail.table.columns'
);
console.log(tableObj);

console.log(tableClo);
