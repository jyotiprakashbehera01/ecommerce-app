import { useState } from 'react';

const Login = () => {
   const [currentState, setCurrentState] = useState('Sign Up');

  return (
      <form onSubmit={(event) => event.preventDefault()} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800' >
         <div className='inline-flex items-center gap-2 mb-2 mt-10'>
            <p className='prata-regular text-3xl'>{currentState}</p>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
         </div>

         {currentState === 'Sign Up' && (
            <input className='w-full border border-gray-300 px-3 py-2' type='text' placeholder='Name' required />
         )}
         <input className='w-full border border-gray-300 px-3 py-2' type='email' placeholder='Email' required />
         <input className='w-full border border-gray-300 px-3 py-2' type='password' placeholder='Password' required />

         <div className='w-full flex justify-between text-sm mt-[-8px]'>
            <button type='button' className='text-gray-500'>Forgot Password?</button>
            <button
               type='button'
               onClick={() => setCurrentState(currentState === 'Sign Up' ? 'Sign in' : 'Sign Up')}
               className='text-gray-500'
            >
               {currentState === 'Sign Up' ? 'Login Here' : 'Create Account'}
            </button>
         </div>

         <button type='submit' className='bg-black text-white px-8 py-2 mt-2'>{currentState}</button>
      </form>
   );
}

export default Login
