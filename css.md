# css

- transform定位和top,left的区别
    > 使用top, left定位是直接改变元素的真实位置的, 而且会让它脱离文档流, 即设置了定位以后, 他的兄弟元素会进行联动型的抖动, 而transform只是改变了视觉位置, 在文档流里, 其实这个元素还是在原来的位置占位的, 所以transform天生适合用来做动画, 同时因为transform不改动css的布局, 所以效率会比left和top高一些

2. 介绍一下flex布局
    > flex布局就是弹性布局, 使用display: flex可以开启flex布局, 采用flex布局的元素, 会被称之为flex容器, flex容器内的所有子元素会被称之为flex元素, flex元素的float, clear和vertical-align将全部失效, flex默认存在两根轴: 
        - 水平位置的主轴(main axis): 主轴的开始位置(与边框的交叉点)叫做main start, 结束位置叫做main end
        - 垂直位置的交叉轴(cross axis): 交叉轴的开始位置叫做cross start, 结束位置叫做cross end
    项目默认按照主轴排列, 单个项目占据的主轴空间叫做main size, 占据的交叉轴空间叫做cross size 
    flex容器有如下属性:
        - flex-direction: 决定主轴的方向(即项目的排列方向), 取值可以是```row```, ```row-reverse```, ```column```, ```column-reverse```
        - flex-wrap: 控制项目在主轴上是否允许换行, 默认值为```nowrap```不允许换行, 可以取值为```nowrap```, ```wrap```, ```wrap-reverse```
        - flex-flow: 该属性是flex-direction和flex-wrap的简写方式, 默认值为```row nowrap```
        - justify-content: 该属性定义了项目在主轴上的对齐方式, 取值可以为```flex-start```, ```flex-end```, ```space-around```, ```space-between```, ```center```
        - align-items: 该属性定义了项目在交叉轴上的对齐方式, 取值可以为```flex-start```, ```flex-end```, ```center```, ```baseline```(每个flex元素的第一行文字的基线对齐), ```stretch```(默认值, 如果flex元素没有设置高度或者设置没有设置高度为auto, 则会占满整个容器的高度)
        - align-content: 该属性定义了多根轴线的对齐方式, 如果项目只有一根轴线, 则该属性不起任何作用（有多根轴线就是开启了flex-wrap, 且flex-wrap的值不为nowrap的情况下）, **注意: 具备多条轴线时, align-items依旧会按照单轴线处理**, 取值为```flex-start```, ```flex-end```, ```center```, ```baseline```(每个flex元素的第一行文字的基线对齐), ```stretch```(默认值, 如果flex元素没有设置高度或者设置没有设置高度为auto, 则会根据轴线的条数均分高度)
    每个flex元素也具备如下属性:
        - order: 该属性定义了项目的排列规则, 数值越小排列越靠前, 默认值为0
        - flex-grow: 该属性定义了该flex元素的放大比例, 默认为0, 即如果存在剩余的空间, 也不会放大
        - flex-shrink: 该属性定义了该flex元素的缩小比例, 默认为1, 即如果空间不足, 则该项目会缩小, 其实如果你设置了flex-wrap的值不为nowrap, 则你这个flex-shrink的值设置为0或者1意义都不大
        - flex-basis: 该属性定义了在分配多余空间之前, 该flex元素所占据的主轴空间, 浏览器会根据这个属性来去计算是否有多余空间, 他的默认值为auto, 表示项目的本来大小, 你设置了该属性以后你的width属性是会失效的, 所以如果一定要设置的话, 最好设置的和width的值一致
        - flex: 该属性是flex-grow, flex-shrink, flex-basis的组合值, 默认为 0 1 auto, 且后两个值是可选的, 意味着你flex如果只填了一个值, 则等同于只设定了flex-grow, 但是该属性有两个快捷值: 
            - flex: auto 表示flex: 1 1 auto, 即flex元素随意拉伸随意缩小以及flex宽度为自动
            - flex: none 表示flex: 0 0 auto
        - align-self: 该元素的功能和align-items一致, 但是align-items是决定整个flex容器内的所有flex元素的交叉轴排列位置, 而align-self只会控制该flex元素自身

