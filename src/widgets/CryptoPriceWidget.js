import React, { useEffect, useState } from 'react'
 
export default function CryptoPriceWidget() {
   
const [data,setData]= useState([])


const fetchTop10Coin=async()=>{
    const apiUrl = 'https://api.coincap.io/v2/assets';
    const params = {
      limit : 10,
      sort: 'rank'
    };
    const queryParams = new URLSearchParams(params).toString();
    const url = `${apiUrl}?${queryParams}`;
    const apiKey= process.env.REACT_APP_COINAPIKEY
    const headers = {
        'Authorization': `Bearer ${apiKey}`
      };
    try {
        const response = await fetch(url,{headers});
        const data = await response.json();
        setData(data.data);
        console.log(data.data)
      } catch (error) {
        console.error('Error:', error);
      }
}

const convertToNumberDecimal=(input)=>{
    const num= Number(input);
    return num.toFixed(2)
}


/* useEffect(()=>{
    fetchTop10Coin()
},[]) */

useEffect(()=>{
    const interval = setInterval(() => {
        fetchTop10Coin()
      }, 5000);
      return () =>{
         clearInterval(interval);
        }
},[])


  return (
    <div  style={{ minWidth: 300 }}>
       <div>Crypto Price</div>
       {data.map((item)=>{
        return(
            <div>
                <div>
                    <a style={{fontWeight : 800}}>{item.symbol.toUpperCase()}</a>/USD
                </div>
                <div id='price-percent' style={{ color : '#efaeae'}}>
                    {convertToNumberDecimal(item.priceUsd)}
                    ({convertToNumberDecimal(item.changePercent24Hr)}%)
                </div>
            </div>
        )
    })}
    </div>
  )
}