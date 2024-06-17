// input selset radio checkbox

let base = {
  type: '',
  label: t('platform.order.entryStatus'),
  prop: '',
  itemProps: {
    clearable: true,
  },
};
function t() {}

function getTableFields(list, str) {
  let arr = list.map((item, index) => {
    let obj = {
      type: '',
      label: `t('${str}.${index}'),//${item}`,
      prop: item,
      itemProps: {
        clearable: true,
      },
    };
    let typeInd = parseInt(item);
    let name = item.slice(1);
    if (typeInd == '1') {
      obj = {
        type: 'input',
        label: `t('${str}.${index}'),//${name}`,
        prop: name,
        itemProps: {
          clearable: true,
        },
      };
    }
    if (typeInd == '2') {
      obj = {
        type: 'input',
        label: `t('${str}.${index}'),//${name}`,
        prop: name,
        itemProps: {
          type: 'textarea',
          maxLength: 200,
        },
      };
    }
    if (typeInd == '3' || typeInd == '4') {
      obj = {
        type: 'select',
        label: `t('${str}.${index}'),//${name}`,
        prop: name,
        itemProps: {
          options: [],
          multiple: true,
          clearable: true,
        },
      };
      if (typeInd == '3') delete obj.itemProps.multiple;
    }
    if (typeInd == '5') {
      obj = {
        type: 'datePicker',
        label: `t('${str}.${index}'),//${name}`,
        prop: name,
        itemProps: {
          clearable: true,
          type: 'dateRange',
        },
      };
    }
    if (typeInd == '6') {
      obj = {
        type: 'radio',
        label: `t('${str}.${index}'),//${name}`,
        prop: name,
        itemProps: {
          options: [],
          clearable: true,
        },
      };
    }
    if (typeInd == '7') {
      obj = {
        type: 'cascader',
        label: `t('${str}.${index}'),//${name}`,
        prop: name,
        itemProps: {
          options: [],
          allowSearch: true,
        },
      };
    }
    if (typeInd == '8') {
      obj = {
        type: 'mapInput',
        label: `t('${str}.${index}'),//${name}`,
        prop: name,
        column: 2,
        required: true,
        itemProps: {
          clearable: true,
          mapOptions: '{onGetMapKeyXhr}',
        },
      };
    }
    if (typeInd == '9') {
      obj = {
        type: 'upload',
        label: `t('${str}.${index}'),//${name}`,
        prop: name,
        required: true,
        itemProps: {
          limit: 10,
          '...UPLOAD_CONFIG': '',
          type: 'card',
          extensions: 'jpg,png,jpeg',
          showTips: true,
          tips: '',
          maxSize: '2MB',
        },
      };
    }
    if (typeInd == '10') {
      obj = {
        type: 'numberInput',
        label: `t('${str}.${index}'),//${name}`,
        prop: name,
        required: true,
        itemProps: {
          hideMinusButton: true,
          hidePlusButton: true,
          appendContent: '',
          // precision: 0,
          // min: 0,
          // max: 25.5,
        },
      };
    }
    return obj;
  });
  return arr;
}
let fromItem = {
  1: 'input',
  2: 'input',
  3: 'select',
  4: 'select',
  5: 'datePicker',
  6: 'radio',
  7: 'cascader',
  8: 'mapInput',
  9: 'upload',
  10: 'numberInput',
};
// 1:input 2:textarea 3:select 4: "select"多选
// 5:datePicker 6:radio 7: cascader 8:mapInput 9: upload
let list1 = [
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
  '操作时间',
]; //wms.delivery
let tableObj = getTableFields(list1, 'asset.wms.stockDetail.table.columns');
console.log(tableObj);
