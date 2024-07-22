import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom'
export default function ButtonsGroup() {
  const navigate = useNavigate()
  return (
    <Stack direction="row">
      <IconButton
        size="large"
        // aria-label="show more"
        // aria-controls={mobileMenuId}
        // aria-haspopup="true"
        // onClick={handleMobileMenuOpen}
        color="inherit"
      >
        <NotificationsIcon />
      </IconButton>

      <IconButton
        size="large"
        // aria-label="show more"
        // aria-controls={mobileMenuId}
        // aria-haspopup="true"
        // onClick={handleMobileMenuOpen}
        color="inherit"
      >
        <ShoppingCartIcon onClick={() => {
          navigate("/cart")
        }} />
      </IconButton>

    </Stack>
  );
}