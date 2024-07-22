import * as React from 'react';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { selectClasses } from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

export default function UpdateItemFormControl({ closeModal, categories, itemId, initItemName, initItemCategory, initItemPrice, initItemCondition, initItemDescription, setItems }) {
  const menuItems = categories ? categories.map((category, index) => {
    return (
      <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
    )
  }) : [];

  const [itemName, setItemName] = React.useState(initItemName);
  const [itemCategory, setItemCategory] = React.useState(initItemCategory);
  const [itemCondition, setItemCondition] = React.useState(initItemCondition);
  const [itemDescription, setItemDescription] = React.useState(initItemDescription);
  const [itemPrice, setItemPrice] = React.useState(initItemPrice);


  const submitFormHandler = async (event) => {
    console.log(itemName)
    console.log(itemCategory)
    console.log(itemCondition)
    console.log(itemDescription)
    console.log(itemPrice)

    const data = {
      "item_name": itemName,
      "category_id": itemCategory,
      "condition": itemCondition,
      "description": itemDescription,
      "price": itemPrice,
      "seller_id": localStorage.getItem('userId') ?? 1
    }
    try {
      const response = await fetch('http://127.0.0.1:5000/namkhoa/items/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      toast.success("Add item successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })

      closeModal()

      setItems([])

    }
    catch (error) {
      console.log(error)
    }

  };

  const handleNameChange = (event) => {
    setItemName(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setItemCategory(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setItemDescription(event.target.value);
  };
  const handlePriceChange = (event) => {
    setItemPrice(event.target.value);
  };


  return (
    <form style={{ width: '320px' }}>
      <FormControl defaultValue={itemName} required>
        <Label>Item Name</Label>
        <StyledInput placeholder="The name of the item to be displayed"
          value={itemName}
          onChange={handleNameChange}
        />
        <HelperText />
      </FormControl>

      <FormControl required>
        <Label>Category</Label>
        <StyledSelect
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={itemCategory}
          onChange={handleCategoryChange}
        >
          {menuItems}
        </StyledSelect>
        <HelperText />
      </FormControl>

      <FormControl defaultValue={itemCondition} required>
        <Label>Condition(self-estimate)</Label>
        <Rating
          name="simple-controlled"
          value={itemCondition}
          onChange={(event, newValue) => {
            setItemCondition(newValue);
          }}
        />
        <HelperText />
      </FormControl>

      <FormControl defaultValue={itemPrice} required>
        <Label>Price($)</Label>
        <StyledInput placeholder="Ex:80"
          value={itemPrice}
          onChange={handlePriceChange}
        />
        <HelperText />
      </FormControl>

      <FormControl defaultValue={itemDescription} required>
        <Label>Description</Label>
        <StyledInput placeholder="Add your note"
          value={itemDescription}
          onChange={handleDescriptionChange}
        />
        <HelperText />
      </FormControl>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 10px', width: '320px' }}>
        <Button size="medium" variant="contained"
          onClick={submitFormHandler}
        >Submit</Button>
      </div>
    </form>

  );
}

const StyledInput = styled(Input)(
  ({ theme }) => `

  .${inputClasses.input} {
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  }
`,
);

const StyledSelect = styled(Select)(({ theme }) => ({

  width: '344px',
  height: '39px',
  fontFamily: 'IBM Plex Sans, sans-serif',
  fontSize: '0.875rem',
  fontWeight: '400',
  lineHeight: '1.5',
  padding: '8px 12px',
  borderRadius: '8px',
  color: `${theme.palette.mode === 'dark' ? grey[300] : grey[900]}`,
  background: `${theme.palette.mode === 'dark' ? grey[900] : '#fff'}`,
  border: `1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]}`,
  boxShadow: `0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]}`
}));

const Label = styled(({ children, className }) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
      {children}
      {required ? ' *' : ''}
    </p>
  );
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};
