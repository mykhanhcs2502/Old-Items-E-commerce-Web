import ItemCard from "../../namkhoa/components/sellerItemsSection/itemCard";
import {Grid} from "@mui/material";



export default function CategoryItems({items}) {
    return (
        <Grid container spacing={2}>
            {
                items.map(categoryItem => {
                    return (
                        <Grid item md={3}>
                            <ItemCard
                                key = {categoryItem.id}
                                itemId = {categoryItem.id}
                                itemCategory={categoryItem.category_ref.name}
                                itemName={categoryItem.item_name}
                                itemPrice={categoryItem.price}
                                itemCondition={categoryItem.condition}
                                itemDescription={categoryItem.description}
                            />
                        </Grid>
                    )
                })
            }
        </Grid>
    )

}