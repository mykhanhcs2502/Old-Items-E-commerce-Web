import React, { useEffect, useState } from 'react';
import './PayMethod.css';
import { Link } from 'react-router-dom';
import {
  RiArrowGoBackFill,
  RiShoppingCart2Line,
  RiWallet3Line
} from 'react-icons/ri';
import {
  BsCash, BsFillCreditCardFill
} from 'react-icons/bs'
import { Button } from "@mui/material"
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { PayPalButton } from "react-paypal-button-v2";
import PayDialog from '../../common/PayDialog';
import Container from "@mui/material/Container";
import axios from 'axios';
import { Typography } from '@mui/material';
import BackgroundWrapper from "../../common/backgroundWrapper";
import NavBarContainer from "../../common/navbar";

const total = 45
let ship = 7

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
    <BackgroundWrapper>
      <div className='nav'>
        <div className='nav-top'>
          <Link to='/cart'>
            <RiArrowGoBackFill />
          </Link>
          {/* <RiShoppingCart2Line style={{ visibility: 'hidden' }} /> */}
        </div>
      </div>
    </BackgroundWrapper>
  );
};

// const GetTotal = () => {
//   const total = localStorage.getItem('Total') ? localStorage.getItem('Total') : null;

//   return (
//     <div className='getTotal'>
//       <h6>TOTAL</h6>
//       <h1>${total}.000</h1>
//     </div>
//   );
// };



const Bill = (props) => {
  const [total, setTotal] = useState(45);
  // let ship = 2
  // ship = Math.floor(Math.random()*10)

  useEffect(() => {
    let tempTotal = (localStorage.getItem("total")) * 1;
    setTotal(tempTotal)
  })

  const PriceLine = (props) => {
    return (
      <div className="bill">
        <h2 className="billTitle">{props.name}
          <h2 className="billPrice">${props.price}</h2>
        </h2>
      </div>
    )
  }


  return (
    <div className="tableContent">
      <div>
        <PriceLine className="billTitle" name={"Product Cost"} price={total} />
        <PriceLine className="billTitle" name={"Shipping Cost"} price={ship} />
        <div className="tipline" color="ochre"></div>
        <PriceLine className="billTitle" name={"Total Cost"} price={total + ship} />
      </div>
    </div>
  )
}

const PaymentOptions = ({ handleInput }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    handleInput(option);
  };

  return (
    <div className='paymentOptions'>
      <h2>Select Payment Method</h2>
      {/* <PayDialog className="payD"/> */}
      <div className='radioOption'>
        <div className='optionHolder'>
          <div className='optionIntro'>
            <BsCash />
            <h1>CASH</h1>
          </div>
          <input
            type='radio'
            id='cash'
            name='paymentOption'
            value='Cash'
            checked={selectedOption === 'Cash'}
            onChange={() => handleOptionClick('Cash')}
          />
        </div>
      </div>

      <div className='radioOption'>
        <div className='optionHolder'>
          <div className='optionIntro'>
            <BsFillCreditCardFill />
            <h1>PAYPAL</h1>
          </div>
          <input
            type='radio'
            id='bank'
            name='paymentOption'
            value='Banking'
            checked={selectedOption === 'Bank'}
            onChange={() => handleOptionClick('Bank')}
          />
        </div>
        <div className='optionDescription'>
          <p>0005********1234</p>
          {/* <p>OCB</p> */}
          {/* <p>0005********1234</p> */}
          <p>Ton Hoang Hy</p>
        </div>
      </div>

      <div className='radioOption'>
        <div className='optionHolder'>
          <div className='optionIntro'>
            <RiWallet3Line />
            <h1>MOMO</h1>
          </div>
          <input
            type='radio'
            id='e-wallet'
            name='paymentOption'
            value='E-wallet'
            checked={selectedOption === 'E-wallet'}
            onChange={() => handleOptionClick('E-wallet')}
          />
        </div>
        <div className='optionDescription'>
          <p>09xxxxxxxx</p>
          <p>TonHoangHy</p>
        </div>
      </div>
      {/* <div className='radioOption'>
        <div className='optionHolder'>
          <PayPalButton
            options={{
              clientId: "YOUR_CLIENT_ID",
              currency: "USD",
            }}
            amount={9}
            onSuccess={(details, data) => {
              alert("Transaction completed by " + details.payer.name.given_name);

              console.log({ details, data });
            }}
          />
        </div>
      </div> */}

    </div>
  );
};

