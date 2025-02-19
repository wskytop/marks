// 防抖函数
function debounce(fn, wait) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  };
}

// 节流函数
function throttle(fn, delay) {
  let pre = 0;
  return function () {
    var args = arguments;
    if (Date.now() - pre > delay) {
      fn.apply(this, args);
      pre = Date.now();
    }
  };
}
