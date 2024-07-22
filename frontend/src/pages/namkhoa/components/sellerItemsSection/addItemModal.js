import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddItemFormControl from './addItemForm';
import { DialogContent, Dialog } from '@mui/material';

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

export default function AddItemModal({ categories, items, setItems }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <AddCircleOutlineIcon color="primary" />
        Add Item
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogContent>
          <div style={{ width: '320px' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Item
            </Typography>
          </div>
          {/* Can add a delete mark here */}
          <AddItemFormControl items={items} setItems={setItems} closeModal={handleClose} categories={categories} />
        </DialogContent>
      </Dialog>
    </div>
  );
}