# react渲染原理

### 专业术语前瞻

- 渲染: 生成用于显示的对象, 以及将这些对象形成真实的dom对象
- React元素: , 通过React.createElement创建的对象, 例如:
    - 函数组件
    - 类组件
    - 自己写的JSX
- React节点: fiber, 专门用于渲染到UI界面的对象, React会通过React元素来生成React节点, React有以下的节点类型:
    - React dom节点: 创建该节点的React元素类型是一个字符串
    - React 组件节点: 创建该节点的React元素类型是一个函数或者是一个类
    - React 文本节点: React TextNode, 由字符串, 数字创建
    - React 空节点: React Empty创建, 由null, Undefined, false, true等创建的节点
    - React 迭代对象节点: 由数组, Set, Map字符串等可迭代对象创建
- 真实dom: 通过document.createElement创建的dom元素

### 首次渲染

1. 根据React元素得到React fiber
2. 根据不同的fiber类型做不同的事情
    - 文本节点: 通过document.createTextNode创建真实的文本节点
    - 空节点: 什么都不做
    - 迭代对象节点: 使用for of迭代该对象, 将每一次迭代得到的value值回到第一步进行反复操作
    - ReactDom节点: 通过document.createElement创建真实的dom对象, 然后立即设置该真实dom的各种属性, 然后遍历对应React元素的children属性进行递归操作(每一次都会生成新的真实dom, 都会依次appendChild到当前ReactDom节点中)
    - 组件节点:
        - 函数组件: 通过调用renderWithHooks来调用函数, 同时运行内部的hooks, 针对dev, prod都是在调用不同的hook, 调用函数以后会返回一个React元素, 然后根据返回的React元素回到第一步进行反复操作
        - 类组件:
            - 创建类的实例, 立即调用该类的生命周期方法,getDerivedStateFromProps
            - 调用该类的render方法得到React元素并进行反复操作
            - 在整个类的实例中会不断的触发类的生命周期方法
3. 经历完第二步以后, 一颗fiber树就已经构建完成了, 然后进入commit阶段, react会将root.current指向该树
4. 将真实根dom直接插入到页面dom容器中
