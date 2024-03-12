

import { createContext, useEffect,  useState } from "react";


// create context object

export const TrendingContext = createContext()

// create a context provider

export const TrendingProvider = ({children}) => {

//    const [cryptoData, setCryptoData] = useState()
//    const [searchResult, setSearchResult] = useState()
//    const [coinSearch, setCoinSearch] = useState("")

//    const [currency, setCurrency] = useState("usd")

//    const [sortBy, setSortby] = useState("market_cap_asc")

//    const [page, setpage] = useState(1)

//    const [totalPages, setTotalPages] = useState(250)

//    const [perPage, setPerPage] = useState(10)

//    const [coinData, setCoinData] = useState()

    const [trendingData, setTrendingData] = useState()

   const getTrendingData = async () => {

    try{
        const data = await fetch(`https://api.coingecko.com/api/v3/search/trending`).then((res) => res.json()).then(json => json)

        // console.log("trending data",data);
        setTrendingData(data.coins)
    }
    catch(error) {
        console.log(error);
    }
   }

  
   

   useEffect(() => {
    getTrendingData()
   }, [trendingData])

//    useLayoutEffect(() => {
//     getCryptodata()
//    }, [coinSearch, currency])



    return(
        <TrendingContext.Provider value={{
            trendingData
           
            }}>
            {children}
        </TrendingContext.Provider>
    )
}