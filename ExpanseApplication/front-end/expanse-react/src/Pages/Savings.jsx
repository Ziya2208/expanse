import { Box, Grid } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import Sidebar from '../components/Sidebar';
import GoalProgressLine from '../SavingsComponents/Addgoal';
import { appStateContext } from '../store';




const pageTitle = {
    top: '70px', 
    left: '150px',
    fontFamily: 'Sora',
    fontWeight: '800',
    fontSize: '38px',
    lineHeight: '40px',
    color: '#A4B4CB',
    position: 'absolute'
}

const inputForm = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '24px',
    gap: '29px',
    position: 'absolute',
    height: '251px',
    left: '210px',
    right: '268px',
    top: '119px'
}

const inputField = {
    padding: '0px 0px 0px 14px',
    height: '50px',
    borderRadius: '8px',
    border: '0.5px solid #E2E8F0',
    marginTop: '10px',
    width: '250px'
}

const labelStyle = {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: 800,
    fontSize: '22px',
    lineHeight: '150%'
}

const buttonStyle = {
    width: '180px',
    height: '40px',
    background: 'linear-gradient(90deg, #3E79E5 0%, #01B8E3 100%)',
    borderRadius: '10px',
    display: 'inline-block',
    float: 'right',
    marginTop: '5px',
    cursor: 'pointer',
    boxShadow: '0px 0px 1px rgba(217, 217, 217, 0.06)',
    fontFamily: 'Sora',
    fontStyle: 'normal',
    fontWeight: '600',
    marginTop: '1px',
    fontSize: '14px',
    lineHeight: '15px',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '24px',
    color: 'white',
    border: '0'
}

const goalsCatdStyle = {
    position: 'absolute',
    height: '320px',
    left: '237px',
    right: '629px',
    top: '381px',
    background: 'linear-gradient(0deg, #B9D0F1, #B9D0F1), linear-gradient(180deg, rgba(240, 240, 240, 0.2) 0%, rgba(240, 240, 240, 0) 100%)',
    boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
    borderRadius: '10px',
    width: '543px',
    height: '320px',
    left: '237px',
    top: '481px',
    float: 'left'
}

const goalsProgressStyle = {
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(180deg, rgba(240, 240, 240, 0.2) 0%, rgba(240, 240, 240, 0) 100%)',
    height: '250px',
    horizontalAlign: 'center',
    overflow: 'scroll',
    width: '90%',
    margin: 'auto',
    borderRadius: '10px'
}

const cardStyle = {
    position: 'absolute',
    width: '347px',
    height: '140px',
    left: '850px',
    top: '481px',
    boxSizing: 'border-box',
    background: 'linear-gradient(0deg, #3E79E5, #3E79E5), linear-gradient(90deg, rgba(240, 240, 240, 0.2) 0%, rgba(240, 240, 240, 0) 100%)',
    borderRadius: '10px',
    border: '0.5px solid #A4B4CB',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
}

const titleStyle = {
    fontFamily: 'Sora',
    fontStyle: 'normal',
    fontWeight: '600',
    marginLeft: '10px',
    fontSize: '28px',
    lineHeight: '35px',
    color: '#FFFFFF',
    marginTop: '15px'
}

const rectangleStyle = {
    marginLeft: '10px',
    minWidth: '65px',
    height: '4px',
    marginTop: '4px',
    borderRadius: '5px',
    background: 'linear-gradient(77.34deg, #36D9FF 6.16%, #4A00C5 94.12%)'
}

const textFieldStyle = {
    display: 'flex',
    marginTop: '14px',
    flexDirection: 'column',
    width: 'fit-content',
    alignItems: 'flex-start',
    border: '1px none'
}

const amountStyle = {
    marginLeft: '10px',
    marginTop: '25px',
    opacity: '0.8',
    fontFamily: 'Manrope',
    fontWeight: '800',
    color: '#FFFFFF',
    fontSize: '28px', 
    bottom: '0',
    letterSpacing: '0',
    lineHeight: '28.8px',
    whiteSpace: 'nowrap'
}

const buttonAddSavingStyle = {
    width: '100px',
    height: '30px',
    background: 'linear-gradient(90deg, #01B8E3 0%, #D3E1F5 100%)',
    borderRadius: '10px',
    display: 'inline-block',
    float: 'right',
    marginTop: '15px',
    cursor: 'pointer',
    marginRight: '15px',
    marginTop: '20px'
}

