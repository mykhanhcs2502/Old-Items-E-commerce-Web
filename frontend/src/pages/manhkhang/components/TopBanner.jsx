
const topBannerImgSrc = "https://blog-assets.freshworks.com/freshsales-crm/wp-content/uploads/2018/11/Banner_002.png"

const imgStyle = {
    "width": "100%",
    "height": "400px"
}

export default function TopBanner(){
    return (
        <div>
            <img src={topBannerImgSrc} style={imgStyle}/>
        </div>
    )
}