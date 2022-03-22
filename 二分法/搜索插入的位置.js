/**
 * 给定一个排序数组和一个目标值， 在数组中找到目标值， 并返回其索引。
 *  如果目标值不存在于数组中， 返回它将会被按顺序插入的位置。
 * 请必须使用时间复杂度为 O(log n) 的算法。
 *  */ 
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    let l = 0,
        r = nums.length - 1,
        n = nums.length
    while (l <= r) {
        let mid = Math.floor((r - l) / 2) + l
        if (target <= nums[mid]) {
            n = mid
            r = mid - 1
        } else if (target > nums[mid]) {
            l = mid + 1
        }
    }
    return n

};