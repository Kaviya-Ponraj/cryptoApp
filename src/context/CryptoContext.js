

import { createContext, useEffect,  useState } from "react";


// create context object

export const CryptoContext = createContext()

// create a context provider

export const CryptoProvider = ({children}) => {

   const [cryptoData, setCryptoData] = useState()
   const [searchResult, setSearchResult] = useState()
   const [coinSearch, setCoinSearch] = useState("")

   const [currency, setCurrency] = useState("usd")

   const [sortBy, setSortby] = useState("market_cap_asc")

   const [page, setpage] = useState(1)

   const [totalPages, setTotalPages] = useState(250)

   const [perPage, setPerPage] = useState(10)

   const [coinData, setCoinData] = useState()

   const getCryptodata = async () => {

    try{
        const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`).then((res) => res.json()).then(json => json)

        // console.log(data);
        setTotalPages(data.length)
    }
    catch(error) {
        console.log(error);
    }
   
   
    try{
        const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`).then((res) => res.json()).then(json => json)

        console.log(data);
        setCryptoData(data)
    }
    catch(error) {
        console.log(error);
    }
   }

   const getCoindata = async (coinId) => {
   
    try{
        const data = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`).then((res) => res.json()).then(json => json)

        console.log("coin data",data);
        setCoinData(data)
    }
    catch(error) {
        console.log(error);
    }
   }

   const getSearchResult = async (query) => {
    try{
        const data = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`).then((res) => res.json()).then(json => json)

        console.log(data);
        setSearchResult(data.coins)
    }
    catch(error) {
        console.log(error);
    }
   }

   const resetFunction = () => {
    setpage(1);
    setCoinSearch("")
   }

   useEffect(() => {
    getCryptodata()
   }, [coinSearch, currency, sortBy, page, perPage])

//    useLayoutEffect(() => {
//     getCryptodata()
//    }, [coinSearch, currency])



    return(
        <CryptoContext.Provider value={{
            cryptoData,
            searchResult, getSearchResult, 
            setCoinSearch,
            setSearchResult,
            currency, setCurrency,
            sortBy, setSortby,
            page, setpage,
            totalPages,
            resetFunction,
            perPage, setPerPage,
            getCoindata, coinData
            }}>
            {children}
        </CryptoContext.Provider>
    )
}