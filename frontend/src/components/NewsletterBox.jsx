import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
         event.preventDefault();
    }

  return (
    <div className=' text-center'>
        <p className=' text-2xl font-medium text-gray-800' >Subscribe now & get 20% off</p>
         <p className=' text-gray-400 mt-3'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry .
         </p>
         <form onSubmit={onSubmitHandler} className='w-full max-w-lg flex items-stretch gap-2 mx-auto my-6 border border-gray-300 rounded-md overflow-hidden'>
            <input className='w-full flex-1 outline-none px-3 py-3 text-sm' type="email" placeholder='Enter Your email' required />
            <button type='submit' className='bg-black text-white text-[10px] sm:text-xs px-4 sm:px-6 whitespace-nowrap min-h-[48px]'>SUBSCRIBE</button>
         </form>
    </div>
  )
}

export default NewsletterBox
