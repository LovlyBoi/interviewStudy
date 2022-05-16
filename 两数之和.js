function twoSum(nums = [], sum) {
    if (!Array.isArray(nums) || typeof sum !== "number") return [];
    const map = new Map([]);
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] + nums[i] === sum) {
                result.push([i, j]);
            }
        }
    }
    return result;
}

console.log("twoSum", twoSum([0, 1, 2, 3, 4, 5, 6], 6));