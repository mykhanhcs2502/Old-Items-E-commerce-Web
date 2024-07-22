import BackgroundWrapper from "../../common/backgroundWrapper";
import NavBarContainer from "../../common/navbar";
import DenseAppBar from "./components/DenseAppBar";
// import BasicBreadcrumbs from "./components/Breadcrumbs";
import ProductLayout from "./components/ProductLayout";
import { useLoaderData } from "react-router-dom";
import SimilarItems from "./components/SimilarItems";
import Container from "@mui/material/Container";

export async function loader({ params }) {
    const data = await fetch(`http://127.0.0.1:5000/manhkhang/items/${params.itemId}`)
    return await data.json()
}

function ProductDetails() {
    const item = useLoaderData()
    let userId = localStorage.getItem('userId') ?? 1;
    return (
        <BackgroundWrapper>
            <NavBarContainer />
            <DenseAppBar />
            {/*<BasicBreadcrumbs/>*/}
            <Container>
                <ProductLayout
                    itemId={item.item.id}
                    itemName={item.item.item_name}
                    itemPrice={item.item.price}
                    itemCategory={item.item.category_ref.name}
                    itemCondition={item.item.condition}
                    itemDescription={item.item.description}
                    seller={item.item.seller_ref.username}
                    images={item.item_images}
                    userId={userId}
                />
                <SimilarItems title={'Similar Items'} similarItems={item.similar_items} />
            </Container>
        </BackgroundWrapper>
    );
}

export default ProductDetails;