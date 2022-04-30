// function lengthOfLongestSubString(str) {
//     const len = str.length;
//     if (len < 1) return len;

//     let left = 0, right = 0;
//     const window = new Set();
//     let maxLen = 1;
//     while(right < len) {
//         if (!window.has(str[right])) {
//             // 如果滑动窗口里没有当前右下标的字符串
//             maxLen = Math.max(maxLen, right - left + 1);
//             window.add(str[right]);
//             right ++;
//         } else {
//             window.delete(str[left]);
//             left ++;
//         }
//     }

//     return maxLen;
// }


function lengthOfLongestSubstring(str) {
    if (typeof str !== "string") return 0;
    const len = str.length;
    if (len <= 1) return len; // 如果传递进来的字符串长度为1, 那都可以不用比了
    const temporaryArr = []; // 临时存储的数组
    let left = 0, right = 0;
    let maxLength = 1;
    while (right < len) {
        // 我直接看tempoaryArr里是不是已经有过right下标的字符了
        if (temporaryArr.includes(str[right])) {
            // 如果有过了, 那这个时候我们要做的事情就是将窗口滑动一格
            temporaryArr.shift(); // 把最开始那块
            left ++;
        } else {
            // 如果还没有, 我们继续更新temporayArr和maxLength就好了
            temporaryArr.push(str[right]);
            maxLength = Math.max(maxLength, temporaryArr.length);
            right ++;
        }
    }
    return maxLength;
}

console.log("maxLen", lengthOfLongestSubstring("abcbsaab"));
module.exports = lengthOfLongestSubstring;