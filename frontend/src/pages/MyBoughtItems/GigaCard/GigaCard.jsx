import { Paper } from "@mui/material";

const GigaCard = (props) => {
    return (
        // <Box sx={{
        //     borderRadius: 4,
        //     boxShadow: 10,
        //     backgroundColor: "white",
        //     border: (theme) => `1px solid ${theme.palette.divider}`,
        //     height: "100%",
        //     display: "flex",
        //     flexDirection: "column",
        //     width: "100%"
        // }}>
        //     {props.children}
        // </Box>
        <Paper sx={{
            boxShadow: 0,
            borderRadius: "8px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            border: "1px solid #c4c4c4"
        }}>
            {props.children}
        </Paper>
    )
}


export default GigaCard