function getTableData(list, str) {
    let obj = {};
    let clo = [];
    clo = list.map((item, index) => {
      obj[`${str}.${index}`] = item;
      return {
        label: `t('${str}.${index}'),//${item}`,
        prop: item,
      };
    });
    return [clo, obj];
  }
  let list1=  [
    "审批状态",
    "调入区域",
    "调入门店",
    "调出区域",
    "调出门店",
    "设备来源",
    "来源仓库",
    "暂存仓库",
    "暂存单号",
    "调拨台量",
    "调拨日期",
    "创建人",
    "创建时间",
    "完成时间",
    "备注",
    "附件",
  ];
  let [tableClo, tableObj] = getTableData(
    list1,
    "asset.wms.allot.basic"
  );
  console.log(tableObj);
  
  console.log(tableClo);
  