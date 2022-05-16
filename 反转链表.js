class LinkNode {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }

    reverse() {
        let node = this;
        if (node.next == null) return node;
        while(node.next.next != null) {
            // 我先找到倒数第二个
            node = node.next;
        }

        // 找到倒数第二个我要记录一下倒数第一个 倒数第一个我是要直接返回的
        const lastNode = node.next;
        // 我直接将node.next置空
        node.next = null;
        lastNode.next = this.reverse();
        return lastNode;
    }

    forEach(callback) {
        LinkNode.forEach(callback, this);
    }

    static forEach(callback, link) {
        let node = link;
        while(node) {
            callback(node.value, this);
            node = node.next;
        }
    }

}

const nodeA = new LinkNode("a", new LinkNode("b", new LinkNode("c")));

function reverse(node) {
    let _node = baseNode = JSON.parse(JSON.stringify(node));
    if (_node.next == null) return _node;
    while(_node.next.next != null) {
        _node = _node.next;
    }

    let lastNode = _node.next; // 倒数第一个
    _node.next = null;
    lastNode.next = reverse(baseNode);
    return lastNode;
}

nodeA.forEach(el => {
    console.log("el", el);
})

console.log("reverse(nodeA)", reverse(nodeA));

LinkNode.forEach(el => {
    console.log("el", el);
},reverse(nodeA));