import React, { useContext } from 'react'
import { TrendingContext } from '../context/TrendingContext'
import { Outlet, useNavigate } from 'react-router-dom'


const Trending = () => {

  let navigate = useNavigate();

  const getCoinDetails = (id) => {
    navigate(id)
  }
  
  const {trendingData} = useContext(TrendingContext)
  console.log("trending", trendingData)

  return (<section className='hidden md:block w-[90%] h-full flex flex-col items-center md:flex-wrap mt-16 mb-24 relative border rounded-lg p-10' >
        <div
        
        className="border w-[95%] bg-gray-100 flex flex-col items-center md:flex-wrap justify-center gap-[10%] rounded-lg p-6 m-5 bg-opacity-35">
         {
          trendingData && trendingData.map((data) => {
            return (
            <div
            key={data.name}
            onClick={ () =>{getCoinDetails(data.item.id)}}
            className="bg-gray-300 md:p-[3%] p-5  md:w-[100%] w-2.5 flex  md:gap-[25%] hover:bg-gray-200 cursor-pointer rounded-md" style={{marginBottom: "1%", width: "45%"}}>
              <div className="">
            <div className=''> Name : <span className="text-cyan">{data.item.name}</span> </div>
            <div> Symbol : <span className="text-cyan">{data.item.symbol}</span></div>
            <div> Price : <span className="text-cyan">{(data.item.data.price).toFixed(2)}</span></div>
          </div>
            <img className='hidden md:block' src={data.item.thumb} alt={data.item.name} />
            </div>)
          })
         }
        </div>
        <Outlet />
      </section>
    )}
  
    


export default Trending