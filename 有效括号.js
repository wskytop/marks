/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']'的字符串 s ，判断字符串是否有效。
 * 有效字符串需满足：
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合
 */
 /**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let map = {
        '}':'{',']':'[',')':'('
    }
    let s1 = s.split('')
    if( s1.lengt % 2 ) return false
    let stack = []
    for(let i of s1){
        if(map[i]){
            if(stack.pop() !== map[i]) return false
        }else
        stack.push(i)
    }
    return stack.length===0
};