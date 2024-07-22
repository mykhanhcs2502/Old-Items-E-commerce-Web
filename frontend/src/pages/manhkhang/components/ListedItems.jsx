import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ItemCard from "../../namkhoa/components/sellerItemsSection/itemCard";



export default function ListedItems(props) {
    const [items, setItems] = useState([])
    useEffect(() => {
        const fetchItems = async () => {
            const data = await fetch('http://127.0.0.1:5000/namkhoa/items')
            const json = await data.json();
            console.log("hentai: ", json)
            setItems(json);
        }

        fetchItems().catch(console.error);
    }, [items.length])
    return (
        <div>
            <Typography sx={{ paddingTop: "20px", paddingBottom: "20px", paddingRight: "20px" }} variant={"h4"}>
                {props.title}
            </Typography>
            <div style={{
                display: 'flex',
                gap: '10px 30px',
                alignContent: 'center',
                alignItems: 'center',
                overflow: 'scroll'
            }}>
                {items.map((item) => {
                    return (
                        <ItemCard
                            key={item.id}
                            itemId={item.id}
                            itemCategory={item.category_ref.name}
                            itemName={item.item_name}
                            itemPrice={item.price}
                            itemCondition={item.condition}
                            itemDescription={item.description}
                            itemImage={item.item_images['py/seq'][0].url}
                        />
                    )
                })}
            </div>
        </div>
    )
}