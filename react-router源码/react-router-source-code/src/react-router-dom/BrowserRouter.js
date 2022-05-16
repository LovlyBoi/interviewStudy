import { createBrowserHistory } from "history";
import { useMemo } from "react";
import Router from "./Router";

export default function BrowserRouter(props) {
    const history = useMemo(() => {
        return createBrowserHistory();
    }, [])
    return (
        <Router history={ history }>
            { props.children }
        </Router>
    )
}