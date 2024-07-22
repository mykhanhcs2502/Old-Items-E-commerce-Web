import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Category from "./Category";

import MenuBookIcon from '@mui/icons-material/MenuBook';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import WatchIcon from '@mui/icons-material/Watch';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import KitchenIcon from '@mui/icons-material/Kitchen';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import ToysIcon from '@mui/icons-material/Toys';
import { useTheme } from '@mui/material/styles';
let iconArray = [
    <MenuBookIcon />,
    <LaptopChromebookIcon />,
    <CheckroomIcon />,
    <BusinessCenterIcon />,
    <WatchIcon />,
    <HeadphonesIcon />,
    <KitchenIcon />,
    <SportsCricketIcon />,
    <ToysIcon />
]

export default function Categories() {
    const [categories, setCategories] = useState([])
    const theme = useTheme()
    let colorList = [
        theme.palette.success['light'],
        theme.palette.secondary['light'],
        theme.palette.warning['light'],
        theme.palette.error['light'],
        theme.palette.primary['light'],
    ]
    useEffect(() => {
        const fetchCategories = async () => {
            const data = await fetch('http://127.0.0.1:5000/namkhoa/categories')
            const json = await data.json();
            setCategories(json);
        }
        fetchCategories().catch(console.error);
    }, [])
    return (
        <div>
            <Typography sx={{ paddingTop: "20px", paddingBottom: "20px", paddingRight: "20px" }} variant={"h4"}>
                All the catalogues you love
            </Typography>
            <div style={{ display: 'flex', gap: '10px 30px', alignContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                {
                    categories.map(
                        (category, index) =>
                            <Category key={category.id} category={category} icon={iconArray[index]} color={colorList[index % 5]} />
                    )
                }
            </div>
        </div>
    )
}