import * as React from "react";
import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';

export function SearchInput() {
    const [input, setInput] = useState("")
    const [results, setResults] = useState([])

    const fetchItems = (value) => {
        fetch(`http://127.0.0.1:5000/manhkhang/search?q=${value}`)
            .then(response => response.json())
            .then(results => {
                value ? setResults(results) : setResults([])
            })
    }

    function handleChange(data) {
        setInput(data)
        fetchItems(data)
    }
    return (
        <>
            <Autocomplete
                freeSolo
                inputValue={input}
                onInputChange={(event, newInputValue) => {
                    handleChange(newInputValue)
                }}
                options={results.map(result => ({
                    'item_id': result.id,
                    'item_name': result.item_name
                }))}
                getOptionLabel={option => option.item_name}
                renderOption={(props, option) => {
                    return (
                        <li {...props}>
                            <Button to={`/product/${option.item_id}`} component={Link}>
                                {option.item_name}
                            </Button>
                        </li>
                    )
                }}
                sx={(theme) => ({
                    width: 400,
                    color: 'inherit',
                    '& .MuiInputBase-input': {
                        padding: theme.spacing(1, 1, 1, 0),
                        // vertical padding + font size from searchIcon
                        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                        // transition: theme.transitions.create('width'),
                        width: '100%',
                        [theme.breakpoints.up('sm')]: {
                            width: '40ch',
                            '&:focus': {
                                width: '40ch',
                            },
                        },
                    },
                })}
                renderInput={(params) =>
                    <>

                        <FormControl variant="outlined" sx={{
                            borderRadius: 2, width: "80%",
                            "& .MuiInputBase-root": {
                                height: "80%"
                            },
                        }}>
                            <TextField {...params} placeholder={"Search..."} sx={{ backgroundColor: "white", borderRadius: 1 }} />
                        </FormControl>
                    </>
                }
            />
        </>
    );
}