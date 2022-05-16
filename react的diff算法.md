# react的diff算法

react的diff主要做的事情就是将currentFiber和jsx对象最终生成新的workInProgressFiber, react在首次挂载的时候是没有current的树的所以他会走mountChildFibers, 当更新的时候旧会有current树了 所以他会走reconcilerChildFibers, 而reconcilerChildFibers就是React的diff算法的核心实现,  react在diff的时候会有几个假设:
1. 只对同级元素进行diff, 如果一个dom在前后两次更新中直接跨越了层级, 则react不会尝试去复用他
2. 两个不同类型的元素会产出不同的树, 比如元素由div变成了P, React会销毁div极其所有的子孙节点, 并新建p以及其子孙节点
3. 开发者可以通过key属性来暗示哪些子元素在不同的渲染下会保持稳定

他的具体流程如下:

- 如果是单节点更新:
  首先比较旧的currentFiber的dom节点和新的jsx生成的树的dom节点是否可以复用(也是比较tag和key), 如果不可以复用React会给currentFiber直接打上一个delete的标记预示着需要删除, 并且同时生成一个新节点并返回, 如果是可以复用的, 就直接将旧树的fiber对象copy一个副本然后返回

- 如果是多节点更新, 多节点更新会进入react的reconcileChildArray方法, 多节点的更新主要又分为3种情况:
    - 节点属性正常更新（react优先处理
    - 节点新增或者减少
    - 节点位置的变化
    在多节点中, React会进行两次遍历, 一次遍历处理可以正常更新的情况, 第二次遍历处理其他的情况, 多节点最终会返回一个fiber结构（链表）出去


