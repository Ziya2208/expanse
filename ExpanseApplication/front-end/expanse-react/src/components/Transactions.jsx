import "../App.css";
import React, {useState, useEffect, useContext} from "react";
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import TransactionsInputForm from "./InputTransaction/TransactionInput";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {appStateContext} from '../store';
import { Button, TableRow } from "@mui/material";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Incoming from '../assets/incomemon.jpg';
import Outgoing from '../assets/outgonemono.jpg';


 

function TransactionsComponent() {

    const appState = useContext(appStateContext);

    console.log('appState', appState)

    axios.defaults.baseURL = 'http://localhost:8080';
  

    useEffect(() => {
        axios.get('/transaction')
            .then(response => { 
                appState.setState(prevState => { //anonymous arrow function
                    prevState.transactions = response.data;
                    console.log('rp', response.data);
                    return {...prevState};
                })
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    let amountFormatter = Intl.NumberFormat('de-DE', { 
        style: 'currency', 
        currency: 'EUR' })

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


      const cardStyle = {
        width: '470px',
        height: '253px',
        overflow: 'scroll' 
    }

    const titleStyle = {
        fontFamily: 'Manrope',
        fontWeight: '800',
        fontSize: '22px',
        lineHeight: '16px',
        color: '#050624',
        marginTop: '15px',
        marginLeft: '5px',
        maxWidth: '80px',
        display: 'inline-block'
    }

    const buttonStyle = {
        width: '130px',
        height: '26px',
        background: 'linear-gradient(90deg, #3E79E5 0%, #01B8E3 100%)',
        borderRadius: '10px',
        display: 'inline-block',
        float: 'right',
        marginTop: '15px',
        cursor: 'pointer',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    }

    const buttonTextStyle = {
        fontFamily: 'Sora',
        fontStyle: 'normal',
        fontWeight: '500',
        marginTop: '1px',
        fontSize: '12px',
        lineHeight: '15px',
        textAlign: 'center',
        verticalAlign: 'middle',
        lineHeight: '24px',
        color: 'white'
    }

    const TransactionButton = <div style={buttonStyle} onClick={handleClickOpen}><p style={buttonTextStyle}>Make transaction</p></div>




    return (
        <>
        <div style={cardStyle}>
            <div style={{marginBottom: '15px'}}>
                <h1 style={titleStyle}>Transactions</h1>
                {TransactionButton}
            </div>
            <Table sx={{ minWidth: 471}} aria-label="simple table">
                <TableBody sx={{fontFamily: 'Sora'}}>
                {appState.transactions.map(item => (
                    <TableRow sx={{verticalAlign: 'center'}}>
                        <TableCell align="left" sx={{padding: '0 0 0 0', marginLeft: '5px', fontSize: '16px'}}><p style={{fontWeight: 'bold', marginBottom: '0px', fontFamily: 'Sora'}}>{item.title}</p></TableCell>
                        <TableCell align="left" sx={{fontFamily: 'Sora', marginLeft: '5px', fontSize: '16px'}}>{item.category}</TableCell>
                        <TableCell align="left" sx={{fontFamily: 'Sora', fontSize: '16px'}}><img src={item.transactionType === 'EXPENSE' ? Incoming : Outgoing} alt="incoming" width="28px"></img></TableCell>
                        <TableCell align="left" sx={{fontFamily: 'Sora', fontSize: '12px'}}>{item.date}</TableCell>
                        <TableCell align="left" sx={{fontFamily: 'Sora', fontWeight: 'bold', fontSize: '16px'}}>{item.transactionType === 'EXPENSE' ? '-'+amountFormatter.format(item.amount): '+'+amountFormatter.format(item.amount)}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>

            <Dialog open={open} onClose={handleClose} maxWidth='1500px'>
                <DialogTitle>Add Transaction: </DialogTitle>
                <DialogContent>
                    <TransactionsInputForm onClose={handleClose}/>   
                </DialogContent>
            </Dialog>
        </>
        
    );
}

export default TransactionsComponent;