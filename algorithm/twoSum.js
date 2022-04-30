// 两数之和
function twoSum(nums, target) {
    if (!Array.isArray(nums) || typeof target !== "number") return [];
    const map = new Map();
    const result = []
    for (let i = 0; i < nums.length; i++) {
        const diffNum = target - nums[i];
        console.log("map.has(diffNum)", map.has(diffNum), diffNum)
        if (map.has(diffNum)) {
            return [map.get(diffNum), i]; // 如果只需要拿到任意一个组合就返回就可以了
            // result.push([map.get(diffNum), i]);
        } else {
            map.set(nums[i], i);
        }
    }
    return result;
}

console.log(twoSum([0, 4, 3, 0], 0));