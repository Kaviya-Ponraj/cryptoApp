import React, { useContext, useState } from 'react'
import SearchIcon from "../assets/search-icon.svg"
import { CryptoContext } from '../context/CryptoContext'
import debounce from "lodash.debounce"

const SearchInput = ({handleSearch}) => {
    const [SearchText, setSearchText] = useState("")

    const onInputChange = (e) => {
        e.preventDefault()
    
        let query = e.target.value
        // console.log(query);
        setSearchText(query)
        handleSearch(query)
       }
    
       const {searchResult, setCoinSearch, setSearchResult} = useContext(CryptoContext)

       function selectCoin (coin) {
        setCoinSearch(coin)
        setSearchText("")
        setSearchResult()
       }

       function handleSubmit(e) {
        e.preventDefault()
        handleSearch(SearchText)
       }
    return(<>
    <form 
    className='w-80 md:w-96 flex items-center relative ml-7 font-nunito'
    onSubmit={handleSubmit}
    >
        
        <input className='w-full rounded bg-gray-200
         placeholder:text-gray-100 md:pl-2 required outline-0 border border-tranperent
         focus:border-cyan' 
         placeholder='Search here...' 
         type="text"
            name='search'
            onChange={onInputChange}
            value={SearchText}
          />
        
        <button type='submit' className='absolute right-1 cursor-pointer'>
            <img src={SearchIcon} alt="search" className='w-full h-auto'/>
        
        </button>
    </form>

    {
        SearchText.length > 0 ? 
        
        <ul className='w-96 rounded absolute top-11 right-0 h-96 overflow-x-hidden py-3 bg-gray-200 bg-opacity-60 backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200'>
            {
                searchResult ? 
                searchResult.map((coin) => {return (
                    <>                    
                        
                        <li 
                        className='flex m-[.75rem] cursor-pointer' 
                        key={coin.id}
                        onClick={() => selectCoin(coin.id)}
                        >
                            <img className='w-[1.5rem] h-[1.5rem] mx-1.5'  src={coin.thumb} alt={coin.name} />
                            {coin.name}
                        </li>
                    </>

                )})
                : <div className="w-full h-full flex items-center justify-center">
                    <div 
                    className="w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin"
                    role='status'
                    >
                        
                    </div>
                    <span className="ml-4">Searching...</span>
                </div>
            }
        </ul>

        : null
    }
    </>)
}

const Search = () => {
  

   const {getSearchResult} = useContext(CryptoContext)

   const debounceFunc = debounce(function(val) {
        getSearchResult(val)
   }, 2000) 

  
  return (
    <div className='relative'>
      
    <SearchInput handleSearch = {debounceFunc}/>
   
    </div>
  
  )
}

export default Search