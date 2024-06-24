// 基础展示
function onSetBlockColumns(list, str) {
  let obj = {};
  let clo = [];
  clo = list.map((item, index) => {
    obj[`${str}${index}`] = item;
    return {
      label: `t('${str}${index}'),//${item}`,
      prop: item,
    };
  });
  return [clo, obj];
}

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

// 表单
function onSetFormColumns(list, str) {
  let language = {};
  const arr = list.map((item, index) => {
    let typeInd = parseInt(item);
    let name = item.slice(1);
    language[`${str}${index}`] = name;
    let obj = {
      type: fromConfig[typeInd],
      label: `t('${str}${index}'),//${name}`,
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

// 筛选项
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

const tableData = {
  request: {
    onGetListXhr: {
      xhr: 'xhr',
      getParams: (params) => {
        return {
          ...params,
        };
      },
    },
  },
  filterForm: {
    model: {},
    fields: [],
  },
  table: {
    columns: [],
  },
};
// 表格
function onSetTableColumns(list, str) {
  let obj = {};
  let clo = [];
  clo = list.map((item, index) => {
    obj[`${str}${index}`] = item;
    return {
      title: `t('${str}${index}'),//${item}`,
      field: item + 'change',
    };
  });
  return [clo, obj];
}
module.exports = {
  onSetBlockColumns,
  onSetFormColumns,
  onSetOptions,
  onSetTableColumns,
};
