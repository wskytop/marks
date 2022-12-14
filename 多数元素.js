let nums = [3,2,3]
let m = new Map()
for (let i = 0; i < nums.length; i++) {
    m.set(nums[i], m.has(nums[i]) ? m.get(nums[i]) + 1 : 1)
}
console.log(m);
let mid = nums.length / 2
console.log(mid);
for (let [k,v] of m) {
    if (v > mid) {
        console.log(k);
    }
    
}
