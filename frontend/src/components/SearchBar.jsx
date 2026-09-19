import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible,setVisible] = useState(false)
    const location = useLocation()

    useEffect(()=>{
        if (location.pathname.includes('collection') ) {
           setVisible(true);
        }
        else{
            setVisible(false)
        }
    },[location])

  return showSearch && visible ? (
    <div className='flex items-center justify-center gap-2 border-t border-b bg-gray-50 py-3'>
      <div className='flex h-8 w-3/4 items-center rounded-full border border-gray-400 px-3 sm:w-1/2'>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' />
        <img className='w-4' src={assets.search_icon} alt="" />
      </div>
      <img onClick={()=>setShowSearch(false)} className='w-3 cursor-pointer' src={assets.cross_icon} alt="" />
    </div>
  ) : null
}

export default SearchBar
