import React from 'react'
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav
    className='w-[40%] mt-16 flex justify-center border border-cyan rounded-lg'
    >
        <NavLink 
        to="/"
        end
        className={({isActive}) => {
            return `w-full text-center font-nunito text-base m-2.5  border-0 cursor-pointer rounded capitalize font-semibold ${isActive ? 'bg-cyan text-gray-300' : 'bg-gray-200 text-gray-100 hover:text-cyan active:text-gray-300 active:bg-cyan'}`
        }}
        >
            Crypto
        </NavLink>

        <NavLink 
        to="/trending"
        className={({isActive}) => {
            return `w-full text-center font-nunito text-base m-2.5  border-0 cursor-pointer rounded capitalize font-semibold ${isActive ? 'bg-cyan text-gray-300' : 'bg-gray-200 text-gray-100 hover:text-cyan active:text-gray-300 active:bg-cyan'}`
        }}
        >
            trending
        </NavLink>

        <NavLink 
        to="/saved"
        className={({isActive}) => {
            return `w-full text-center font-nunito text-base m-2.5   border-0 cursor-pointer rounded capitalize font-semibold ${isActive ? 'bg-cyan text-gray-300' : 'bg-gray-200 text-gray-100 hover:text-cyan active:text-gray-300 active:bg-cyan'}`
        }}
        >
            saved
        </NavLink>
    </nav>
  )
}

export default Navigation