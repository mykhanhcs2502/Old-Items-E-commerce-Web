import BackgroundWrapper from "../../common/backgroundWrapper";
import NavBarContainer from "../../common/navbar";
import ItemReportSection from "./components/itemReportSection";
import SellerItemsSection from "./components/sellerItemsSection";
import Container from "@mui/material/Container";
function MyStorePage() {
  return (
    <BackgroundWrapper>
      <NavBarContainer />
      <Container>
        <ItemReportSection />
        <SellerItemsSection />
      </Container>
    </BackgroundWrapper>
  );
}

export default MyStorePage;