import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  RiArrowGoBackFill,
} from 'react-icons/ri';
import './Cart.css';
import { Button, TextField } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import axios from 'axios';
import PayDialog from '../../common/PayDialog';
import { Typography } from '@mui/material';
import BackgroundWrapper from "../../common/backgroundWrapper";
import NavBarContainer from "../../common/navbar";
import Container from "@mui/material/Container";

const appTheme = createTheme({
  palette: {
    ochre: {
      // main: '#E3D026',
      main: '#F9E076',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
});

const Navbar = () => {
  return (
    <div className='nav'>
      <div className='nav-top'>
        <Link to='/namkhoa'>
          <RiArrowGoBackFill />
        </Link>
        <h1 className='nav-title'>CART</h1>
        <AccountCircleTwoToneIcon className='user-icon'></AccountCircleTwoToneIcon>
      </div>
    </div>
  );
};

const Searchbar = () => {
  return (
    <div className='search-input'>
      <TextField
        id="input-with-icon-textfield"
        label="Search"
        // InputProps={{
        //   startAdornment: (
        //     <InputAdornment position="start">
        //       <AccountCircleTwoToneIcon />
        //     </InputAdornment>
        //   ),
        // }}
        variant="standard"
      />
    </div>
  );
};

const Itemblock = ({ Category }) => {
  const [items, setItems] = useState([
    {
      "item_id": 1,
      "item_name": "Lucky Luke Edition Sneakers - limited",
      "price": 45,
      "images": [
        {
          "image_id": 1,
          "image_url": "/images/lucky-shoe.jpg"
        }
      ],
      "shop_id": 1,
      "shop_name": "Ananas",
      "rate_id": 1,
      "rate_star": 4,
      "rate_comment": "Outstanding"
    },
    {
      "item_id": 2,
      "item_name": "Bang Edition Sneakers",
      "price": 30,
      "images": [
        {
          "image_id": 1,
          "image_url": "/images/lucky-shoe.jpg"
        }
      ],
      "shop_id": 1,
      "shop_name": "Ananas",
      "rate_id": 2,
      "rate_star": 3,
      "rate_comment": "Cool!"
    },
    {
      "item_id": 3,
      "item_name": "Toy Shelf",
      "price": 17,
      "images": [
        {
          "image_id": 2,
          "image_url": "https://img.freepik.com/premium-vector/kids-toys-wood-shop-shelves_53562-2731.jpg?w=360"
        }
      ],
      "shop_id": 2,
      "shop_name": "Kim Dien",
      "rate_id": 3,
      "rate_star": 4,
      "rate_comment": "Neato!"
    }]);
  const [total, setTotal] = useState(0);

  function goToBuy(itemId, price) {
    localStorage.setItem("buyItemId", itemId);
    localStorage.setItem("price", price);
    // localStorage.setItem("buyItem", item);
  }

  async function getItem() {
    let userId = (localStorage.getItem("userId")).toString();
    try {
      // let itemResponse = await axios.get("http://127.0.0.1:5000/items/1")
      let itemResponse = await axios.get("http://127.0.0.1:5000/dangkhoab/cart/" + userId)
        .then(json => {
          let resjson = json.data
          // localStorage.setItem("allCartItem", resjson);
          setItems(resjson)
          let tempTotal = 0
          resjson.map((item) => {
            tempTotal = tempTotal + item["price"]
          })
          setTotal(tempTotal)
          localStorage.setItem("total", tempTotal);
        })
        .catch(err => {
          fetch('itemlist2.json', {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
            .then(function (response) { return response.json() })
            .then(json => {
              let resjson = json
              console.log("Error: ", resjson)
              setItems(resjson)
              let tempTotal = 0
              resjson.map((item) => {
                tempTotal = tempTotal + item["price"]
              })
              setTotal(tempTotal)
              localStorage.setItem("total", tempTotal);
            })
        })
      // console.log(itemResponse.data)
      // let resItemList = []

      // for (let item of itemResponse.data) {
      //   let newItem = {
      //       item_id: item.id,
      //       item_name: item.name,
      //       price: item.price,
      //       images: item.images,
      //       shop_id: item.seller_id,
      //       shop_name: "Lost&Sell Co.",
      //       rate_id: 3,
      //       rate_star: 4,
      //       rate_comment: "Highly Recommended"
      //   }
      //   resItemList.append(newItem)
      // }
      // console.log(itemResponse)
      // setItems(resItemList)
    }
    catch {
    }
  }


  useEffect(() => {
    getItem()
  }, []);
  const buttonStyle = {
    display: "flex",
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    fontWeight: 300,
    fontFamily: "Roboto",
    /* font-family: Inter; */
    fontSize: "18px",
    lineHeight: "28px",
    color: "#FFFFFFFF",
    background: "#FF7700FF",
    opacity: 1,
    border: "none",
    borderRradius: "4px",
  }
  return (
    <div className='block'>
      <h1 style={{ marginBottom: 32 }}>My cart</h1>
      {items.map((item) => (
        <div className='item' color="ochre">
          <img
            // src='https://img.freepik.com/premium-vector/kids-toys-wood-shop-shelves_53562-2731.jpg?w=360'
            src={item["images"][0]["image_url"]}
            alt='items'
          />
          <div className='item-info'>
            <h6>{item["item_name"]}</h6>
            <p>${item["price"]}</p>
            <Link to='/payment'>
              {/* <ThemeProvider theme={appTheme}> */}
              {/* <Button variant="contained" color="ochre" className='buybutton' onClick={goToBuy(item["id"], item["price"])}>Buy</Button> */}
              {/* </ThemeProvider> */}
            </Link>
          </div>
          {/* <div className='additem'>
            <button color="ochre" onClick={() => handleDecrease(index)}>-</button>
            <input type='number' value={item.quantity} readOnly />
            <button color="ochre" onClick={() => handleIncrease(index)}>+</button>
          </div> */}
        </div>
      ))}
      <Link to='/payment'>
        {/* <ThemeProvider theme={appTheme}> */}
        {/* <button className='order' color="ochre">Buy</button> */}
        <Button style={buttonStyle} variant="contained" color="ochre" className='buybutton'>BUY ALL</Button>
        {/* </ThemeProvider> */}
      </Link>
    </div>
  );
};


const Cart = () => {
  const [totalPrice, setItems] = useState(45);
  // useEffect(() => {
  //   getItem()
  // }, []);

  return (
    <div>
      <BackgroundWrapper>
        <NavBarContainer />
        <Container>
          <ThemeProvider theme={appTheme}>
            {/* <Searchbar className='searchbar'/> */}
            <form onSubmit={(e) => { e.preventDefault(); }} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <Itemblock Category='Selected' />
            </form>
          </ThemeProvider>
        </Container>
      </BackgroundWrapper>
    </div>
  );
};

export default Cart;
