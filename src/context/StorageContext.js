

import { createContext, useContext, useEffect, useLayoutEffect,  useState } from "react";
import {CryptoContext} from "./CryptoContext"

// create context object

export const StorageContext = createContext()

// create a context provider

export const StorageProvider = ({children}) => {

//    const [cryptoData, setCryptoData] = useState()
//    const [searchResult, setSearchResult] = useState()
//    const [coinSearch, setCoinSearch] = useState("")

//    const [currency, setCurrency] = useState("usd")

//    const [sortBy, setSortby] = useState("market_cap_asc")

//    const [page, setpage] = useState(1)

//    const [totalPages, setTotalPages] = useState(250)

//    const [perPage, setPerPage] = useState(10)

//    const [coinData, setCoinData] = useState()

    
    const [allCoins, setAllCoins] = useState([])
    const [savedData, setSavedData] = useState()
    
    let {currency, sortBy} = useContext(CryptoContext)

  const savedCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"))

    if(oldCoins.includes(coinId)) {
        return null
    } else {
        let newCoin = [...oldCoins, coinId]
        setAllCoins(newCoin)
        localStorage.setItem("coins", JSON.stringify(newCoin))
    }
  }

  const removeCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"))

    let newCoin = oldCoins.filter(coin => coin !== coinId)
    setAllCoins(newCoin)
        localStorage.setItem("coins", JSON.stringify(newCoin))
  }

  const getSavedData = async (totalCoins = allCoins) => {

   
    try{
        const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(",")}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`).then((res) => res.json()).then(json => json)

        console.log(data);
        setSavedData(data)
    }
    catch(error) {
        console.log(error);
    }
   }

   const resetSavedResult = () => {
    getSavedData()
   }
   
   useEffect(() => {
    if(allCoins.length > 0) {
        getSavedData(allCoins)
    }
    else {
        setSavedData()
    }
   },[allCoins])

    useLayoutEffect(() => {

    let isThere = JSON.parse(localStorage.getItem("coins")) || false;


    if(!isThere) {
        // initialize localstorage with empty array
        localStorage.setItem("coins", JSON.stringify([]))
    } else {
        // set the state with current state values from the local storage
        let totalCoins = JSON.parse(localStorage.getItem("coins"))
        setAllCoins(totalCoins)

        if(totalCoins.length > 0) {
            getSavedData(totalCoins)
           }
   }

   
}, [])

//    useLayoutEffect(() => {
//     getCryptodata()
//    }, [coinSearch, currency])



    return(
        <StorageContext.Provider value={{
            savedCoin,
            allCoins,
            removeCoin,
            savedData,
            resetSavedResult
            }}>
            {children}
        </StorageContext.Provider>
    )
}