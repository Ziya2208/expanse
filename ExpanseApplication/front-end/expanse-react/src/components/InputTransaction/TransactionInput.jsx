import "../../App.css";
import React, {useState} from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import { useAppState } from "../../store";
import styled from "styled-components";


const Form = styled.form`
    display: flex;
    flex-direction: row;
`


 

function TransactionsInputForm({onClose}) { //passing props from parent to child  with object distructoring (assignment)


    const appState = useAppState();  //custom Hook !! in /store

    async function getCategories(){
        try{
            return await axios.get('http://localhost:8080/categories')
            .then(response => {
                response.data.map(title => {
                    categoryTitle.push(title.name)
                    return null;
                }
            )})
        }
        catch(err){
            console.log(err)
        }
    }

    getCategories()

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState(null);

    const categoryTitle = [];



    const handleSubmit = (event) => {
        event.preventDefault();
        let urlType;

        if (type === 'Income'){
            urlType = 'addincome';
        }
        else {
            urlType = 'addexpense';
        }
        //localhost:8080/transaction/addincome?title=CapGemini&category=Salary&amount=4300
        axios.put(`http://localhost:8080/transaction/${urlType}?title=${title}&category=${category}&amount=${amount}`)   //Refactor import duplicate as Hooks!!!
        .then(response => {
            axios.get('http://localhost:8080/transaction')
            .then(response => { 
                appState.setState(prevState => { //anonymous arrow function
                    prevState.transactions = response.data;
                    console.log('rp', response.data);
                    return {...prevState};
                })
                onClose()
            })
            .catch(error => {
                console.log(error)
            })
        })
        .then(response => {
            axios.get('http://localhost:8080/transaction/incomesvalue') //promise API (promise.all) multiple requests at once
            .then(response => {
                appState.setState(prevState => {
                    prevState.totalIncome = response.data;
                    return {...prevState};
                })
            })
        })
        .then(response => {
            axios.get('http://localhost:8080/transaction/expensesvalue')
            .then(response => {
                appState.setState(prevState => {
                    prevState.totalExpense = response.data;
                    return {...prevState};
                })
            })
        })
        .then(response => {
            axios.get('http://localhost:8080/categories/four')
            .then(response => {
                appState.setState(prevState => {
                    prevState.pieCategories = response.data;
                    return {...prevState};
                })
            })
        })
        .then(response => {
            axios.get('http://localhost:8080/finances/balance')
            .then(response =>{
                appState.setState(prevState =>{
                    prevState.totalBalance = response.data;
                    return {...prevState}
                })
            })
        })
    }

    


    return (
        <div>
            <Form onSubmit={handleSubmit}>
            <TextField 
            placeholder="Title"
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            margin='normal'
            variant="outlined"
            sx={{minWidth: '120px', maxWidth: '140px', marginRight: '10px', height: '20px'}}
            />
            <FormControl>
            <Autocomplete
                size="small"
                sx={{fontFamily: 'Sora', minWidth: '180px', marginRight: '15px', marginTop: '12px'}}
                value={category}
                onChange={(e, newValue) => { setCategory(newValue); }}
                id="category"
                options={categoryTitle}
                inputValue={category} 
                onInputChange={(event, newInputValue) => {
                    setCategory(newInputValue);
                  }}
                renderInput={(params) => <TextField placeholder="Category" {...params}/>}
                />
            </FormControl>
            <FormControl sx={{marginRight: '15px'}}>
            <Select size="small" id="type" placeholder="Expense" value={type} onChange={(e) => setType(e.target.value)} sx={{marginTop: '12px', minWidth: '140px'}} fullWidth>
            <MenuItem value="Expense">Expense</MenuItem>
            <MenuItem value="Income">Income</MenuItem>
            </Select>
            </FormControl>
            <FormControl sx={{marginRight: '15px'}}>
            <OutlinedInput
                id="amount"
                placeholder="1234"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                sx={{marginTop: '12px', maxWidth: '140px'}}
            />
            </FormControl>
            <Button type="submit" variant="contained" color="success" style={{marginLeft: '10px', marginTop: '12px', maxWidth: '120px'}} >
                Add
            </Button> 
            </Form>
        </div>
    )
}

export default TransactionsInputForm;