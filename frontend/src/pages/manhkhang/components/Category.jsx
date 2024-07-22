import CircularImage from "./CircularImage";
import { Link } from "react-router-dom";

const sampleImg = "https://static.oreka.vn/d/_next/static/images/electronics-69927ab3c6b8e4db645c6ee1ca2413a6.png"

export default function Category(props) {

    return (
        <Link to={`/manhkhang/categories/${props.category.id}`} >
            <CircularImage icon={props.icon} description={props.category.name} color={props.color} />
        </Link>
    )
}