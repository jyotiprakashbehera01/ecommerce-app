import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-between gap-0 border border-gray-300 rounded-lg bg-white px-0 py-0 overflow-hidden'>
      <div className='w-full sm:w-1/2 flex items-center justify-center py-8 sm:py-0'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>Our Bestsellers</p>
          </div>

          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>

          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base'>Shop now</p>
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
          </div>
        </div>
      </div>

      <div className='w-full sm:w-1/2 flex justify-center items-center bg-[#f5f4f0]'>
        <img
          src={assets.hero_img}
          alt='Hero'
          className='w-full h-full object-cover object-center block'
        />
      </div>
    </div>
  )
}

export default Hero
