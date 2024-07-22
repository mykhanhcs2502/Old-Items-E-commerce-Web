import * as React from 'react';
import {alpha, styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import {styled as style} from 'styled-components';
import Stack from '@mui/material/Stack';
import BackgroundLetterAvatar from './avatar';
import ButtonsGroup from './buttonsGroup';
import * as PropTypes from "prop-types";
import {SearchInput} from "./searchInput";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const AppBrand = style.div`
    width: 50px;
    height: 50px;
    background-image : url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt0NRLZBfcN8f-esNFfykWi2I7-lnInbuqxWR6wHP2-fuiPFfJSDBblKcp2JGelAoY2fA&usqp=CAU"); 
    background-position : center;
    background-repeat : no-repeat;
    background-size :contain;  
`

const StyledStackWrapper = styled(Stack)(({theme}) => ({
    position: 'absolute',
    right: '0px',
    padding: theme.spacing(0, 2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}));

// const StyledTypography = styled(Typography)(({ theme }) => ({
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center'
// }));

SearchInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};
export default function SearchAppBar() {

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Paper>
                        <AppBrand className="appbrand">
                        </AppBrand>
                    </Paper>
                    <Search>
                        <SearchIconWrapper>
                            <SearchInput/>
                        </SearchIconWrapper>
                    </Search>
                    <StyledStackWrapper direction="row" spacing={2}>
                        <BackgroundLetterAvatar/>
                        <ButtonsGroup/>
                    </StyledStackWrapper>
                </Toolbar>
            </AppBar>
        </Box>
    );
}