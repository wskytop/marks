/**给定一个已按照 非递减顺序排列 的整数数组 numbers， 请你从数组中找出两个
 * 数满足相加之和等于目标数 target。
 * 函数应该以长度为 2 的整数数组的形式返回这两个数的下标值。 numbers 的下标
 *  从 1 开始计数， 所以答案数组应当满足 1 <= answer[0] < answer[1] <= 
 * numbers.length。
 * 你可以假设每个输入 只对应唯一的答案， 而且你 不可以 重复使用相同的元素。
 */
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
    let left = 1,
        right = numbers.length
    while (left < right) {
        if (numbers[left - 1] + numbers[right - 1] < target) {
            left++
        } else if (numbers[left - 1] + numbers[right - 1] > target) {
            right--
        } else {
            return [left, right]
        }
    }
};