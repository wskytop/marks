/**
 * 给你一个整数数组 nums ，判断是否存在
 * 三元组 [nums[i], nums[j], nums[k]]
 * 满足 i != j、i != k 且 j != k ，
 * 同时还满足 nums[i] + nums[j] + nums[k] == 0 。
 * 请你返回所有和为 0 且不重复的三元组。
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  let arr = [];
  if (nums == null || nums.length < 3) return arr;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] == nums[i - 1]) continue;
    let j = i + 1;
    let z = nums.length - 1;
    while (j < z) {
      let sum = nums[i] + nums[j] + nums[z];
      if (sum < 0) j++;
      else if (sum > 0) z--;
      else {
        arr.push([nums[i], nums[j], nums[z]]);
        j++;
        z--;
      }
    }
  }
  return arr;
};
console.log(threeSum([-1, 0, 1, 2, -1, -4]));
