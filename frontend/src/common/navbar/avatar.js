import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import StoreIcon from '@mui/icons-material/Store';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Link, useNavigate } from 'react-router-dom';
// const StyledStackWrapper = styled(Stack)(({ theme }) => ({
//     position: 'absolute',
//     right: '0px',
//     padding: theme.spacing(0, 2)
//   }));

const StyledTypography = styled(Typography)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function BackgroundLetterAvatar() {
  var myUserName = localStorage.getItem('userName') ?? "Default User Name";
  let userId = localStorage.getItem('userId') ?? 1;
  const navigate = useNavigate()
  console.log(localStorage.getItem('userName')[0])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack direction="row" spacing={2}>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
      >
        <Avatar>{myUserName[0]}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => { navigate(`/mystore`) }}>
          <ListItemIcon>
            <StoreIcon fontSize="small" />
          </ListItemIcon>
          My Store
        </MenuItem>
        <MenuItem onClick={() => { navigate(`/user/${userId}/orders`) }}>
          <ListItemIcon>
            <ReceiptLongIcon fontSize="small" />
          </ListItemIcon>
          My Orders
        </MenuItem>
      </Menu>
      <StyledTypography
        align='center'
        noWrap
        component="div"
      >
        {myUserName}
      </StyledTypography>
    </Stack>
  );
}