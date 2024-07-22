// import components
import {
    Button,
    Typography,
    Box,
    Grid
} from "@mui/material"
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
import GigaCard from "./GigaCard/GigaCard";
import GigaCardBody from "./GigaCardBody/GigaCardBody";
import { useTheme } from '@mui/material/styles';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IOCard from "./IOCard/IOCard";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Avatar from '@mui/material/Avatar';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import BackgroundWrapper from "../../common/backgroundWrapper";
import NavBarContainer from "../../common/navbar";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// import tools
import { useState, useEffect } from "react"
import axios from "axios"
// constant
let borderRad = 2
let boxShad = 0
const MyBoughtItems = () => {
    // states
    const [tabType, setTabType] = useState(0)
    const [sortType, setSortType] = useState("date")
    const [itemView, setItemView] = useState("all")
    const [sortOrder, setSortOrder] = useState("descending")
    const [orders, setOrders] = useState(null)
    const [items, setItems] = useState(null)
    const [ordersQ, setOrdersQ] = useState(null)
    const [itemsQ, setItemsQ] = useState(null)
    const [searchQ, setSearchQ] = useState("")
    const [openSnack, setOpenSnack] = useState(false);

    let userId = localStorage.getItem('userId') ?? 2;
    // const [objList, setObjList] = useState([])
    // hooks
    const theme = useTheme()

    async function getOrder() {
        try {

            let rawResponse = await axios.get("http://127.0.0.1:5000/namkha/orders/2")
            let userResponse = await axios.get("http://127.0.0.1:5000/namkha/users")
            let cateResponse = await axios.get("http://127.0.0.1:5000/namkha/categories")
            // let response = await Promise.all([
            //     axios.get(`http://127.0.0.1:5000/namkha/orders/${userId}`),
            //     axios.get("http://127.0.0.1:5000/namkha/users"),
            //     axios.get("http://127.0.0.1:5000/namkha/categories")
            // ]);
            // let rawResponse = response[0]
            // let userResponse = response[1]
            // let cateResponse = response[2]
            // console.log("response: ", response)
            // console.log("")
            let orderSave = []
            let itemSave = []
            // let colorList = [
            //     theme.palette.success.light,
            //     theme.palette.warning.light,
            //     theme.palette.secondary.light,
            //     theme.palette.error.light,
            //     theme.palette.primary.light,
            // ]
            // abc
            let colorList = [
                "success",
                "secondary",
                "warning",
                "error",
                "primary",
            ]
            let cateList = cateResponse.data.map((cate, index) => {
                return {
                    ...cate,
                    color: colorList[index % 5]
                }
            })
            for (let rawOrder of rawResponse.data) {
                let newOrderObj = {
                    order_id: rawOrder.id,
                    paid_date: rawOrder.date,
                    buyer_id: rawOrder.buyer_id,
                    total_paid: 0,
                    items: []
                }
                for (let rawItem of rawOrder.items['py/seq']) {
                    let sellerFind = userResponse.data.find((u) => u.id == rawItem.seller_id)
                    let buyerFind = userResponse.data.find((u) => u.id == rawItem.buyer_id)
                    let cateFind = cateList.find((cate) => cate.id == rawItem.category_id)
                    let newItemObj = {
                        item_id: rawItem.id,
                        item_name: rawItem.item_name,
                        category: cateFind,
                        price: rawItem.price,
                        condition: rawItem.condition,
                        description: rawItem.description,
                        shop_id: sellerFind.id,
                        shop_name: sellerFind.username,
                        shop_email: sellerFind.email,
                        shop_phone: sellerFind.phone,
                        shop_address: sellerFind.address,
                        rate_id: rawItem.review['py/seq'][0]?.id,
                        rate_star: rawItem.review['py/seq'][0]?.star,
                        rate_comment: rawItem.review['py/seq'][0]?.comment,
                        rate_date: rawItem.review['py/seq'][0]?.date,
                        images: []
                    }
                    for (let img of rawItem.item_images['py/seq']) {
                        let newImgObj = {
                            image_id: img.id,
                            image_url: img.url,
                            image_type: img.image_type
                        }
                        newItemObj.images.push(newImgObj)
                    }
                    newOrderObj.total_paid += rawItem.price
                    newOrderObj.items.push(newItemObj)
                    let newItemOne = {
                        ...newOrderObj,
                        items: [
                            {
                                ...newItemObj
                            }
                        ]
                    }
                    itemSave.push(newItemOne)
                }
                orderSave.push(newOrderObj)
            }

            // setOrders(newResponse)
            // setItems(itemList)
            // setOrdersQ(newResponse)
            // setItemsQ(itemList)

            setOrders(orderSave)
            setItems(itemSave)
            setOrdersQ(orderSave)
            setItemsQ(itemSave)
        }
        catch {

        }
    }
    useEffect(() => {
        getOrder()
    }, [])
    useEffect(() => {
        if (orders && items) {
            let newOrders = orders.filter((ord) => {
                for (let item of ord.items) {
                    if (item.item_name.toLowerCase().includes(searchQ)) {
                        return true
                    }
                }
                return false
            })
            let newItems = items.filter((ord) => {
                for (let item of ord.items) {
                    if (item.item_name.toLowerCase().includes(searchQ)) {
                        if (itemView == "all") {
                            return true
                        }
                        else if (itemView == "rated" && item.rate_star) {
                            return true
                        }
                        else if (itemView == "unrated" && !item.rate_star) {
                            return true
                        }
                        else {
                            return false
                        }
                    }
                }
                return false
            })
            setOrdersQ(newOrders)
            setItemsQ(newItems)
        }
    }, [searchQ])
    useEffect(() => {
        if (sortType == "price") {
            let newOrdersQ = [...ordersQ]
            let newOrders = [...orders]
            let newItemsQ = [...itemsQ]
            let newItems = [...items]
            if (sortOrder == "ascending") {
                newOrdersQ.sort((a, b) => { return a.total_paid > b.total_paid ? 1 : -1 })
                newOrders.sort((a, b) => { return a.total_paid > b.total_paid ? 1 : -1 })
                newItemsQ.sort((a, b) => { return a.items[0].price > b.items[0].price ? 1 : -1 })
                newItems.sort((a, b) => { return a.items[0].price > b.items[0].price ? 1 : -1 })
            }
            else if (sortOrder == "descending") {
                newOrdersQ.sort((a, b) => { return a.total_paid <= b.total_paid ? 1 : -1 })
                newOrders.sort((a, b) => { return a.total_paid <= b.total_paid ? 1 : -1 })
                newItemsQ.sort((a, b) => { return a.items[0].price <= b.items[0].price ? 1 : -1 })
                newItems.sort((a, b) => { return a.items[0].price <= b.items[0].price ? 1 : -1 })
            }
            setItemsQ(newItemsQ)
            setItems(newItems)
            setOrdersQ(newOrdersQ)
            setOrders(newOrders)
        }
        else if (sortType == "date" && ordersQ && itemsQ) {
            let newOrdersQ = [...ordersQ]
            let newOrders = [...orders]
            let newItemsQ = [...itemsQ]
            let newItems = [...items]
            if (sortOrder == "ascending") {
                newOrdersQ.sort((a, b) => {
                    let aNew = new Date(a.paid_date)
                    let bNew = new Date(b.paid_date)
                    return aNew.toJSON() > bNew.toJSON() ? 1 : -1
                })
                newOrders.sort((a, b) => {
                    let aNew = new Date(a.paid_date)
                    let bNew = new Date(b.paid_date)
                    return aNew.toJSON() > bNew.toJSON() ? 1 : -1
                })
                newItemsQ.sort((a, b) => {
                    let aNew = new Date(a.paid_date)
                    let bNew = new Date(b.paid_date)
                    return aNew.toJSON() > bNew.toJSON() ? 1 : -1
                })
                newItems.sort((a, b) => {
                    let aNew = new Date(a.paid_date)
                    let bNew = new Date(b.paid_date)
                    return aNew.toJSON() > bNew.toJSON() ? 1 : -1
                })
            }
            else if (sortOrder == "descending") {
                newOrdersQ.sort((a, b) => {
                    let aNew = new Date(a.paid_date)
                    let bNew = new Date(b.paid_date)
                    return aNew.toJSON() <= bNew.toJSON() ? 1 : -1
                })
                newOrders.sort((a, b) => {
                    let aNew = new Date(a.paid_date)
                    let bNew = new Date(b.paid_date)
                    return aNew.toJSON() <= bNew.toJSON() ? 1 : -1
                })
                newItemsQ.sort((a, b) => {
                    let aNew = new Date(a.paid_date)
                    let bNew = new Date(b.paid_date)
                    return aNew.toJSON() <= bNew.toJSON() ? 1 : -1
                })
                newItems.sort((a, b) => {
                    let aNew = new Date(a.paid_date)
                    let bNew = new Date(b.paid_date)
                    return aNew.toJSON() <= bNew.toJSON() ? 1 : -1
                })
            }
            setItemsQ(newItemsQ)
            setItems(newItems)
            setOrdersQ(newOrdersQ)
            setOrders(newOrders)
        }
    }, [sortType, sortOrder])
    useEffect(() => {
        if (itemView == "all") {
            setItemsQ(items)
        }
        else if (itemView == "rated") {
            setItemsQ(items.filter(ite => {
                if (ite.items[0].rate_star) {
                    return true
                }
                else {
                    return false
                }
            }))
        }
        else if (itemView == "unrated") {
            setItemsQ(items.filter(ite => {
                if (ite.items[0].rate_star) {
                    return false
                }
                else {
                    return true
                }
            }))
        }
    }, [itemView])
    // useEffect(() => {
    //     if (tabType == 0) {
    //         setObjList(orders)
    //     }
    //     else {
    //         setObjList(items)
    //     }
    // }, [tabType])
    // functions
    function handleTabType(e, newValue) {
        // setObjList([])
        setTabType(newValue)
    }
    function handleSortType(e) {
        setSortType(e.target.value);
    }
    function handleSortOrder(e) {
        if (sortOrder == "descending") {
            setSortOrder("ascending")
        }
        else {
            setSortOrder("descending")
        }
    }
    function handleSearchQ(e) {
        setSearchQ(e.target.value)
    }

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };
    return (

        <CssBaseline>
            <BackgroundWrapper>
                <NavBarContainer />
                {orders && items
                    ? <Container>
                        <Grid container spacing={2} my={2}>
                            <Grid item md={12}>
                                <Typography variant="h3" sx={{ display: "flex", alignItems: "center" }} gutterBottom>
                                    Order history
                                </Typography>
                            </Grid>
                            {/* Tab */}
                            <Grid item md={12}>
                                <Tabs value={tabType} onChange={handleTabType}>
                                    <Tab label="View by orders" />
                                    <Tab label="View by items" />
                                </Tabs>
                            </Grid>
                            {/* Search bar */}
                            <Grid item md={6} sx={{ display: "flex", alignItems: "center" }}>
                                <FormControl variant="outlined" sx={{
                                    boxShadow: boxShad, borderRadius: borderRad, width: "80%",
                                    "& .MuiInputBase-root": {
                                        height: "46px"
                                    },
                                }}>
                                    <OutlinedInput
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        }
                                        placeholder={"Search something..."}
                                        sx={{ borderRadius: borderRad, backgroundColor: "white" }}
                                        value={searchQ}
                                        onChange={handleSearchQ}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={6} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", columnGap: 3 }}>
                                {/* View all or rated or unrated */}

                                {tabType == 1
                                    ? <FormControl sx={{
                                        "& .MuiInputBase-root": {
                                            height: "46px",
                                            borderRadius: borderRad
                                        },
                                        backgroundColor: "white",
                                        width: "40%",
                                    }}>
                                        <Select
                                            value={itemView}
                                            onChange={(e) => { setItemView(e.target.value) }}
                                            sx={{
                                                // boxShadow: 10,
                                                // borderRadius: 4,
                                                // width: "69%"
                                            }}
                                        // variant={"standard"}
                                        >
                                            <MenuItem value={"all"}>
                                                <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
                                                    <PanoramaFishEyeIcon />
                                                    <Typography variant="body1">View all items</Typography>
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value={"rated"}>
                                                <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
                                                    <CheckIcon />
                                                    <Typography variant="body1">View rated items</Typography>
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value={"unrated"}>
                                                <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
                                                    <CloseIcon />
                                                    <Typography variant="body1">View unrated items</Typography>
                                                </Box>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    : null
                                }
                                {/* Sort type */}
                                <Box sx={{ display: "flex", alignItems: "center", columnGap: 1, height: "100%" }}>
                                    <Typography variant="body1" >
                                        SORT BY:
                                    </Typography>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            display: 'flex',
                                            border: (theme) => `1px solid #c4c4c4`,
                                            flexWrap: 'wrap',
                                            borderRadius: 2
                                        }}
                                    >
                                        <ToggleButtonGroup
                                            size="small"
                                            color="primary"
                                            value={sortType}
                                            sx={{
                                                '& .MuiToggleButtonGroup-grouped': {
                                                    margin: theme.spacing(0.5),
                                                    border: 0,
                                                    '&.Mui-disabled': {
                                                        border: 0,
                                                    },
                                                    '&:not(:first-of-type)': {
                                                        borderRadius: 2,
                                                    },
                                                    '&:first-of-type': {
                                                        borderRadius: 2,
                                                    },
                                                }
                                            }}
                                            exclusive
                                            onChange={(e, value) => { setSortType(value) }}
                                        >
                                            <ToggleButton value="date">
                                                <AccessTimeIcon />
                                            </ToggleButton>
                                            <ToggleButton value="price">
                                                <AttachMoneyIcon />
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </Paper>
                                </Box>
                                {/* Sort order */}
                                {sortOrder == "descending"
                                    ? <Button onClick={handleSortOrder} startIcon={<KeyboardDoubleArrowDownIcon />} sx={{ width: "20%", display: "flex", justifyContent: "flex-end", padding: 0 }}>
                                        Descending
                                    </Button>
                                    : <Button onClick={handleSortOrder} startIcon={<KeyboardDoubleArrowUpIcon />} sx={{ width: "20%", display: "flex", justifyContent: "flex-end", padding: 0 }}>
                                        Ascending
                                    </Button>
                                }
                            </Grid>
                            <IOCard objList={tabType == 0 ? ordersQ : itemsQ} tabType={tabType} getOrder={getOrder}
                                items={items}
                                setItems={setItems}
                                orders={orders}
                                setOrders={setOrders}
                                itemsQ={itemsQ}
                                setItemsQ={setItemsQ}
                                ordersQ={ordersQ}
                                setOrdersQ={setOrdersQ}
                                setOpenSnack={setOpenSnack}
                            />
                        </Grid >
                        <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={openSnack} autoHideDuration={4000} onClose={handleCloseSnack}>
                            <Alert variant='filled' onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                                Your review has been saved successfully!
                            </Alert>
                        </Snackbar >
                        <div style={{
                            backgroundImage: "url('https://images.nationalgeographic.org/image/upload/v1638889927/EducationHub/photos/pebble-beach.jpg')"
                        }}></div>
                    </Container>
                    :
                    <Backdrop
                        sx={{ color: theme.palette.primary.main, zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={orders && items ? false : true}
                        invisible={true}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                }
            </BackgroundWrapper>
        </CssBaseline >
    )
}

export default MyBoughtItems