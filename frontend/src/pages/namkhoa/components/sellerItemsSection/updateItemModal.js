import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UpdateItemFormControl from './updateItemForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UpdateItemModal({categories, itemId, itemName, itemCategory, itemPrice, itemCondition, itemDescription,setItems}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button size="small" onClick={handleOpen}>Learn More</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div style={{width:'320px'}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Item Detail
          </Typography>
          </div>
          <UpdateItemFormControl itemId={itemId} initItemName={itemName} initItemCategory={itemCategory} initItemPrice={itemPrice} initItemCondition={itemCondition} initItemDescription={itemDescription} setItems={setItems} closeModal = {handleClose} categories={categories}/>
        </Box>
      </Modal>
    </div>
  );
}