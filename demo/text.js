function test(arr, num) {
  const res = [];
  for (let i = 0; i < arr.length; i = i + num) {
    res.push(arr.slice(i, i + num));
  }
  console.log(res);
  return res;
}

function once(fn) {
  // 利用闭包判断函数是否执行过
  let called = false;
  return function (...args) {
    console.log(!called);
    if (!called) {
      called = true;
      fn.apply(this, args);
    }
  };
}
// const o = once(test);
// o([1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
// o([1, 2, 3, 4, 5, 6, 7, 8, 9], 3);

function spliceUrl(url) {
  const src = new URL(url);
  const origin = src.origin;
  const path = src.pathname.substring(1);
  const hash = src.hash.substring(1);
  console.log(origin, path, hash);
}
spliceUrl('http://www.baidu.com/erwtwtwt/5555#245');
