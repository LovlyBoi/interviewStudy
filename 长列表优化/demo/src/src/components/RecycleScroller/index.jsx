import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import "./index.css";

export default function  RecycleScroller({
    containerHeight = "auto", // 容器总高度
    itemHeight=50, // 容器高度, 必须传递值
    renderSize=20, // 长列表能够允许用户看到的item数量
    render = () => {}, // render props 这个render函数会返回一个Item组件的
    data = [], // 全的数据
}) {
    
    const [renderGroup, setRenderGroup] = useState(() => {
        // 一开始的时候, 这个renderGroup肯定是在0的位置的
        // 所以我们只需要截取从0 到 renderSize个就好了
        return data.slice(0, renderSize).map((item, index) => {
            return {
                ...item,
                top: index * itemHeight
            }
        });
    }); // renderGroup为实际渲染给用户的数据
    const containerRef = useRef();
    const contentHeight = useMemo(() => {
        return itemHeight * data.length;
    }, [ itemHeight, data.length ])

    const onContainerScroll = useCallback(() => {
        // 当滚动条滚动的时候, 我们首先要确定当前新的renderGroup
        // 比如说我现在滚动了100px, 那实际上我每个itemHeight等于50的话, 等于说我是往上面滚动了2格
        // 所以我当前渲染的renderGroup 应该是从3开始数20个
        if (!containerRef.current) return;
        const scrollTop = containerRef.current.scrollTop;
        const startIndex = parseInt(scrollTop / itemHeight); // 这里是有可能得出小数的, 主要是因为你可能某一个只划过去了一半, 那这个时候其实这个只划过去一半的我们也是要渲染的, 所以我们需要将小数忽略不计
        console.log("startIndex", startIndex, scrollTop, data, data.slice(startIndex, startIndex + renderSize));
        setRenderGroup(data.slice(startIndex, renderSize + startIndex).map(((item, index) => {
            return {
                ...item,
                top: index * itemHeight + scrollTop
            }
        })));
    }, [ data, itemHeight, renderSize ])

    useEffect(() => {
        console.log("renderGroup")
    }, [renderGroup])

    return (
        <div ref={ containerRef } onScroll={ onContainerScroll } style={{ height: containerHeight + "px" }} className="recycle-scroller-container">
            <div style={{ height: contentHeight + "px" }} className="recycle-scroller-content">
                {
                    renderGroup.map((item, index) => (
                        <div style={{ top: item.top + "px" }} key={ item.id } className="recycle-item">
                            { render(item) }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}