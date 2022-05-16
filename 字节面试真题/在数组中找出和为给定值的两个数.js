function getMatchElementsFromSum(arr, sum) {
    // 等于是直接循环数组, 
    const map = new Map([]);
    for (let i = 0, len = arr.length; i < len; i++) {
        // 先看i有没有
        let matchKey = []
        if (map.has(i)) {
            matchKey = map.get(i).matchKey;
        }
        for (let j = 0; j < len; j ++) {
            if (i !== j) {
                // console.log(i, j, matchKey);
                if (!matchKey.includes(j) && arr[i] + arr[j] === sum) {
                    if (map.has(j)) {
                        map.set(j, {
                            matchKey: [...map.get(j).matchKey]
                        })
                    } else {
                        map.set(j, {
                            matchKey: [i], // 当以后匹配到j的时候, 就不要再添加i这个索引了
                        })
                    }
                    
                }
            }
            
        }
    }
    return [...map].map(el => {
        console.log("el", el)
        return [
            el[0],
            el[1].matchKey[0]
        ]
    })
}

const result = getMatchElementsFromSum([1, 2, 3, 3, 4], 5);
console.log("Result", result);
