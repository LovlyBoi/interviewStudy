
// 路径总和
function getPathSum(root, target) {
    if (!root || typeof target !== "number") return [];
    const result = [];
    function calcPath(node, sum, path) {
        if (!node) return;
        path.push(node.value);
        sum += node.value;
        if (node.left == null && node.right == null && target === sum) {
            result.push(path.slice());
        }
        calcPath(node.left, sum, path);
        calcPath(node.right, sum, path);
        path.pop();
        sum -= node.value;
     }

     calcPath(root, 0, []);
     return result;
}

// const tree = {
//     value: 1,
//     left: {
//         value: 2,
//         left: {
//             value: 3
//         },
//         right: {
//             value: 3
//         }
//     },
//     right: {
//         value: 5
//     }
// }

// console.log("getPathSum(tree, 6)", getPathSum(tree, 6));

// 最大连续子数组和
function maxSubArray(nums = []) {
    if (!Array.isArray(nums)) return {
        value: 0,
        path: []
    }
    let maxValue = nums[0];
    let calcValue = nums[0];
    let maxPath = [nums[0]];
    let calcPath = [];
    for (let i = 0; i < nums.length; i++) {
        if (calcValue > 0) {
            calcValue += nums[i];
            calcPath.push(nums[i]);
        } else {
            calcValue = nums[i];
            calcPath = [nums[i]];
        }
        maxPath = calcValue > maxValue ? calcPath.slice() : maxPath.slice();
        maxValue = Math.max(calcValue, maxValue);
    }

    return {
        value: maxValue,
        path: maxPath
    }
}

// console.log("xxxx", maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));

// 两数相加
function addTwoNum(fstLink, secLink) {
    if (!fstLink) return secLink;
    if (!secLink) return fstLink;
    if (!secLink && !fstLink) return {
        value: 0,
        next: null
    }
    const _fstLink = JSON.parse(JSON.stringify(fstLink));
    const _secLink = JSON.parse(JSON.stringify(secLink));
    let result = "";
    let cache = 0;
    let fstIsOver = false;
    let secIsOver = false;
    function calc(rootOne, rootTwo) {
        if (fstIsOver && secIsOver) return;
        let rootOneValue = 0, rootTwoValue = 0;
        let cacheOneRoot = rootOne, cacheTwoRoot = rootTwo;
        while(!fstIsOver && cacheOneRoot.next && cacheOneRoot.next.next) {
            // 一直找
            cacheOneRoot = cacheOneRoot.next;
            console.log("ssssss", rootOneValue);
        }
        while(!secIsOver && cacheTwoRoot.next && cacheTwoRoot.next.next) {
            cacheTwoRoot = cacheTwoRoot.next;
        }

        // 最终会找到倒数第二个

        
        if(!fstIsOver && !cacheOneRoot.next) {
            // 代表已经到第一个了
            rootOneValue = cacheOneRoot.value;
            fstIsOver = true;
        }

        if (!secIsOver && !cacheTwoRoot.next) {
            rootTwoValue = cacheTwoRoot.value;
            secIsOver = true;
        }

        if(!fstIsOver) {
            rootOneValue = cacheOneRoot.next.value;
        }
        if (!secIsOver) {
            rootTwoValue = cacheTwoRoot.next.value;
        }

        let presentValue = rootOneValue + rootTwoValue + cache;
        cache = 0;
        if (presentValue >= 10) {
            presentValue = presentValue % 10;
            cache = 1;
        }
        console.log("presentValue", presentValue, rootOneValue, rootTwoValue);
        result += presentValue;
        cacheOneRoot.next = null;
        cacheTwoRoot.next = null;
        calc(rootOne, rootTwo);
    }

    calc(_fstLink, _secLink);

    if (cache) result += cache;
    console.log("result", result);

    cache = 0;

    let i = result.length - 1;
    let link = node = {
        value: result[i],
    }
    i--;
    while(i >= 0) {
        node.next = {
            value: result[i]
        }
        node = node.next;
        i--;
    }
    console.log("link", link);
    return link
}


// 括号生成
function generateBrackets(n) {
    const result = [];
    function calc(left, right, curStr) {
        if (left === 0 && right === 0) {
            result.push(curStr);
        }
        if (left > 0) {
            calc(left - 1, right, curStr + "(");
        }
        if (right > left) {
            calc(left, right - 1, curStr + ")");
        }
    }
    calc(n, n, "");
    return result;
}

// console.log("dadsa", generateBrackets(2));

// 全排列
function permute(nums) {
    const res = [], path = [];
    calc(nums, nums.length, []);
    return res;

    function calc(nums, length, used) { // [0, 1] 2, [], 
        if (path.length === length) {
            res.push(Array.from(path));
            return;
        }
        for (let i = 0; i < length; i++) {
            if (used[i]) continue;
            console.log("nums[i]", nums[i], used);
            path.push(nums[i]); // path: [0, 1]
            used[i] = true; // [true, true]
            calc(nums, length, used);
            console.log("path",path);
            path.pop();
            used[i] = false;
        }
    }
}

console.log("permute", permute([0, 1]));

// 快速排序
function quickSort(arr, left, right, needClone = true) {
    let _arr =  needClone ? JSON.parse(JSON.stringify(arr)) : arr
    let len = _arr.length,
        standardIndex;
    left = typeof left === "number" ? left : 0;
    right = typeof right === "number" ? right : len - 1;

    if (left < right) {
        standardIndex = partition(_arr, left, right);
        console.log("standardIndex", standardIndex);
        quickSort(_arr, left, standardIndex - 1, false);
        quickSort(_arr, standardIndex + 1, right, false);
    }
    return _arr;
}


// 选择排序

function selectionSort(arr) {
    const _arr = JSON.parse(JSON.stringify(arr));
    for (let i = 1, len = _arr.length; i < len; i++) {
        let prevIndex = i - 1; // prev -> 2 currentIndex -> 3
        const currentValue = _arr[i]; // 6
        console.log("currentValue", currentValue);
        // 如果prevValue大于了currentValue, 那么是要进行位置交换了
        while ( prevIndex >= 0 && _arr[prevIndex] > currentValue) {
            _arr[prevIndex + 1] = _arr[prevIndex];
            prevIndex --;
        } 

        // [2, 4, 6, 6, 3, 5]
        // 1 
       _arr[prevIndex + 1] = currentValue;
       console.log("JSON.parse(JSON.stringify(arr))", JSON.parse(JSON.stringify(_arr)), prevIndex)
    }

    return _arr;
}