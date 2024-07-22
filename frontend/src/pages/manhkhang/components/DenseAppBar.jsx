import React, {useEffect, useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";

export default function DenseAppBar() {
    const [categories,setCategories] = useState([])

    useEffect(()=>{
        const fetchCategories = async()=>{
            const data = await fetch('http://127.0.0.1:5000/namkhoa/categories')
            const json = await data.json();
            setCategories(json);
        }
        fetchCategories().catch(console.error);
    },[])
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ background: "white" }}>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="black" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    {categories.map(category => < Typography
                        key={category.id}
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                        mr: 2,
                        display: {xs: 'none', md: 'flex'},
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'black',
                        textDecoration: 'none',
                    }}
                        >
                            <Link style={{textDecoration: 'none'}} to={`/manhkhang/categories/${category.id}`} >
                                {category.name} {/* Display the fetched category or 'LOGO' if not available */}
                            </Link>
                        </Typography>)}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