3. 如果实现一个元素水平居中
    - 使用flex布局, 将父元素设置为flex容器, 然后设置```justify-content: center```和```align-items: center```
    - 使用定位, 给父元素relative定位, 该元素absolute定位, 然后使用```left: calc(50% - 自身宽度)```, ```top: calc(50% - 自身高度)```, 这种情况用于知道元素自身高度的情况下
    - 如果不知道元素自身的高度, 则可以搭配transform, 父元素relative定位, 该元素absolute定位, 使用```left: 50%; top: 50%; transform: translate(-50%, -50%);```

4. 谈谈bfc
    > bfc, block formatting context, 块级格式化上下文, bfc就是页面上的一个隔离的独立容器, 容器里的子元素不会影响到外面的元素,  简单来说, bfc就是一个独立不干扰外界也不受外界干扰的盒子, 开启bfc的元素内部布局规则如下:
    - 内部的box会在垂直方向, 一个接一个的布置
    - box垂直方向的距离由margin决定, 属于同一个bfc的两个相邻box的margin会产生**margin重叠**
    - bfc的区域不会与float box叠加
    - 如果一个元素开启了bfc, 在计算他的高度时, 浮动元素也会参与计算
    如果要开启一个元素的bfc, 满足以下任一条件之一即可:
    - 根元素
    - float的值不为none
    - overflow的值不为visible
    - display的值为table-cell, inline-block, table-caption
    - position的值为absolute或者fixed
    解决margin重叠
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>bfc</title>
        <style>
            .wrapper {
                position: relative;
                border: 1px solid #000;
                /* overflow: hidden; */
                /* overflow: scroll; */
            }
            .content {
                /* position: absolute;
                /* top: 0;
                left: 0; */
                /* float: left; */
                width: 100px;
                height: 100px; 
                background-color: red;
                margin-bottom: 100px;
                margin-top: 100px;
            }
            <!-- 直接额外再开启一个bfc容器, 让其内部运作自己的规则 -->
            .main {
                background-color: rebeccapurple;
                overflow: hidden;
            }
        </style>
        </head>
        <body>
            <div class="wrapper">
                <div class="content"></div>
                <div class="main">
                    <div class="content"></div>
                </div>
            </div>
        </body>
    </html>
    ```
    **使用bfc处理margin塌陷**, margin塌陷是如果父元素没有设置边框, 也没有padding-top, 父元素里也没有文字, 这三个条件一个都没有满足的话, 当给父元素的子元素设置margin时, 父元素会跟着往下掉, 这就称之为margin塌陷, 如果我们并不想给父元素加文字也不想加padding-top, 更不想设置边框, 那我们可以通过触发父元素的bfc来解决这个问题
    ```html
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>bfc</title>
            <style>
                .wrapper2 {
                    background: magenta;
                    /* 触发bfc */
                    overflow: hidden; 
                }
                .content2 {
                    width: 200px;
                    height: 200px;
                    background-color: blue;
                    margin-top: 100px;
                }
            </style>
        </head>
        <body>
            <!-- 下面这个例子是使用bfc去解决margin塌陷的问题 -->
            <div class="wrapper2">
                <div class="content2"></div>
            </div>
        </body>
    </html>
    ```

5. 说说盒子模型, 以及简述box-sizing的使用场景
    盒子模型分为标准和模型和IE盒模型(怪异盒模型
    - 标准盒模型: 在标准盒模型下, 盒子的宽度最终由width, height padding, 和border 一起来决定盒子的最终大小
    - 怪异盒模型: 在怪异盒模型下, 盒子的宽度最终就是由width来决定的
    我们使用box-sizing就可以更改盒子模型的显示模式, 这对我们做一些布局的时候很有用, 有时候我们希望一个盒子有padding, 但是我们又不希望这个padding去影响他真正的宽度, 那我们就可以使用box-sizing: border-box, 如果不适用box-sizing, 我们又需要做到和UI图一致的话, 比如UI图最终的宽度是200px, 但是padding有20px, 那我们就需要给盒子的宽度设置为160px, padding 20px, 如果用了box-sizing, 就可以不用这么麻烦, 直接宽度200 然后box-sizing: border-box就好了

6. display: none和visibility: hidden还有opacity: 0的区别
    - 空间占据层面:display: none以后不会占据额外空间, 且会造成回流和重绘, visibility: hidden和opacity: 0元素虽然隐藏了, 但是他们仍然占据着空间, 他们两只会引起页面的重绘
    - 子元素继承层面: display: none不会被子元素继承, 但是父元素都不在了, 子元素自然也不存在了, visibility: hidden会被子元素继承, 可以通过设置visibility: visible使子元素显示出来, opacity: 0 也会被子元素继承, 但是设置子元素的opacity: 1并不能使子元素显示出来
    - 事件绑定层面: display: none的元素都已经不存在了, 因此肯定无法触发他上面的事件, 同时visibility: hidden的也无法触发事件, 但是opacity: 0可以触发事件
    - 过度动画: visibility和display都无法触发过度动画, 但是opacity可以

7. 说说 em/px/rem/vh/vw 区别，如果窗口尺寸调整，vw，vh 会产生变化吗
    - em: 读的是父级元素的font-size的大小
    - rem: 读的是html根元素的font-size的大小
    - px: 就是一个固定的像素值, 不过在不同的终端中, px所对应的物理像素也是有点出入的
    - vh/vw: 把视口分为100份, 1vw就是视口的1%的宽度, 1vh就是视口的1%的高度
    如果窗口尺寸调整, vw和vh是会产生变化的, vh, vw 是直接响应式的
    
8. 设备像素、css 像素、设备独立像素、dpr、ppi 之间的区别
    - css像素: px是一个相对单位, 相对的是设备像素, 一般情况下, 1个css像素就等于一个设备像素
        - 在同一个设备上, 每一个css像素对应的设备像素值是可以变化的（比如调整分辨率）
        - 在不同的设备之间, 每一个css像素对应的像素值是可以变化的(比如两台不同分辨率的手机)
        - px还会受到ppi和dpr的影响而产生变化
    - 设备像素: 设备像素就是真正的物理像素, 他是在每一个终端上是一个固定的点, 从出厂那天起, 他就不会产生改变了, 单位是pt
    - 设备独立像素: 与设备无关的逻辑像素, 代表可以通过程序控制的虚拟像素, 是一个概念, css像素也是设备独立像素, 可以通过window.screen.width和window.screen.height来获取设备独立像素
    - dpr: 设备像素比, 代表设备独立像素和设备像素的转换关系, 在js中可以通过window.devicePixelRatio获取, dpr = 设备像素/独立设备像素
    - ppi: 每英寸像素, 表示每英寸所包含的像素点数目, 更确切的说法应该是像素密度, 数值越高, 说明屏幕越能以更高密度显示图像, 从而图像就越清晰

9. position都有哪些取值, 分别有什么用
    - static: 默认值, 表示该关键字指定元素使用正常的布局行为, 即元素在常规文档流的布局位置, 此时top, right, left, bottom 以及zindex属性是无效的
    - relative: 设置相对定位, 元素会脱离文档流, 但是该元素在文档流的位置依旧会存在
    - absolute: 设置绝对定位, 元素会脱离文档流, 且元素在文档流的位置将不会被保存
    - fixed: 效果和absolute一致, 区别是absolute是会根据最近有设置定位的元素来进行定位, 而fixed直接是根据html根元素来进行定位的
    - sticky: 该值是relative + fixed的组合体, 意思就是当你没有触发到设定的阈值时, sticky的表现形式为relative的状态, 但是当触发到设定的阈值时, sticky则直接表现为fixed的形态, 但是有一个小区别, sticky是始终基于父元素进行定位的 

10. css样式隔离手段
    - webpack开启css in module
    - 采用css in js, 比如使用styled-components库

11. 让 Chrome 支持小于 12px 的文字方式
    - 使用transform: scale, 具体没有遇到过需要低于12px字体的场景