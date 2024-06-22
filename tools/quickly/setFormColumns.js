const onWrite = require('./tools/write.cjs');

const fromConfig = {
  1: 'input',
  2: 'textarea',
  3: 'select',
  4: 'datePicker',
  5: 'cascader',
  6: 'numberInput',
  7: 'upload',
  8: 'radio',
  9: 'mapInput',
};

function onSetFormColumns(list, str) {
  let language = {};
  const arr = list.map((item, index) => {
    let typeInd = parseInt(item);
    let name = item.slice(1);
    language[`${str}.${index}`] = name;
    let obj = {
      type: fromConfig[typeInd],
      label: `t('${str}.${index}'),//${name}`,
      prop: name,
      itemProps: {
        clearable: true,
      },
    };
    switch (typeInd) {
      case 2:
        obj.itemProps = {
          type: 'textarea',
          maxLength: 200,
        };
        break;
      case 3:
        obj.itemProps = {
          options: [],
          clearable: true,
          multiple: false,
        };
        break;
      case 4:
        obj.itemProps = {
          clearable: true,
          type: 'dateRange',
        };
        break;
      case 5:
        obj.itemProps = {
          options: [],
          allowSearch: true,
        };
        break;
      case 6:
        obj.itemProps = {
          hideMinusButton: true,
          hidePlusButton: true,
          appendContent: '',
          // precision: 0,
          // min: 0,
          // max: 25.5,
        };
        break;
      case 7:
        obj.itemProps = {
          limit: 10,
          '...UPLOAD_CONFIG': '',
          type: 'card',
          extensions: 'jpg,png,jpeg',
          showTips: true,
          tips: '',
          // maxSize: '2MB',
        };
        break;
      case 8:
        obj.itemProps = {
          options: [],
          clearable: true,
        };
        break;
      case 9:
        obj.column = 2;
        obj.itemProps = {
          clearable: true,
          mapOptions: '{onGetMapKeyXhr}',
        };
        break;
      default:
        break;
    }
    return obj;
  });
  return [arr, language];
}

// 1: 'input' -> 输入框
// 2: 'textarea' -> 多行文本框
// 3: 'select' -> 下拉框
// 4: 'datePicker' -> 日期选择器
// 5: 'cascader' -> 级联选择器
// 6: 'numberInput' -> 数字输入框
// 7: 'upload' -> 上传组件
// 8: 'radio' -> 单选框
// 9: 'mapInput' -> 地图组件
const list2 = [
  '1单据号',
  '3单据类型',
  '1业务单号',
  '3业务类型',
  '1设备编码',
  '1设备自编码',
  '4设备型号',
  '7品类/系列',
  '关键参数',
  '4品牌',
  '3来源',
  '3租户',
  '4区域',
  '4运营主体',
  '4仓库名称',
  '3仓库类型',
  '数量',
  '4操作人',
];
let [columns, language] = onSetFormColumns(
  list2,
  'asset.wms.stockDetail.table.columns'
);
onWrite({ columns, language });
