// import components
import {
    Button,
    Typography,
    Box,
    Grid
} from "@mui/material"
import { Link } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Divider from '@mui/material/Divider';
import GigaCard from "../GigaCard/GigaCard";
import GigaCardBody from "../GigaCardBody/GigaCardBody";
import { useTheme } from '@mui/material/styles';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ModalRate from "../ModalRate/ModalRate";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from '@mui/material/Chip';

// import tools
import { useState, useEffect } from "react"
import axios from "axios"
// constant
let borderRad = 2
let boxShad = 5

const RateButton = (props) => {
    const item = props.item
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };
    return (
        <>
            <Button onClick={handleClickOpen} color="success" variant="contained" startIcon={<ThumbUpIcon />}>Rate this</Button>
            <ModalRate open={open} handleClose={handleClose} item={item} getOrder={props.getOrder}
                items={props.items}
                setItems={props.setItems}
                orders={props.orders}
                setOrders={props.setOrders}
                itemsQ={props.itemsQ}
                setItemsQ={props.setItemsQ}
                ordersQ={props.ordersQ}
                setOrdersQ={props.setOrdersQ}
                setOpenSnack={props.setOpenSnack}
            />

        </>
    )
}
const ViewButton = (props) => {
    const item = props.item
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };
    return (
        <>
            <Button onClick={handleClickOpen}>View rating</Button>
            <ModalRate open={open} handleClose={handleClose} item={item} getOrder={props.getOrder}
                items={props.items}
                setItems={props.setItems}
                orders={props.orders}
                setOrders={props.setOrders}
                itemsQ={props.itemsQ}
                setItemsQ={props.setItemsQ}
                ordersQ={props.ordersQ}
                setOrdersQ={props.setOrdersQ}
                setOpenSnack={props.setOpenSnack}
            />
        </>
    )
}
const IOCard = (props) => {
    console.log("objList: ", props.objList)
    const theme = useTheme()
    return (
        <>
            {props.objList.map((ord) => {
                return (
                    <Grid item md={12} key={props.tabType == 0 ? ord.order_id : ord.items[0].item_id}>
                        <GigaCard>
                            <GigaCardBody>
                                <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
                                    <AccessTimeIcon sx={{ color: theme.palette.grey[600] }} />
                                    <Typography variant={"body1"} sx={{ color: theme.palette.grey[600] }}>
                                        {new Date(ord.paid_date).toLocaleString()}

                                    </Typography>
                                </Box>
                                {ord.items.map(item => {
                                    return (
                                        <Box key={item.item_id}>
                                            <Divider sx={{ marginY: 2, backgroundColor: theme.palette.grey[600] }} />
                                            <Grid container spacing={2}>
                                                <Grid item md={5}>
                                                    <Box sx={{ display: "flex", columnGap: 2 }}>
                                                        <img
                                                            src={`${item.images[0].image_url}`}
                                                            width={90}
                                                            height={90}
                                                            style={{
                                                                border: `1px solid ${theme.palette.grey[200]}`,
                                                                borderRadius: "8px"
                                                            }}
                                                        />
                                                        <Box sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            justifyContent: "space-between",
                                                            alignItems: "flex-start",
                                                            height: "90px"
                                                        }}>
                                                            <Link to="#" style={{ textDecoration: "none" }}>
                                                                <Typography variant="body1" sx={{
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    display: "-webkit-box",
                                                                    WebkitLineClamp: 2, /* number of lines to show */
                                                                    LineCamp: 2,
                                                                    WebkitBoxOrient: "vertical",
                                                                    color: "black",
                                                                }}>
                                                                    {item.item_name}
                                                                </Typography>
                                                            </Link>
                                                            <Link to={`/shopui/${item.shop_id}`} style={{ textDecoration: "none" }}>
                                                                <Typography variant="body2" sx={{ color: theme.palette.grey[600], display: "flex", alignItems: "center", columnGap: 1 }}>
                                                                    <StorefrontIcon />
                                                                    {item.shop_name}
                                                                </Typography>
                                                            </Link>
                                                            <Chip variant="filled" label={item.category.name} size="small"
                                                                color={item.category.color} />
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                                <Grid item md={4} >
                                                    <Box sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: item.rate_star ? "space-between" : "center",
                                                        alignItems: "flex-end",
                                                        height: "100%"
                                                    }}>
                                                        {item.rate_star
                                                            ? <>
                                                                <Rating value={item.rate_star} readOnly size="large"
                                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                                />
                                                                <ViewButton item={item} getOrder={props.getOrder}
                                                                    items={props.items}
                                                                    setItems={props.setItems}
                                                                    orders={props.orders}
                                                                    setOrders={props.setOrders}
                                                                    itemsQ={props.itemsQ}
                                                                    setItemsQ={props.setItemsQ}
                                                                    ordersQ={props.ordersQ}
                                                                    setOrdersQ={props.setOrdersQ}
                                                                    setOpenSnack={props.setOpenSnack} />
                                                            </>
                                                            : <RateButton item={item} getOrder={props.getOrder}
                                                                items={props.items}
                                                                setItems={props.setItems}
                                                                orders={props.orders}
                                                                setOrders={props.setOrders}
                                                                itemsQ={props.itemsQ}
                                                                setItemsQ={props.setItemsQ}
                                                                ordersQ={props.ordersQ}
                                                                setOrdersQ={props.setOrdersQ}
                                                                setOpenSnack={props.setOpenSnack}
                                                            />
                                                        }
                                                    </Box>
                                                </Grid>
                                                <Grid item md={3}>
                                                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                                        <Typography variant="body1">
                                                            {item.price} $
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    )
                                })}
                                {props.tabType == 0
                                    ? <>
                                        <Divider sx={{ marginY: 2, backgroundColor: theme.palette.grey[600] }} />
                                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                            <Typography variant={"body1"} sx={{ color: theme.palette.grey[600] }}>
                                                Total paid: <b style={{ color: "black" }}>{ord.total_paid} $</b>
                                            </Typography>
                                        </Box>
                                    </>
                                    : null}
                            </GigaCardBody>
                        </GigaCard>
                    </Grid>
                )
            })}
        </>
    )
}
export default IOCard