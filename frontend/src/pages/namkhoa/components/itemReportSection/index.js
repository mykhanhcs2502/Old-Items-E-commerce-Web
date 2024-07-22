import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import { useState, useEffect } from 'react';
import CircularIndeterminate from './circularLoadingComponent';
import { PieChart } from './pieChart';

const CustomizedPaper = styled(Paper)(({ theme }) => ({
    width: 'calc(100% - 52px)',
    margin: theme.spacing(1, 0),
    padding: theme.spacing(2, 2)
}));

function ItemReportSection() {

    const [items, setItems] = useState([])
    // const [categories, setCategories] = useState([])

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         const data = await fetch('http://localhost:5000/namkhoa/categories')
    //         const json = await data.json();
    //         setCategories(json);
    //     }

    //     fetchCategories().catch(console.error);
    // }, [])

    useEffect(() => {
        const fetchItems = async () => {
            const data = await fetch('http://localhost:5000/namkhoa/items')
            const json = await data.json();
            setItems(json);
        }

        fetchItems().catch(console.error);
    }, [items.length])


    const itemList = items ?? [1, 2, 3, 4, 5, 6]
    const numberOfAvailableItems = itemList.filter((item) => item.buyer_id == null).length
    const numberOfSoldItems = itemList.filter((item) => item.buyer_id != null).length

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CustomizedPaper>
                <div style={{ border: '1px' }}>
                    <Typography gutterBottom={true}>MY STORE REPORT</Typography>
                    {items.length > 0  ?
                        (
                            <div style={{ display: 'flex', gap: '10px 30px', justifyContent: 'space-evenly', alignContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                                <PieChart numberOfAvailableItems={numberOfAvailableItems} numberOfSoldItems={numberOfSoldItems} />
                            </div>
                        ) :
                        <CircularIndeterminate />
                    }
                </div>
            </CustomizedPaper>
        </div>
    );
}

export default ItemReportSection;