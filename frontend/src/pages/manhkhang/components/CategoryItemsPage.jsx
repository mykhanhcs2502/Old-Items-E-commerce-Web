import Typography from "@mui/material/Typography";
import CategoryItems from "./CategoryItems";
import Stack from "@mui/system/Stack";
import Container from "@mui/material/Container";
import {useLoaderData} from "react-router-dom";
import NavBarContainer from "../../../common/navbar";
import DenseAppBar from "./DenseAppBar";
import BackgroundWrapper from "../../../common/backgroundWrapper";

export async function loader({params}) {
    const data = await fetch(`http://127.0.0.1:5000/manhkhang/categories/${params.categoryId}`)
    return await data.json()
}

export default function CategoryItemsPage() {
    const categoryItems = useLoaderData()
    return (
        <BackgroundWrapper>
            <NavBarContainer/>
            <DenseAppBar/>
            <Container>
            <Stack direction={'row'} sx={{display: 'flex', alignItems:'justify', justifyContent:'space-between'}}>
                <Typography sx={{padding: '50px 0 50px 0'}} variant={"h2"}>
                    {categoryItems[0].category_ref.name}
                </Typography>
                <Typography sx={{padding: '75px', textAlign: 'justify'}} variant={"h6"}>
                    {categoryItems.length} items
                </Typography>
            </Stack>
            <CategoryItems items={categoryItems}/>
        </Container>
        </BackgroundWrapper>
    )
}