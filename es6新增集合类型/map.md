# map

map集合专门用于存储多个键值对数据

在map出现之前, 我们使用对象的方式来存储键值对, 键是属性名, 值是属性值

但是使用对象存储有一些问题:

1. 键名只能是字符串或者Symbol
2. 键名容易和原型上的名称冲突（会导致原型链上的属性被覆盖

- 如何创建Map
    ```js
    const map = new Map(); // 创建一个空的Map对象
    const map = new Map(iterator); // 传递一个iterator以得到一个具有初始内容的Map, 但是这个iterator的每一项必须是一个对象, 最好是一个数组, 该对象的第一次迭代得到的东西就是key, 第二次迭代得到的东西就是value
    ```

    - size: 获取size的长度
    - set: 往map实例中追加一个键值对, 键可以是任何类型
    - get: 获取map实例中指定key的值
    - has: 判断某个key是否存在于map实例中
    - delete: 删除map实例中指定的键
    - clear: 清空map

- map和数组进行互相转化
