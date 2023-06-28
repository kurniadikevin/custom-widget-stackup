import React, { useEffect, useState } from 'react'
 
export default function CryptoPriceWidget() {
   
const [data,setData]= useState([])


const fetchTop10Coin=async()=>{
    console.log('fetch')
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
    const params = {
      vs_currency: 'usd', // Set Price in Usd
      order: 'market_cap_desc',  // Order the results by market capitalization in descending order
      per_page: 10,  // Set the number of results to 10
      page: 1,
      sparkline: false,
      price_change_percentage: '24h',
      locale: 'en'
    };
    const queryParams = new URLSearchParams(params).toString();
    const url = `${apiUrl}?${queryParams}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        console.log(data);

      } catch (error) {
        console.error('Error:', error);
      }
}

const displayData=()=>{
    {data.map((item)=>{
        return(
            <div>
                <div>
                    <a style={{fontWeight : 800}}>{item.symbol.toUpperCase()}</a>/USD
                </div>
                <div style={{ color : '#efaeae'}}>
                    {item.current_price}({item.price_change_percentage_24h.toFixed(2)}%)
                </div>
            </div>
        )
    })}
}


useEffect(()=>{
    fetchTop10Coin()
},[])
  return (
    <div  style={{ minWidth: 300 }}>
       <div>Crypto Price</div>
        <div>{data.length > 0 ? displayData : 'Loading data...'}</div>
    </div>
  )
}