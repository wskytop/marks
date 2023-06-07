// 原始对象
const target = {
  methord() {
    console.log('target methord');
  },
};
// 代理对象
const proxy = new Proxy(target, {
  get(object, name, val) {
    console.log('proxy methord');
    return object[name];
  },
});

proxy.methord();
// proxy methord
// target methord
