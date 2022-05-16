function threeNum(nums = [], target) {
    if (!Array.isArray(nums) || typeof target !== "number") return [];
    const result = [];
    for (let x = 0; x < nums.length; x++) {
        for (let y = x + 1; y < nums.length; y++) {
            for (let z = y + 1; z < nums.length; z++) {
                if (nums[x] + nums[y] + nums[z] === target) {
                    const matchValue = [nums[x], nums[y], nums[z]].sort((a, b) => a - b);
                    const isExist = result.find((value) => {
                        return JSON.stringify(value) === JSON.stringify(matchValue);
                    })
                    !isExist && result.push(matchValue);
                }
            }
        }
    }
    return result;
}

console.log("s", threeNum([-1,0,1,2,-1,-4], 0));