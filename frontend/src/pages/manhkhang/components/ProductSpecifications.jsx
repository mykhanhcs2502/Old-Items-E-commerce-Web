import React, { useState, useEffect } from 'react';
import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import { styled } from '@mui/system';
import Button from "@mui/material/Button";
import Grid from "@mui/system/Unstable_Grid";
import { Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import axios from 'axios';


export default function ProductSpecifications({ id, name, price, category, condition, description, userId }) {
    async function addToCart() {
        await axios.post(`http://127.0.0.1:5000/dangkhoab/cart/${userId}/${id}`)
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
                <Typography variant={"h3"}>{name}</Typography>
                <Stack direction={"row"} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant={"h6"}>${price}</Typography>
                </Stack>
                <Button onClick={addToCart} variant="outlined">Add to cart</Button>
                <Button variant="contained">Buy now</Button>
                <hr />
                {/*Item info*/}
                <Stack direction={"row"} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant={"h4"}>
                        Condition
                    </Typography>
                    <Rating readOnly
                        value={condition && condition >= 1 && condition <= 5 ? condition : 5}
                    />
                </Stack>
                <Stack direction={"row"} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant={"h4"}>
                        Category
                    </Typography>
                    <Typography variant={"h6"}>{category}</Typography>
                </Stack>
                {/*End of Item info*/}
                {/*  Description  */}
                <Typography variant={"h3"}>Description</Typography>
                <Typography variant={"body1"}>
                    {description}
                </Typography>
                {/*  End of Description  */}
            </Stack>
        </Box>
    );
}