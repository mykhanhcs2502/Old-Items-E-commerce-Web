import * as React from 'react';
import FeedbackCard from "./Shop/FeedbackCard";
import ProductCard from "./Shop/ProductCard";
import ShopCard from "./Shop/ShopCard"
import BackgroundWrapper from "../../common/backgroundWrapper";
import NavBarContainer from "../../common/navbar";
import {
  Typography,
  Container,
  Grid
} from "@mui/material"
import axios from 'axios';
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import './shop.css'

export default function ShopUI() {
  const [shopInf, setShopInf] = useState(null)
  const [items, setItems] = useState(null)
  const [reviews, setReviews] = useState(null)

  let { userId } = useParams()

  console.log(localStorage.getItem('userId'))

  let user_id = parseInt(userId)

  // let userId = localStorage.getItem('userId') ?? 1;

  async function getShop() {
    try {
      let shop_inf = await axios.get(`http://127.0.0.1:5000/mykhanh/get_inf/${user_id}`)
      let items = await axios.get(`http://127.0.0.1:5000/mykhanh/items/${user_id}`)
      let reviews = await axios.get(`http://127.0.0.1:5000/mykhanh/reviews/${user_id}`)
      console.log("Shop Info:", shop_inf.data);
      console.log("Items:", items.data);

      setShopInf(shop_inf.data);
      setItems(items.data);
      setReviews(reviews.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getShop()
  }, [])

  return (
    <React.Fragment>
      <NavBarContainer></NavBarContainer>
      <div className='shopUI'>
        <BackgroundWrapper>
          <Container>

            <div className='shopinf' s>
              {shopInf && <ShopCard {...shopInf} />}
            </div>
            <Typography variant="h3" sx={{ mb: 2 }}>Selling items</Typography>
            <Grid container spacing={4}>
              {items && Array.isArray(items) ? (
                items.map((item) =>
                  <Grid item md={3}>
                    <ProductCard key={item.id} {...item} className="product-card" />
                  </Grid>
                )
              ) : (
                <p>No items available</p>
              )}
            </Grid>
            <Typography variant="h4" sx={{ mt: 2 }}>Comments</Typography>
            <div className='feedbacks'>
              {reviews && reviews.map((review) => <FeedbackCard key={review.id} {...review} />)}
            </div>
          </Container>
        </BackgroundWrapper>
      </div>
    </React.Fragment>
  );
}