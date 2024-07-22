import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import ItemCard from './itemCard';
import AddItemModal from './addItemModal';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularIndeterminate from './circularLoadingComponent';

const CustomizedPaper = styled(Paper)(({ theme }) => ({
  width: 'calc(100% - 52px)',
  margin: theme.spacing(1, 0),
  padding: theme.spacing(2, 2)
}));

function SellerItemsSection() {

  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetch('http://127.0.0.1:5000/namkhoa/categories')
      const json = await data.json();
      setCategories(json);
    }


    fetchCategories().catch(console.error);
  }, [])

  useEffect(() => {
    const fetchItems = async () => {
      const data = await fetch('http://127.0.0.1:5000/namkhoa/items')
      const json = await data.json();
      setItems(json);
    }

    fetchItems().catch(console.error);
  }, [items.length])


  const deleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/namkhoa/items/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const newItemList = [...items].filter((item) => item.id !== itemId)
      setItems(newItemList)

      toast.success("Delete item successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
    catch (error) {
      console.log(error)
    }

  };

  const itemList = items ?? [1, 2, 3, 4, 5, 6]
  const itemsToDisplay = itemList.map((item, index) => {
    const itemCategory = categories.filter((category) => category.id == item.category_id)[0]?.name ?? null

    return (
      <ItemCard
        key={item.id}
        categories={categories}
        itemId={item.id}
        itemCategory={itemCategory}
        itemName={item.item_name}
        itemPrice={item.price}
        itemCondition={item.condition}
        itemDescription={item.description}
        isBoughtItem={item.buyer_id != null}
        deleteItem={deleteItem}
        itemImage={item.item_images['py/seq'][0].url}
      />
    )
  })

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ToastContainer />
      <CustomizedPaper>
        <div style={{ border: '1px' }}>
          <Typography gutterBottom={true}>MY STORE ITEMS</Typography>
          {items.length > 0 && categories.length > 0 ?
            (
              <div>
                <AddItemModal categories={categories} items={items} setItems={setItems} />
                <div style={{ display: 'flex', gap: '10px 30px', justifyContent: 'space-evenly', alignContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                  {itemsToDisplay}
                </div>
              </div>
            ) : <CircularIndeterminate />
          }
        </div>
      </CustomizedPaper>
    </div>
  );
}

export default SellerItemsSection;