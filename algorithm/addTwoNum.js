const ListNode = require("../ListNode");
const { cloneDeep } = require("../utils");

// 两数相加
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

const fstLink = new ListNode(2, new ListNode(4, new ListNode(3)));
const secLink = new ListNode(5, new ListNode(6, new ListNode(4)));

const sumLink = addTwoNumbers(fstLink, secLink);

console.log("sumLink", sumLink);