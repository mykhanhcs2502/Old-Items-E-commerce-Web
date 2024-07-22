import {Typography} from "@mui/material";
import ItemCard from "../../namkhoa/components/sellerItemsSection/itemCard";


export default function SimilarItems({title, similarItems}) {
    return (
        <div>
            <Typography sx={{paddingTop: "20px", paddingBottom: "20px"}} variant={"h4"}>
                {title}
            </Typography>
            <div style={{display:'flex', gap: '10px 30px', alignContent:'center', alignItems:'center',flexWrap:'wrap'}}>
                {similarItems.map(item => {
                    return(
                        <ItemCard
                            key = {item.id}
                            itemId = {item.id}
                            itemCategory={item.category_ref.name}
                            itemName={item.item_name}
                            itemPrice={item.price}
                            itemCondition={item.condition}
                            itemDescription={item.description}
                        />
                    )
                })}
            </div>
        </div>
    )
}