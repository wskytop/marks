// 发布订阅中心
class Observer {
  constructor() {
    this.message = {}; // 消息列表
  }

  /**
   * $emit 触发消息队列里的内容
   * @param {*} type 事件名 (事件类型)
   */
  $emit(type) {
    if (!this.message[type]) return;
    for (const item of this.message[type]) {
      item();
    }
  }

  /**
   * `$on` 向消息队列添加内容
   * @param {*} type 事件名 (事件类型)
   * @param {*} callback 回调函数
   */
  $on(type, callback) {
    // 判断消息列表有无该事件类型
    if (!this.message[type]) {
      this.message[type] = [];
    }
    this.message[type].push(callback);
  }

  /**
   * $off 删除消息队列里的内容
   * @param {*} type 事件名 (事件类型)
   * @param {*} callback 回调函数
   */
  $off(type, callback) {
    if (!this.message[type]) return;
    if (!callback) {
      delete this.message[type];
      return;
    } else {
      const index = this.message[type].indexOf(callback);
      if (index > -1) this.message[type].splice(index, 1);
    }
  }
}

// 创建发布订阅中心实例
const observer = new Observer();
observer.$on('buy', () => {
  console.log('我是buy的回调函数');
});
observer.$on('run', () => {
  console.log('我是run的回调函数');
});
observer.$on('buy', () => {
  console.log('我是buy的回调函数2');
});
observer.$emit('buy'); //我是buy的回调函数 我是buy的回调函数2
observer.$emit('run'); //我是run的回调函数
observer.$off('buy');
observer.$emit('buy'); // 无返回
