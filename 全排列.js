function permute(nums) {
    const res = [], path = [];
    calc(nums, nums.length, []);
    return res;

    function calc(nums, length, used) {
        if (path.length === length) {
            res.push(Array.from(path));
            return;
        }
        for (let i = 0; i < length; i++) {
            if (used[i]) continue;
            path.push(n[i]);
            used[i] = true;
            calc(nums, length, used);
            path.pop();
            used[i] = false;
        }
    }
}

console.log("permute", permute([0, 1]));