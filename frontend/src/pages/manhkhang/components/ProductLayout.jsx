import * as React from 'react';
import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import ProductSpecifications from "./ProductSpecifications";
import ListedBy from "./ListedBy";
import ItemImageCarousel from "./ItemImageCarousel";


export default function ProductLayout(props) {
    return (
        <Box sx={{ marginTop: "10px", flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <ItemImageCarousel images={props.images} />
                </Grid>
                <Grid item xs={6}>
                    <ProductSpecifications
                        id={props.itemId}
                        name={props.itemName}
                        price={props.itemPrice}
                        category={props.itemCategory}
                        condition={props.itemCondition}
                        description={props.itemDescription}
                        userId={props.userId}
                    />
                </Grid>
                <Grid item xs={6}>
                    <ListedBy seller={props.seller} />
                </Grid>
            </Grid>
        </Box>
    );
}
