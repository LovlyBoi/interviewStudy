# set

**set用于存放一些不重复的数据**

1. 如何创建一个set集合
    ```js
    const set = new Set(); // 创建了一个没有任何内容的set集合
    
    const set = new Set(iterable); // 可以传递一个可迭代对象进去, 他就可以给你创建一个具有初始内容的集合, 内容来自于可迭代对象每一次迭代的结果
    ```
2. set的crud
    - add: 添加数据, 如果添加的是已经存在的数据, 则不进行任何操作, set使用Object.is来判定两个数据是否相等, 但是针对于+0和-0, set认为是相等的
        ```js
        const set = new Set();
        set.add(1);
        set.add(2);
        set.add(1); // 无效
        ```
    - has: 判断set中是否已经有对应的数据, 同样使用Object.is来判定的
        ```js
        const set = new Set([1, 2]);
        console.log("1存在吗？", set.has(1)); // true
        ```
    - delete: 删除set中匹配的数据
        ```js
        const set = new Set([1, 2]);
        set.delete(1);
        ```
    
    - clear: 清空整个set集合
        ```js
        const set = new Set([1, 2]);
        set.clear();
        ```
    - size: 获取set集合中的数据的总数, 这是一个只读属性
    
    > 对set进行crud的时候需要考虑明白的就是引用值地址的问题

3. set的遍历
    - 使用for of

### set的妙用

1. 数组字符串去重
    ```js
    const newArr = Array.from(new Set([1, 2, 2, 3, 3, 4]));
    // 除了上面的调用Array.from, 我们还可以使用展开运算符将其转换为数组
    const newArr2 = [...new Set([1, 2, 2, 3, 3, 4])];
    console.log("newArr", newArr); // 1, 2, 3, 4

    const str = "aaab";
    const newStr = [...new Set(str)].join("");
    console.log("newStr", newStr);
    ```

2. 求两个数组的并集, 交集 和差集
    - 并集: 得到一个新的数组, 新数组必须包含arr1, arr2里所有的值, 并且不能有重复项
        ```js
        const arr1 = [2, 2, 3, 4, 5, 6, 8];
        const arr2 = [1, 2, 9. 7, 10];
        const newArr = [...new Set([...arr1, ...arr2])]
        console.log("newArr", newArr);
        ```
    - 交集: 得到一个新的数组, 新数组包含arr1, arr2中都有的值
        ```js
        const arr1 = [2, 2, 3, 4, 5, 6, 8];
        const arr2 = [1, 2, 9. 7, 10];

        const uniqueArr1 = new Set(arr1);
        const newArr = [];
        uniqueArr1.forEach(value => {
            if (arr2.includes(value)) {
                newArr.push(value);
            }
        })
        console.log("newArr", newArr);
        ```
    - 差集: 得到一个新的数组, 新数组的每一项是arr1有arr2没有的值 或者是arr1没有arr2有的值（**不在交集里的就在差集**）
        ```js
        // 我们可以先得到并集
        const arr1 = [2, 2, 3, 4, 5, 6, 8];
        const arr2 = [1, 2, 9, 7, 10];
        const unionArr = [...new Set([...arr1, ...arr2])];
        const differenceArr = unionArr.filter(value => {
            if (arr1.includes(value) && !arr2.includes(value)) return true;
            else if (!arr1.includes(value) && arr2.includes(value)) return true;
            return false;
        })
        console.log("differenceArr", differenceArr);
        ```
        另一种写法就是不在交集里的就在差集