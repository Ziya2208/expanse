import React, { useEffect, useState, useContext } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import '../App.css';
import { appStateContext } from "../store";

const BarChart = () => {

    const appState = useContext(appStateContext);

    axios.defaults.baseURL = 'http://localhost:8080';

    useEffect(()=> {
        axios.get('/transaction/expenses')
        .then(response => {
            response.data.map(transaction => {
                transactionExpense.push(transaction.amount)
                transactionDates.push(transaction.date)
                return null;
            })
        })
    }, [appState.transactions])
    

    useEffect(()=>{
        axios.get('/transaction/incomes')
                .then(response => {
                    response.data.map(transaction => {
                        transactionIncome.push(transaction.amount)
                        transactionDates.push(transaction.date)
                        return null;
                    })
                })
    }, [appState.transactions])



    const transactionIncome = [];
    const transactionExpense = [];
    const transactionDates = [];

    var totalExpenseOfDay = 0
    var totaleIncomeOfDay = 0

    for (let amount in transactionExpense) {
        totalExpenseOfDay = amount + totalExpenseOfDay
    }

    for (let amount in transactionIncome) {
        totaleIncomeOfDay = amount + totaleIncomeOfDay
    }



    const [basicData] = useState({
        labels: transactionDates,
        datasets: [
            {
                label: 'Income',
                backgroundColor: '#42A5F5',
                data: transactionIncome
            },
            {
                label: 'Expenses',
                backgroundColor: '#FFA726',
                data: transactionExpense
            }
        ]
    }, [appState.transactions]);

    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            //aspectRatio: .8,
            scales: {
                x: {
                    ticks: {
                        color: '#495057',
                        display: false
                    },
                    grid: {
                        color: '#ebedef',
                        display: false,
                    }

                },
                y: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                        display: false
                    }
                }
            }
        }

        return {
            basicOptions,
        }
    }


    const { basicOptions } = getLightTheme();

    return (

        <div>
            <Chart type="bar" data={basicData} options={basicOptions} style={{ height: '250px', width: '530px', marginLeft: '10px', fontFamily: 'Sora', fontWeight: '800px'}} />
        </div>

    )
}

export default BarChart;
