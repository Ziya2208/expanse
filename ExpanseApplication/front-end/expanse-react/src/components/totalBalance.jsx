import "../index.css";
import axios from 'axios';
import React, {useContext, useEffect} from 'react';
import { appStateContext } from "../store";
import { Card } from "./card";




 

function TotalBalanceComponent() {

    axios.defaults.baseURL = 'http://localhost:8080';

    const appState = useContext(appStateContext)

    useEffect(()=> {
        axios.get('/finances/balance')
        .then(response => {
            appState.setState(prevState =>{
                prevState.totalBalance = response.data;
                return {...prevState}
            })
        })
        .catch(error => {
            console.log(error)
        })
    },[])

    let amountFormatter = Intl.NumberFormat('de-DE', { 
        style: 'currency', 
        currency: 'EUR' })

    return (

        <Card title={'Total Balance'} amount={amountFormatter.format(appState.totalBalance)} imgSrc={"https://cdn-icons-png.flaticon.com/512/2315/2315648.png"}/>
    );
}

export default TotalBalanceComponent;