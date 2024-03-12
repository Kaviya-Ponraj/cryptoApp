import React, { useContext, useLayoutEffect, useState } from 'react'

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { CryptoContext } from '../context/CryptoContext';

function CustomTooltip({ payload, label, active, currency = "usd" }) {
    if (active && payload && payload.length>0) {
      return (
        <div className="custom-tooltip text-cyan text-sm">
          <p className="label">{`${label} : ${
             new Intl.NumberFormat("En-In", {
                style : "currency",
                currency : currency,
                minimumFractionDigits : 6
              }).format(  payload[0].value)
           }`}</p>
          
          
        </div>
      );
    }
  
    return null;
  }

const ChartComponent = ({data, currency, type}) => {
    
    return(
        <ResponsiveContainer  height="90%">
            <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey={type} stroke="#14ffec" strokeWidth={"2px"}/>
                <XAxis dataKey="date" hide/>
                <YAxis dataKey={type} hide domain={["auto", "auto"]}/>
                <Tooltip content={<CustomTooltip />} currency= {currency} cursor={false} wrapperStyle={{oiutline : "none"}}/>
                <CartesianGrid stroke="#323232"  />
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    )
    };

const Chart = ({id}) => {

    const [chartdata, setchartData] = useState()

    const {currency} = useContext(CryptoContext)

    const [type, setType] = useState("prices")

    const [days, setDays] = useState(7)

    useLayoutEffect(() => {
        const getChartData = async (id) => {
            try{
                const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`).then((res) => res.json()).then(json => json)
        
                console.log("chart data",data);

                let convertedData = data[type].map((item) => {
                    return {
                        date : new Date(item[0]).toLocaleDateString(),
                        [type] : item[1]
                    }
                })
                
                console.log("date and price",convertedData);

                setchartData(convertedData)
            }
            catch(error) {
                console.log(error);
            }
        } 

        getChartData(id)
    }, [id, type, days])

    

  return (
    <>
    <div className='w-[full] h-[60%]'>
        <ChartComponent 
        data = {chartdata}
        currency = {currency}
        type = {type}
        />

        <div className="flex">
          <button className={`text-sm px-2 py-1 ml-2 bg-opacity-25 rounded capitalize ${type === "prices" ? `text-cyan bg-cyan` : `bg-gray-100`}`} onClick={() => setType("prices")}>Prices</button>
          <button className={`text-sm px-2 py-1 ml-2 bg-opacity-25 rounded capitalize ${type === "market_caps" ? `text-cyan bg-cyan` : `bg-gray-100`}`} onClick={() => setType("market_caps")}>Market Cap</button>
          <button className={`text-sm px-2 py-1 ml-2 bg-opacity-25 rounded capitalize ${type === "total_volumes" ? `text-cyan bg-cyan` : `bg-gray-100`}`} onClick={() => setType("total_volumes")}>Total Volume</button>
        
         <button className={`text-sm px-2 py-1 ml-2 bg-opacity-25 rounded capitalize ${days === 7 ? `text-cyan bg-cyan` : `bg-gray-100`}`} onClick={() => setDays(7)}>7d</button>
          <button className={`text-sm px-2 py-1 ml-2 bg-opacity-25 rounded capitalize ${days === 14 ? `text-cyan bg-cyan` : `bg-gray-100`}`} onClick={() => setDays(14)}>14d</button>
          <button className={`text-sm px-2 py-1 ml-2 bg-opacity-25 rounded capitalize ${days === 30 ? `text-cyan bg-cyan` : `bg-gray-100`}`} onClick={() => setDays(30)}>30d</button>
        </div>
    </div>
    </>
  )
}

export default Chart