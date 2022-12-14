/* 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let arr = []
    let max = 0
    for (let i = 0; i < s.length; i++) {
        if (arr.indexOf(s[i]) === -1) {
            arr.push(s[i])
        } else {
            arr.splice(0, arr.indexOf(s[i]) + 1)
            arr.push(s[i])
        }
        max = Math.max(max, arr.length)
    }
    
    return max;
};