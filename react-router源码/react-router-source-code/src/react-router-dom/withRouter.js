import RouterContext from "./RouterContext"

export default function withRouter(Comp) {
    return function(props) {
        return (
            <RouterContext.Consumer>
                {
                    value => {
                        return (<Comp {...value} {...props} />)
                    }
                }
            </RouterContext.Consumer>
        )
    }
}