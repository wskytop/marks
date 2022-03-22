/**
 * 给定一个数组 nums， 编写一个函数将所有 0 移动到数组的末尾， 同时保持非零元素的相对顺序
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    let left = 0,
        right = 0
    for (right; right < nums.length; right++) {
        if (nums[right] != 0) {
            [nums[left], nums[right]] = [nums[right], nums[left]]
            left += 1
        }
    }
};