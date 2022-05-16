# leetcode算法刷题

1. 两数之和: https://leetcode-cn.com/problems/two-sum/
    > 给定一个整数数组```nums```和一个整数目标值```target```, 请你在该数组中找出**和为目标值```target```的那两个整数, 并返回他们的数组下标**

    ```js
    // 两数之和
    function twoSum(nums, target) {
        if (!Array.isArray(nums) || typeof target !== "number") return;
        const map = new Map();
        const result = []
        for (let i = 0; i < nums.length; i++) {
            const diffNum = target - nums[i];
            if (map.has(diffNum)) {
                // return [map.get(diffNum), i]; // 如果只需要拿到任意一个组合就返回就可以了
                result.push([map.get(diffNum), i]);
            } else {
                map.set(nums[i], i);
            }
        }
        return result;
    }

    console.log(twoSum([2, 7, 11, 15], 9));
    ```

2. 两数相加: https://leetcode-cn.com/problems/add-two-numbers/
    > 给你2个非空的链表, 表示两个非负的整数, 它们的每位数字都是按照逆序的方式存储的, 并且每个节点只能存储一位数字, 请你将这两个数字相加, 并以相同形式返回一个表示和的链表

    ```js
    function addTwoNumbers(fstLink, secLink) {
        const fstIsLink = fstLink instanceof ListNode;
        const secIsLink = secLink instanceof ListNode;
        if (!fstIsLink && !secIsLink) return new ListNode(0, null);
        if (!fstIsLink) return cloneDeep(secLink);
        if (!secIsLink) return cloneDeep(fstLink);

        let _fstLink = cloneDeep(fstLink);
        let _secLink = cloneDeep(secLink);
        let resultLink = null;
        let workInProgressLink = resultLink;
        let carry = 0;

        while(_fstLink || _secLink) {
            // 只要两个链表有一个存在, 就可以继续循环
            const currentFstDigitValue = _fstLink ? _fstLink.value : 0;
            const currentSecDigitValue = _secLink ? _secLink.value : 0;

            const sum = currentFstDigitValue + currentSecDigitValue + carry;
            let resultDigitNum = sum;
            if (sum >= 10) {
                carry = 1;
                resultDigitNum = sum % 10;
            } else {
                carry = 0;
            }


            if (!workInProgressLink) {
                // 代表是第一次进来
                workInProgressLink = new ListNode(resultDigitNum);
                if (!resultLink) resultLink = workInProgressLink;
            } else {
                workInProgressLink.next = new ListNode(resultDigitNum);
                workInProgressLink = workInProgressLink.next;

            }

            _fstLink = _fstLink.next;
            _secLink = _secLink.next;
        }

        return resultLink;
    }
    ```

3. 无重复字符的最长子串: https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
    > 给定一个字符串```s```, 请你找出其中不含有重复字符串的最长子串的长度
    ```js
    function lengthOfLongestSubstring(str) {
        if (typeof str !== "string") return 0;
        "abcbcde"
        const len = str.length;
        if (len <= 1) return len; // 如果传递进来的字符串长度为1, 那都可以不用比了
        const temporaryArr = []; // 临时存储的数组
        let left = 0, right = 0;
        let maxLength = 1;
        while (right < len) {
            // 我直接看tempoaryArr里是不是已经有过right下标的字符了
            if (temporaryArr.includes(str[right])) { // cb
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
    ```

4. 寻找两个正序数组的中位数
    > 给定两个大小分别为```m```和```n```的正序(从小到大)的数组```nums1```和```nums2```, 请你找出并返回这两个正序数组的中位数