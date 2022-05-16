import { useEffect, useMemo, useState } from "react"
import RouterContext from "./RouterContext";
import urlMatchToPath from "./urlMatchToPath";

/**
 * Router组件我们主要是提供一个上下文出去, 这个上下文要包含以下3个属性
 * location: 地址信息
 * history: 实用的history api
 * match: 匹配成功以后的参数对象, 但是在Router中, 我们还没有任何路径规则设定, 所以这里会写死
 * @param {*} props 
 */
export default function Router(props) {
    const [,forceUpdate] = useState(1)
    useEffect(() => {
        const unListenDispatcher = props.history.listen((transitionObj) => {
            // 当有跳转的时候, 我实际上需要强制刷新页面
            forceUpdate(prev => prev + 1);
        }, [])

        return unListenDispatcher;
    }, [props.history])

    const contextValue = {
        history: props.history,
        location: props.history.location,
        match: urlMatchToPath("/", props.history.location.pathname)
    }

    console.log("contextValue", contextValue);

    return (
        <RouterContext.Provider value={ contextValue }>
            { props.children }
        </RouterContext.Provider>
    )
}