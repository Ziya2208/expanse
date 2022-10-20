import React, {useState} from "react";
import CircleIcon from '@mui/icons-material/Circle';
import '../App.css';
import { Button } from "@mui/material";

export function SavingsCard({title, amount, buttonHandler}){

    const [backgroundColor, setBackgoundColor] = useState('#FFFFFF');
    const [textColor, setTextColor] = useState('#A4B4CB');
    const [amountColor, setAmountColor] = useState('#050624');

    const cardStyle = {
        width: '300px',
        height: '140px',
        boxSizing: 'border-box',
        background: backgroundColor,
        borderRadius: '10px',
        border: '0.5px solid #A4B4CB',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    }
    
    const colorChoiceStyle = {
        width: '100px',
        height: '10px',
        marginLeft: '10px',
        marginTop: '5px'
    }
    
    const titleStyle = {
        fontFamily: 'Sora',
        fontStyle: 'normal',
        fontWeight: '600',
        marginLeft: '10px',
        fontSize: '24px',
        lineHeight: '20px',
        color: textColor,
        marginTop: '15px'
    
    }
    
    const rectangleStyle = {
        marginLeft: '10px',
        minWidth: '25px',
        height: '4px',
        marginTop: '4px',
        borderRadius: '5px',
        border: '1px none',
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
        color: amountColor,
        fontSize: '28px', 
        bottom: '0',
        letterSpacing: '0',
        lineHeight: '28.8px',
        whiteSpace: 'nowrap'
    }
    
    const imageStyle = {
        width: '30px',
        height: '30px',
        marginTop: '3px'
    }
    

    const handleChange = (value) =>{
        console.log(backgroundColor);
        if (value !== '#FFFFFF') {
            setBackgoundColor(value);
            setTextColor('#FFFFFF');
            setAmountColor('#FFFFFF')

        }
        if(value === '#FFFFFF') {
            setBackgoundColor("#FFFFFF")
            setTextColor('#A4B4CB');
            setAmountColor('#050624');
        }
    }

    return (
            <div style={cardStyle}>
                <div style={colorChoiceStyle}>
                    <CircleIcon value="#1572A1" sx={{width: '18px', height: '18px', color: '#1572A1', marginRight: '5px'}} onClick={() => handleChange("#1572A1")}/>
                    <CircleIcon value='#5800FF' sx={{width: '18px', height: '18px', color: '#5800FF', marginRight: '5px'}} onClick={() => handleChange("#5800FF")}/>
                    <CircleIcon value='#FFB72B' sx={{width: '18px', height: '18px', color: '#FFB72B', marginRight: '5px'}} onClick={() => handleChange("#FFB72B")}/> 
                    <CircleIcon value='#FFFFFF' sx={{width: '18px', height: '18px', color: '#FFFFFF', marginRight: '5px'}} onClick={() => handleChange("#FFFFFF")}/> 
                </div>
                <div style={textFieldStyle}>
                    <div style={titleStyle}>
                    {title}
                    </div>
                    <div style={rectangleStyle}></div>
                </div>
                <Button style={{float: 'right', marginTop: '25px', fontSize: '15px'}} onClick={buttonHandler}>Add/Deduct</Button>
                <h1 style={amountStyle}>{amount}</h1>
            </div>
    )

}