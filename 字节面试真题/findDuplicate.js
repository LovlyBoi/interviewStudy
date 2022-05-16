Array.prototype.findDuplicate = function(n) {
    const timesMap = new Map([]);
    const result = []
    for (let item of this) {
        if (timesMap.has(item)) {
            timesMap.set(item, timesMap.get(item) + 1);
        } else {
            // 如果没有代表初次进来
            timesMap.set(item, 1);
        }
    }
    // 完了以后去匹配大于等于n的
    timesMap.forEach((value, key) => {
        if (value >= n) result.push(key);
    })
    return result;
}

const arr = [1, 2, 2, 3, 3, 3, 4, 5, 5, 5];

console.log("result", arr.findDuplicate(2));