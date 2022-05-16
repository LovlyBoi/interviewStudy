function pathSum(root, target) {
    if(!root) return [];
    const result = [];
    function dfs(node, sum, path) {
        if (!node) return null;
        path.push(node.value); // 路径中加入当前节点的值
        sum += node.value;
        if (node.left == null && node.right == null && target == sum) {
            // 如果左右节点都没值了, 证明路径到尾巴了, 值又相等的话, path可以直接推入结果
            result.push(path.slice());
        }
        // 否则就去递归查找路径
        dfs(node.left, sum, path);
        dfs(node.right, sum, path);
        // 这里每次都要出栈是为了防止路径没有被清空
        // 比如他左边到底了 是123, 但是不等于对应的值, 但是value已经push进path了
        // 这样就是不对的, 所以我们要做的就是出栈之前的值
        sum -= node.val;
        path.pop();
    
    }
    dfs(root, 0, []);
    return result;
}



const root = {
    value: 1,
    left: {
        value: 2,
        left: {
            value: 3
        },
        right: {
            value: 4
        }
    },
    right: {
        value: 0,
        left: {
            value: 6
        },
        right: {
            value: 7
        }
    }
}

console.log(pathSum(root, 7));