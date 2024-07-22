import Carousel from "react-material-ui-carousel";

const imgStyle = {
    maxWidth: "600px",
    maxHeight: "600px",
    overflow: "hidden"
}
export default function ItemImageCarousel({images}) {
    console.log(images)
    return (
        <Carousel height={600} animation={"slide"} navButtonsAlwaysVisible={true}>
            {
                images.map(image => <img key={image.id} src={image.url} style={
                    {height: "100%", width: "100%", objectFit: "cover"}
                }/>)
            }
        </Carousel>


    )
}