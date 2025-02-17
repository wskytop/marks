/* 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 。 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let arr = [];
  let str = '';
  for (let i of s) {
    if (arr.indexOf(i) === -1) {
      arr.push(i);
    } else {
      arr.splice(0, arr.indexOf(i) + 1);
      arr.push(i);
    }
    str = str.length > arr.length ? str : arr.join('');
  }
  return str;
};
console.log(lengthOfLongestSubstring('etreqwtqtqt'));