const buttonTextStyle = {
    fontFamily: 'Sora',
    fontStyle: 'normal',
    fontWeight: '700',
    marginTop: '1px',
    fontSize: '16px',
    lineHeight: '15px',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '24px',
    color: '#FFFFFF',
    paddingTop: '2px'
}


function SavingsPage(){

    axios.defaults.baseURL = 'http://localhost:8080';


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
    }, [])

    const [goals, setGoals] = useState([]);

    useEffect(() => {
        axios.get('/savings/saving-goals')
        .then(response => {
            console.log(response.data)
            setGoals(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

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

    const appState = useContext(appStateContext);


    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState();
    const [date, setDate] = useState('');



    const handleSubmit = (event) => {
        axios.post('/savings/saving-goals', {title: title,  date: date, amount: amount});
    }

    let amountFormatter = Intl.NumberFormat('de-DE', { 
        style: 'currency', 
        currency: 'EUR' })

    return (
        <>
        <h1 style={pageTitle}>GOALS</h1>
        <div style={inputForm}>
            <h1 style={{fontFamily: 'Manrope', fontWeight: '800', fontSize: '32px', lineHeight: '137%'}}>Time for a goal:</h1>
            
            <form id="goalform" style={{marginTop: '20px'}} onSubmit={handleSubmit}>
            <Grid container rowSpacing={5} spacing={10}>
                <Grid item md={4}>
                <label style={labelStyle}>Your goal:</label><br></br>
                <input style={inputField} type="text" id="goal-name" placeholder="Vacation (example)" onChange={(e) => setTitle(e.target.value)}></input>
                </Grid>
                <Grid item md={4}>
                <label style={labelStyle}>Amount:</label><br></br>
                <input style={inputField} type="number" id="goal-amount" placeholder="EUR" onChange={(e) => setAmount(e.target.value)}></input>
                </Grid>
                <Grid item md={4}>
                <label style={labelStyle}>Deadline:</label><br></br>
                <input style={inputField} type="date" id="goal-deadline" onChange={(e) => setDate(e.target.value)}></input>
                </Grid>
                <Grid item md={12}>
                <input style={buttonStyle} type="submit" value='Add Goal'></input>
                </Grid>
            </Grid>
            </form>
            </div>

            <div style={goalsCatdStyle}>
                <h1 style={{
                    fontFamily: 'Manrope',
                    fontWeight: 800,
                    fontSize: '22px',
                    lineHeight: '137%',
                    color: 'white',
                    marginTop: '10px',
                    marginLeft: '20px'
                }}>Your Goals:</h1>
                <div style={goalsProgressStyle}>
                <Box sx={{ width: '100%'}}>
                    {goals.map(goal =>(
                    <GoalProgressLine name={goal.title} value={parseInt(saving) / parseInt(goal.amount) * 100} />
                    ))}
                </Box>
                </div>
            </div>
            <div style={cardStyle}>
                <div style={textFieldStyle}>
                    <div style={titleStyle}>
                    Total Balance
                    </div>
                    <div style={rectangleStyle}></div>
                </div>
                <h1 style={amountStyle}>{amountFormatter.format(appState.totalBalance)}</h1>
            </div>
            <div style={{
                position: 'absolute',
                width: '347px',
                left: '850px',
                top: '661px',
                maxHeight: '140px',
                boxSizing: 'border-box',
                background: 'linear-gradient(0deg, #3E79E5, #3E79E5), linear-gradient(90deg, rgba(240, 240, 240, 0.2) 0%, rgba(240, 240, 240, 0) 100%)',
                borderRadius: '10px',
                border: '0.5px solid #A4B4CB',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
            }}>
                <div style={textFieldStyle}>
                    <div style={titleStyle}>
                    Total Savings
                    </div>
                    <div style={rectangleStyle}></div>
                </div>
                <div style={buttonAddSavingStyle}> <p style={buttonTextStyle}>Add</p></div>
                <h1 style={amountStyle}>{amountFormatter.format(saving)}</h1>
            </div>
            
            
        </>
    )
};
export default SavingsPage;