
import { useCallback } from "react";
import RouterContext from "./RouterContext";
import urlMatchToPath from "./urlMatchToPath";
/**
 * Route组件是会接收一些属性的:
 * children: 如果children有值, 则不管任何规则直接渲染
 * render: 路径规则匹配上后renderProps的渲染函数
 * component: 路径规则匹配上以后要展示的组件
 * 
 * 优先级是 children > render > component
 * 
 * 另外还有几个属性
 * path: 展示组件的路径规则, 如果没有传递该属性, 则render/component无论如何都会渲染
 * strict: 是否开启严格匹配（开启严格匹配以后如果末尾有/则不会被匹配上
 * exact: 是否开启精确匹配, (开启精确匹配以后则路径必须百分百相同
 * sensitive: 是否开启大小写敏感
 * 
 * 毋庸置疑, 如果我们要看当前浏览器地址栏的path和Route组件的path属性是否匹配上的话
 * 我们必须用到上下文里的pathname属性
 */
export default function Route({
    path = "/",
    children,
    exact = false,
    sensitive = false,
    strict = false,
    render,
    component: Component
}) {
    const renderChildren = useCallback((routeContext) => {
        // 首先不用想的就是如果有children, 直接渲染
        if (children) {
            if (typeof children === "function") return children(routeContext);
            return children;
        }

        console.log("value", routeContext);
        const { location, history } = routeContext;
        const { pathname } = location;
       
        // 这里我就要看是否匹配上了, 如果没匹配上就无事发生
        const matchObj = urlMatchToPath(path, pathname, {
            exact,
            strict,
            sensitive
        })
        console.log("matchObj", matchObj, path, pathname, exact, strict, sensitive);


        if (!matchObj) return null; // 代表没匹配上

        // 重新展开一个上下文, 避免后续万一需要用到上下文
        const newContext = {
            location,
            history,
            match: matchObj
        }
        return (
            <RouterContext.Provider value={ newContext }>
                {
                    typeof render === "function" ? render(newContext) : <Component {...newContext} />
                }
            </RouterContext.Provider>
        )
        
    }, [children, exact, path, render, sensitive, strict])

    return (
        <RouterContext.Consumer>
            { renderChildren  }
        </RouterContext.Consumer>
    )
}