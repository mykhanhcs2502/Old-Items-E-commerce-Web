import Dialog from '@mui/material/Dialog';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
const ModalView = (props) => {
    const handleClose = props.handleClose
    const open = props.open
    const item = props.item
    const theme = useTheme()
    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>{item.item_name}</DialogTitle>
                <DialogContent>
                    <img
                        src={`${item.images[0].image_url}`}
                        width={500}
                        style={{
                            border: `1px solid ${theme.palette.grey[200]}`,
                            borderRadius: "8px"
                        }}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ModalView