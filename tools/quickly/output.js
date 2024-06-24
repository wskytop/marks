const res = {
  tableData: {
    request: { onGetListXhr: { xhr: 'xhr' } },
    filterForm: {
      model: {},
      fields: [
        {
          type: 'input',
          label: "t('wms.storage.from0'),//单据号",
          prop: '单据号',
          itemProps: { clearable: true },
        },
        {
          type: 'select',
          label: "t('wms.storage.from1'),//单据类型",
          prop: '单据类型',
          itemProps: { options: [], clearable: true, multiple: false },
        },
        {
          type: 'input',
          label: "t('wms.storage.from2'),//业务单号",
          prop: '业务单号',
          itemProps: { clearable: true },
        },
        {
          type: 'select',
          label: "t('wms.storage.from3'),//业务类型",
          prop: '业务类型',
          itemProps: { options: [], clearable: true, multiple: false },
        },
        {
          type: 'input',
          label: "t('wms.storage.from4'),//设备编码",
          prop: '设备编码',
          itemProps: { clearable: true },
        },
        {
          type: 'input',
          label: "t('wms.storage.from5'),//设备自编码",
          prop: '设备自编码',
          itemProps: { clearable: true },
        },
      ],
    },
    table: {
      columns: [
        { title: "t('wms.storage.table0'),//单据号", field: '单据号change' },
        {
          title: "t('wms.storage.table1'),//单据类型",
          field: '单据类型change',
        },
        {
          title: "t('wms.storage.table2'),//业务单号",
          field: '业务单号change',
        },
        {
          title: "t('wms.storage.table3'),//业务类型",
          field: '业务类型change',
        },
        {
          title: "t('wms.storage.table4'),//设备编码",
          field: '设备编码change',
        },
        {
          title: "t('wms.storage.table5'),//设备自编码",
          field: '设备自编码change',
        },
      ],
    },
  },
  language: {
    'wms.storage.table0': '单据号',
    'wms.storage.table1': '单据类型',
    'wms.storage.table2': '业务单号',
    'wms.storage.table3': '业务类型',
    'wms.storage.table4': '设备编码',
    'wms.storage.table5': '设备自编码',
    'wms.storage.from0': '单据号',
    'wms.storage.from1': '单据类型',
    'wms.storage.from2': '业务单号',
    'wms.storage.from3': '业务类型',
    'wms.storage.from4': '设备编码',
    'wms.storage.from5': '设备自编码',
  },
};
