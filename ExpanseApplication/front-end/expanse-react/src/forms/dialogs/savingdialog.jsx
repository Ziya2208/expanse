import React, {useContext, useState} from 'react';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { appStateContext } from '../../store';
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    flex-direction: row;
`

function SavingDialog({onClose}){

    axios.defaults.baseURL = 'http://localhost:8080';

    const [amount, setAmount] = useState();
    const [type, setType] = useState();
    const appState = useContext(appStateContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === 'Deduct'){
            axios.post(`/savings/deduct?amount=${amount}`)
            .then(response => {
                axios.get('/finances/balance')
                .then(response => {
                    appState.setState(prevState =>{
                        prevState.totalBalance = response.data;
                        return {...prevState}
                    })
                })
            })
            onClose()
        }
        else{
            axios.post(`/savings/add?amount=${amount}`)
            .then(response => {
                axios.get('/finances/balance')
                .then(response => {
                    appState.setState(prevState =>{
                        prevState.totalBalance = response.data;
                        return {...prevState}
                    })
                })
            })
            onClose()
        }
    }



    return (
        <>
        <Form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
            <FormControl>
                <OutlinedInput
                    id="amount"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    startAdornment={<InputAdornment position="start">€</InputAdornment>} />
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <FormControl>
                <Select sx={{minWidth: '140px'}} size="small" id="type" placeholder="Add/Deduct" value={type} onChange={(e) => setType(e.target.value)} fullWidth>
                <MenuItem value="Deduct">Deduct</MenuItem>
                <MenuItem value="Add">Add</MenuItem>
            </Select>
            </FormControl>
            </Grid>
            <Grid xs={12} sm={6} md={4}>
            <FormControl>
            <Button type="submit " variant="contained" color="success" style={{ marginLeft: '10px', marginTop: '15px'}}>
                Submit
            </Button>
            </FormControl>
            </Grid>
            </Grid>
            </Form>
            </> 
    )
}
export default SavingDialog;