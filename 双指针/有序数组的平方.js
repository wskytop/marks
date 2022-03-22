/**
 * 给你一个按 非递减顺序 排序的整数数组 nums， 返回
 * 每个数字的平方 组成的新数组， 要求也按 非递减顺序 排序。
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
    let result = []
    for (let i = 0, j = nums.length - 1; i <= j;) {
        let left = Math.abs(nums[i])
        let right = Math.abs(nums[j])
        if (left < right) {
            result.unshift(right * right)
            j--
        } else {
            result.unshift(left * left)
            i++
        }
    }
    return result
};