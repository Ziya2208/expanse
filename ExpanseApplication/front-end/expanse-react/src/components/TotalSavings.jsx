import "../App.css";
import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SavingDialog from './../forms/dialogs/savingdialog';
import { Card } from "./card";
import { SavingsCard } from "./savingCard";
 

function TotalSavingComponent() {


    const [saving, setSaving] = useState(0);

    useEffect(()=>{
        axios.get('/savings')
        .then(response =>{
            console.log(response.data)
            setSaving(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    })

    let amountFormatter = Intl.NumberFormat('de-DE', { 
        style: 'currency', 
        currency: 'EUR' })


    const [savingDialog, setSavingDialog] = useState(false);

    const handleOpen = () => {
        setSavingDialog(true);
    };

    const handleClose = () => {
        setSavingDialog(false);
    };


    return (

        <>
        <SavingsCard title={'Total Savings'} amount={amountFormatter.format(saving)} buttonHandler={handleOpen}/>
        <Dialog open={savingDialog} onClose={handleClose} sx={{ minWidth: '1500px' }}>
            <DialogTitle sx={{ marginBottom: '5px' }}>Add/Deduct Saving: </DialogTitle>
            <DialogContent sx={{display: 'inline-block', minWidth: '500px'}} onClose={handleClose} fullWidth maxWidth="xl">
                <SavingDialog onClose={handleClose}/>
            </DialogContent>
        </Dialog>
        </>
    );
}

export default TotalSavingComponent;