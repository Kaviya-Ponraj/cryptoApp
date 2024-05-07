import React, {  useContext, useRef } from 'react'
import PaginationArrow from "../assets/pagination-arrow.svg"
import { CryptoContext } from '../context/CryptoContext'
import SubmitIcon from "../assets/submit-icon.svg"

const PerPage = () => {
  const inputRef = useRef(null)

  const {setPerPage} = useContext(CryptoContext)

  const handleperpage = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if(val !== 0) {
      setPerPage(val)
      inputRef.current.value = val;
    }
  }
  return (
  <div className='hidden md:block'>
   <form 
        className='relative flex items-center font-nunito mr-12'
        onSubmit={handleperpage}
        >
          <label 
          htmlFor="Per Page"
          className='relative flex items-center justify-center mr-2 font-bold'
          >
            Per Page : 
          </label>
          <input 
          type="number" 
          name="Per Page" 
          placeholder='10'
          min={1}
          max={250}
          ref={inputRef}
          className='w-16 rounded bg-gray-200  placeholder:text-gray-100 pl-2 required outline-0 border border-transperant focus: border-cyan leading-4'
          />

          <button 
          type="submit"
          className='ml-1 cursor-pointer'
          >
            <img src={SubmitIcon} alt="submit" 
            className='w-full h-auto '/>
          </button>
        </form>
  </div>)
}

const Pagination = () => {
  // const [page, setpage] = useState(1)

  const {page, setpage, totalPages, perPage} = useContext(CryptoContext)

  const totalNumber = Math.ceil(totalPages/perPage);

  const next = () => {
    if(page === totalNumber) {
      return null;
    } else {
      setpage(page + 1)
    }
  }

  const prev = () => {
    if(page === 1) {
      return null;
    } else {
      setpage(page - 1)
    }
  }

  const mutiStepNext = () => {
    if(page+3 >= totalNumber) {
      setpage(totalNumber - 1)
    } else {
      setpage(totalNumber + 3)
    }
  }

  const mutiStepPrev = () => {
    if(page-3 < 1) {
      setpage(totalNumber + 1)
    } else {
      setpage(totalNumber - 2)
    }
  }
  
  
    return (
      <div className='flex items-center '>
        <PerPage />
          <ul className='flex items-center justify-end text-base'>
              <li>
                  <button 
                  className='outline-0 hover:text-cyan w-8'
                  onClick={prev}
                  >
              <img src={PaginationArrow} alt="left" className='w-full h-auto rotate-180' />
              </button>
              </li>
  
                {
                  (page + 1 === totalNumber || page === totalNumber) ? (
                    <li> <button
              className='outline=0 focus:text-cyan rounded-full w-8 h-8  flex items-center justify-center bg-gray-200 mx-1.5 '
              onClick={mutiStepPrev}
              >...</button> </li>
  
                  ) : null
                }
  
              
                {
                  (page - 1 !== 0) ? (
                    <li> <button onClick={prev} className='outline=0 rounded-full w-8 h-8 flex items-center justify-center text-gray-300 bg-cyan mx-1.5 '> {page - 1} </button> </li>
                  ) : null
                }
  
              
              <li> <button disabled className='outline=0 focus:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5 '> {page} </button> </li>
              
              {
                (page + 1 !== totalNumber && page !== totalNumber) ? (
                  <li> <button onClick={next} className='outline=0 focus:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5 '> {page + 1} </button> </li>
                ) : null
              }
             
              
              {
                page + 1 !== totalNumber && page !== totalNumber ? (
  
                  <li> {" "} <button 
              className='outline=0 focus:text-cyan rounded-full w-8 h-8  flex items-center justify-center bg-gray-200 mx-1.5 '
              onClick={mutiStepNext}
              >...</button> </li>
  
                ) : null
              }
              
              
              {
                page !== totalNumber ? (
  
                  <li> <button onClick={() => setpage(totalNumber)} className='outline=0 focus:text-cyan rounded-full w-8 h-8  flex items-center justify-center bg-gray-200 mx-1.5 '> {totalNumber } </button> </li>
  
                ) : null
              }
              
              
              <li>
                  <button 
                  className='outline-0 hover:text-cyan w-8'
                  onClick={next}
                  >
              <img src={PaginationArrow} alt="right" className='w-full h-auto ' />
              </button>
              </li>
          </ul>
         
      </div>
    )

  
}

export default Pagination