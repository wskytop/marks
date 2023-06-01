/**
 * 给定一个字符串， 你需要反转字符串中每个单词的字符顺序， 
 * 同时仍保留空格和单词的初始顺序
 */
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    let s1 = s.split(' ')
    let newS = []
    for (let i = 0; i < s1.length; i++) {
        newS.push(s1[i].split('').reverse().join(''))
    }
    return newS.join(' ')
};