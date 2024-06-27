const onWrite = require('./tools/write.cjs');
const {
  onSetBlockColumns, // 块级表格列配置
  onSetFormColumns, // 表单列配置
  onSetOptions, // 筛选项
  onSetTableColumns, // 表格列配置
  onSetTable, // 表哥配置项
} = require('./tools/setColumns.cjs');

let columns = [];
let language = [];

// 表单字段类型
// 1: 'input' -> 输入框
// 2: 'textarea' -> 多行文本框
// 3: 'select' -> 下拉框
// 4: 'datePicker' -> 日期选择器
// 5: 'cascader' -> 级联选择器
// 6: 'numberInput' -> 数字输入框
// 7: 'upload' -> 上传组件
// 8: 'radio' -> 单选框
// 9: 'mapInput' -> 地图组件
const formColumns = [
  '1单据号',
  '3单据类型',
  '1业务单号',
  '3业务类型',
  '1设备编码',
  '1设备自编码',
];
// [(columns, language)] = onSetFormColumns(formColumns,'asset.wms.stockDetail.table.columns');

// 块级表格列配置
const blockColumns = [
  '审批状态',
  '调入区域',
  '调入门店',
  '调出区域',
  '调出门店',
  '设备来源',
];
// [columns, language] = onSetBlockColumns(blockColumns, 'asset.wms.allot.basic');

// 筛选项
const optionsColumns = [
  '1已申请',
  '2待执行',
  '3部分执行',
  '4暂存中',
  '5已结束',
  '8已关闭',
];
// [columns, language] = onSetOptions(
//   optionsColumns,
//   'asset.wms.temporarySave.tempStatus'
// );
// console.log(columns);

// 表格列配置
const tableColumns = [
  '单据号',
  '单据类型',
  '业务单号',
  '业务类型',
  '设备编码',
  '设备自编码',
];
[columns, language] = onSetTableColumns(
  tableColumns,
  'asset.wms.stockDetail.table.columns'
);

// 表格+表格筛选
// const tableData = onSetTable(tableColumns, formColumns, 'wms.storage.');
// onWrite(tableData);

onWrite({ columns, language });
