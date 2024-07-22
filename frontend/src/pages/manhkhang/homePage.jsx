import BackgroundWrapper from "../../common/backgroundWrapper";
import NavBarContainer from "../../common/navbar";
import DenseAppBar from "./components/DenseAppBar";
import TopBanner from "./components/TopBanner";
import Categories from "./components/Categories";
import ListedItems from "./components/ListedItems";
import Container from "@mui/material/Container";
function HomePage() {
    return (
        <BackgroundWrapper>
            <NavBarContainer/>
            <DenseAppBar/>
                <TopBanner/>
            <Container>
                <Categories />
                <ListedItems title={'Newly Listed'} />
            </Container>
        </BackgroundWrapper>
    );
}

export default HomePage;