import { Box } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const GigaCardBody = (props) => {
    const theme = useTheme()
    const isMd = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <Box sx={{ padding: isMd ? 2 : 2, height: "100%", width: "100%" }}>
            {props.children}
        </Box>
    )
}

export default GigaCardBody