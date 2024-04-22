function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  const cloneObj = Array.isArray(obj) ? [] : {};
  Object.keys(obj).forEach((key) => {
    cloneObj[key] = deepClone(obj[key]);
  });
  return cloneObj;
}
