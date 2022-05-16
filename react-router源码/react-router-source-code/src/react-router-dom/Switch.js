import { useCallback } from "react";
import urlMatchToPath from "./urlMatchToPath";
import RouterContext from "./RouterContext";

export default function Switch({ children }) {
    console.log("children", children);

    const lastRenderChildren = useCallback((routeContext) => {
        // 咱得先做一个兼容, 比如如果他只传递了一个child 或者没有传children为undefined, 我们得处理一下
        let _children = children;
        if (!_children) _children = [];
        else if (!Array.isArray(_children)) {
            _children = [children];
        }
        for (const child of _children) {
            // 这里面我们要去看 这个child是否符合当前地址栏里的pathname
            // 这个pathname从哪里来, 从上下文里来
            // 我们拿去给url
            const { location: { pathname } } = routeContext;
            const { path, sensitive, strict, exact  } = child.props
            const matchObj = urlMatchToPath(path, pathname, { sensitive, exact, strict });
            if (matchObj) {
                // 代表匹配上了, 直接返回就好了
                return child;
            }
        }
        // 如果循环完了还没匹配上, 那就只能返回null了
        return null;
    }, [children])

    return (
        <RouterContext.Consumer>
            { lastRenderChildren }
        </RouterContext.Consumer>
    );
}