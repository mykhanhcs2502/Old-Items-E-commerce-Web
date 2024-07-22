import Dialog from '@mui/material/Dialog';
import { DialogActions, Rating, TextField, Box, Button } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Chip from '@mui/material/Chip';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Check from '@mui/icons-material/Check';
const ModalRate = (props) => {
    const handleClose = props.handleClose
    const open = props.open
    const getOrder = props.getOrder

    const items = props.items
    const setItems = props.setItems
    const orders = props.orders
    const setOrders = props.setOrders
    const itemsQ = props.itemsQ
    const setItemsQ = props.setItemsQ
    const ordersQ = props.ordersQ
    const setOrdersQ = props.setOrdersQ
    const setOpenSnack = props.setOpenSnack


    const theme = useTheme()
    const [item, setItem] = useState(props.item)
    const [star, setStar] = useState(0)
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)
    const [hover, setHover] = useState(-1);
    let { userid } = useParams()
    async function createReview() {
        setLoading(true)
        let newReview = {
            star: star,
            comment: comment,
            review_date: new Date().toISOString(),
            item_id: item.item_id,
            buyer_id: parseInt(userid)
        }
        let res = await axios.post("http://127.0.0.1:5000/namkha/review", newReview)

        setItem({
            ...item,
            rate_comment: comment,
            rate_star: star
        })
        setOpenSnack(true)
        setLoading(false)
        setStar(0)
        setComment(0)
        setItems(items.map(ite => {
            return {
                ...ite,
                items: ite.items.map(itein => {
                    if (itein.item_id == item.item_id) {
                        return {
                            ...itein,
                            rate_star: star,
                            rate_comment: comment,
                        }
                    }
                    else {
                        return itein
                    }
                })
            }
        }))
        setItemsQ(itemsQ.map(iteQ => {
            return {
                ...iteQ,
                items: iteQ.items.map(iteinQ => {
                    if (iteinQ.item_id == item.item_id) {
                        return {
                            ...iteinQ,
                            rate_star: star,
                            rate_comment: comment,
                        }
                    }
                    else {
                        return iteinQ
                    }
                })
            }
        }))
        setOrders(orders.map(ord => {
            return {
                ...ord,
                items: ord.items.map(itein => {
                    if (itein.item_id == item.item_id) {
                        return {
                            ...itein,
                            rate_star: star,
                            rate_comment: comment,
                        }
                    }
                    else {
                        return itein
                    }
                })
            }
        }))
        setOrdersQ(ordersQ.map(ordQ => {
            return {
                ...ordQ,
                items: ordQ.items.map(itein => {
                    if (itein.item_id == item.item_id) {
                        return {
                            ...itein,
                            rate_star: star,
                            rate_comment: comment,
                        }
                    }
                    else {
                        return itein
                    }
                })
            }
        }))
    }
    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <DialogContent>
                    <Typography variant="h5" fontWeight={"bold"}>{item.item_name}</Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.grey[600], display: "flex", alignItems: "center", columnGap: 1, marginTop: "4px" }}>
                        <StorefrontIcon />
                        {item.shop_name}
                    </Typography>
                    <Chip label={item.category.name} size="small"
                        color={item.category.color} sx={{ marginTop: "8px", marginBottom: 2 }} />
                    <img
                        src={`${item.images[0].image_url}`}
                        width={"100%"}
                        style={{
                            border: `1px solid ${theme.palette.grey[200]}`,
                            borderRadius: "8px"
                        }}
                    />
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", columnGap: 1, marginTop: 1 }}>
                        {item.rate_star > 3 || (star > 3 && hover == -1) || hover > 3
                            ? <SentimentSatisfiedAltIcon fontSize='large' />
                            : (item.rate_star == 3 || (star == 3 && hover == -1) || hover == 3
                                ? <SentimentNeutralIcon fontSize='large' />
                                : (hover == -1 && !item.rate_star && star == 0
                                    ? <SentimentSatisfiedIcon fontSize='large' />
                                    : <SentimentVeryDissatisfiedIcon fontSize='large' />
                                ))
                        }
                        <Typography variant="h6">{item.rate_star ? "Your review of this product:" : "What is your rate?"}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginY: 1 }}>
                        <Rating
                            onChange={(e, value) => setStar(value)}
                            value={item.rate_star ?? star}
                            readOnly={item.rate_star ? true : false}
                            sx={{
                                fontSize: item.rate_star ? null : 60
                            }}
                            size="large"
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }}
                                fontSize="inherit"
                            />}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                        />
                    </Box >
                    {item.rate_star
                        ? <DialogContentText sx={{ textAlign: "center" }}>"{item.rate_comment}"</DialogContentText>
                        : <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                            <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2, width: "50%" }}>Please share your opinion about the product:</Typography>
                            <TextField
                                label="Your opinion..."
                                multiline
                                fullWidth
                                rows={4}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Box>
                    }

                    {!item.rate_star
                        ? <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
                            <Button onClick={createReview} variant="contained" startIcon={loading ? <CircularProgress size={20} style={{ color: "white" }} /> : <CheckIcon />} >
                                Submit
                            </Button>
                        </Box>
                        : null}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ModalRate