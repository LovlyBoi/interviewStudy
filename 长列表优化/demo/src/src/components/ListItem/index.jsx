import { List, Avatar } from "antd";
import "./index.css";
export default function ListItem({ item }) {
    return (
        <List.Item.Meta
            className="item-wrapper"
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={<a href="https://ant.design">{item.title}</a>}
            description={ item.desc } 
        />
    )
}