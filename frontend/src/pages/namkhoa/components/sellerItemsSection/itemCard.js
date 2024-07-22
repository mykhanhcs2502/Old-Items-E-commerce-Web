import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { ToastContainer, toast } from 'react-toastify';
import UpdateItemModal from './updateItemModal';
import { green, red, yellow } from '@mui/material/colors';
import { Link } from "react-router-dom"

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function ItemCard({ deleteItem, itemId, buyerEmail, isBoughtItem, categories, itemName, itemCategory, itemPrice, itemCondition, itemDescription, itemImage }) {
  const [isFocus, setIsFocus] = React.useState(false)
  return (
    <Card
      onMouseEnter={() => setIsFocus(true)}
      onMouseLeave={() => setIsFocus(false)}
      sx={{ minWidth: 250, position: 'relative' }}
    >
      {isFocus && !isBoughtItem && (<div style={{ position: 'absolute', right: '0px' }}>
        <IconButton
          onClick={(e) => { deleteItem(itemId) }}
          aria-label="delete" size="small">
          <ClearIcon fontSize="inherit" />
        </IconButton>
      </div>)}
      <CardContent>
        <Chip label={itemCategory ?? 'Default Categories'} color="primary" />
        <Typography variant="h6" component="div">
          {bull}{itemName ?? 'Default Name'}{bull}
        </Typography>
        <img style={{ width: "100%", height: "180px", objectFit: "cover" }} src={itemImage} />
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Price : {itemPrice ?? 'Default Price'} $
        </Typography>
        <Typography color="text.secondary">
          Condition :
        </Typography>
        <Rating sx={{ mb: 1.5 }} readOnly
          value={itemCondition && itemCondition >= 1 && itemCondition <= 5 ? itemCondition : 5}
        />
        <Typography color="text.secondary">
          Description :
        </Typography>
        <Typography sx={{ mb: 1.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {`" ${itemDescription} "` ?? 'Default Description'}
        </Typography>
        <Typography color="text.secondary">
          Status :
        </Typography>
        <Typography variant="body2">
          {isBoughtItem ?
            <Typography sx={{ color: red[900] }}>Sold</Typography> :
            <Typography sx={{ color: green['700'] }}>Available</Typography>}
        </Typography>
      </CardContent>

      <CardActions>
        <Link to={`/product/${itemId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button> Learn more</Button>
        </Link>
        {/* <UpdateItemModal categories={categories} itemId={itemId} itemName={itemName} itemCategory={itemCategory} itemPrice={itemPrice} itemCondition={itemCondition} itemDescription={itemDescription}/> */}
      </CardActions>


    </Card >
  );
}