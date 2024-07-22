import React from 'react';
import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';

import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
const catalogueDescription = {
    "margin-top": "10px" /* Add spacing between the image and the description */
}



const CircularImage = ({ icon, description, color }) => {
    const theme = useTheme()
    return (
        // <div className={"listed-by-container"}>
        <div style={{ display: "flex", flexDirection: 'column', alignItems: "center" }}>

            <Avatar sx={{ bgcolor: color, width: 60, height: 60 }}>
                {icon}
            </Avatar>
            <Typography variant={"h6"} style={{ textAlign: "center", padding: "20px" }}>
                {description}
            </Typography>
        </div>
        // </div>
    );
};

export default CircularImage;
