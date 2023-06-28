import React, { useEffect, useState } from 'react'
 
export default function CryptoPriceWidget() {
   
const [data,setData]= useState([]);
const [prevData,setPrevData]= useState([]);


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

// conver to two decimal
const convertToNumberDecimal=(input)=>{
    const num= Number(input);
    return num.toFixed(2)
}

const changeTextColor=(index)=>{
    const pricePercents= document.querySelectorAll('#price');
    if(prevData.length > 0 && data.length > 0){
        if(prevData[index].priceUsd > data[index].priceUsd){
            pricePercents[index].style.color='#F48CA0';
        } else if(prevData[index].priceUsd < data[index].priceUsd){
            pricePercents[index].style.color='#44D75F';
        }
    }
}

//change color percent for negative and positive
const changePercentColor=(value)=>{
   return value < 0 ? '#F48CA0' : '#44D75F'
}


useEffect(()=>{
    fetchTop10Coin();
    const interval = setInterval(() => {
        fetchTop10Coin();
      }, 3000);
      return () =>{
         clearInterval(interval);
        }
},[])

useEffect(() => {
   // assign data to prev data before data changes
    setPrevData(data);
  }, [data]);

  return (
    <div  style={{ minWidth: 300 }}>
       <div style={{fontWeight: 900, paddingBottom: 10}}>
        CRYPTO PRICE
      </div>
       {data.map((item,index)=>{
        changeTextColor(index);
        return(
            <div style={{paddingBottom : 5}}>
                <div>
                    <a style={{fontWeight : 800}}>{item.symbol.toUpperCase()}</a>/USD
                </div>
                <div style={{display: 'flex', gap: 5}}>
                    <div id='price' style={{ color : '#efaeae', fontWeight: 900}}>
                        ${convertToNumberDecimal(item.priceUsd)}
                    </div>
                    <div style={{
                         color : changePercentColor(convertToNumberDecimal(item.changePercent24Hr))
                         }}>
                        ({convertToNumberDecimal(item.changePercent24Hr)}%)
                    </div>
                </div>
            </div>
        )
    })}
    </div>
  )
}