const PayMethod = () => {
  const [paymentOption, setPaymentOption] = useState('');
  const [checkout, setCheckout] = useState(false);
  ship = Math.floor(Math.random() * 10)
  const handleInput = (option) => {
    setPaymentOption(option);
    localStorage.setItem('PayMethod', JSON.stringify(option));
  };

  async function putItem(userId, itemId) {
    await axios.put("http://127.0.0.1:5000/dangkhoab/cart/" + userId + "/" + itemId)
      .then(json => {
        console.log("Item is bought on FE")
        // let resjson = json.data
        // // localStorage.setItem("allCartItem", resjson);
        // let tempTotal = 0
        // resjson.map((item) => {
        //   tempTotal = tempTotal + item["price"]
        // })
      })
  }

  async function deleteItem(userId, itemId) {
    await axios.delete("http://127.0.0.1:5000/dangkhoab/cart/" + userId + "/" + itemId)
      .then(json => {
        console.log("Item is deleted in Cart")
        // let resjson = json.data
        // // localStorage.setItem("allCartItem", resjson);
        // let tempTotal = 0
        // resjson.map((item) => {
        //   tempTotal = tempTotal + item["price"]
        // })
      })
  }

  async function getItem() {
    let userId = (localStorage.getItem("userId")).toString();
    try {
      // let itemResponse = await axios.get("http://127.0.0.1:5000/items/1")
      await axios.get("http://127.0.0.1:5000/dangkhoab/cart/" + userId)
        .then(json => {
          let resjson = json.data
          resjson.map((item) => {
            putItem(userId, item["id"])
            deleteItem(userId, item["id"])
          })
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
              resjson.map((item) => {
                // putItem(userId, item["id"])
                // deleteItem(userId, item["id"])
              })
            })
        })
    }
    catch {
    }
  }

  // const actionComplete = (note) => {
  //   // handleInput(true);
  //   setTimeout('', 5000);
  //   alert("Transaction completed");
  // };
  const buttonStyle = {
    /* position: absolute; 
    top: 674px; 
    left: 140px;
    height: 50px; 
    padding: 0 20px;  */
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter", /* Body */
    fontSize: "18px",
    lineHeight: "28px",
    color: "#FFFFFFFF", /* white */
    background: "#FF7700FF", /* primary-500 */
    opacity: "1",
    border: "none",
    borderRadius: "4px", /* border-m */
  }
  return (
    <BackgroundWrapper>
      <NavBarContainer />
      <Container>
        <div className='paymethod'>
          <ThemeProvider theme={appTheme}>

            {/* <h2>Select Payment Method</h2> */}
            <PaymentOptions handleInput={handleInput} />
            <div style={{ display: "flex", justifyContent: "center", alignItems:"flex-end", flexDirection: "column" }}>
              <Bill classname="billTable" />
              {/* <PaymentOptions/> */}
              {/* {paymentOption && (
          <div className='selectedOption'>
            <h6>Selected Option:</h6>
            <p>{paymentOption}</p>
          </div>
        )} */}
              {/* <GetTotal /> */}

              {checkout ?
                <div className='payselect'>
                  <PayDialog className="payD" />
                </div>
                :
                <>
                  <Button style={buttonStyle} variant="contained" color="ochre" onClick={() => {
                    setCheckout(true);
                    getItem()
                  }}>CONFIRM</Button>
                  {/* <Button variant="contained" color="ochre" onClick={actionComplete('')}>CONFIRM</Button> */}
                </>
              }
            </div>
            {/* <Bill classname="billTable"/>
        <Button variant="contained" color="ochre" onClick={() => setCheckout(true)}>CONFIRM</Button> */}
          </ThemeProvider>
        </div>
      </Container>
    </BackgroundWrapper>
  );
};

export default PayMethod;
