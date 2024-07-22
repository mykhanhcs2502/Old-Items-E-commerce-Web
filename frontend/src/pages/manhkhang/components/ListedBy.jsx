import Typography from "@mui/material/Typography";

export default function ListedBy({seller}) {
    return (
        <div className={"listed-by-container"}>
            <div className={"header-container"}>
                <Typography variant={"body1"}>Listed by</Typography>
                <div className="line"></div>
            </div>

            <div className={"body-container"}>
                <img src="https://picsum.photos/200" alt="avatar"/>
                <div>
                    <Typography variant={"h6"}>{seller}</Typography>
                    <Typography variant={"body1"}>
                        Usually responds within <span className="highlight">24 hours</span>
                    </Typography>
                </div>
            </div>
        </div>
    )
}