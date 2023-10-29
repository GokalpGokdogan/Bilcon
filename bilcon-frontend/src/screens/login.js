import React from 'react';

function Login() 
{
    return(
    <div className='flex flex-col bg-white justify-center items-center h-screen'>
        <p className='font-inter font-extrabold text-7xl text-blue-dark'>BILCON</p>
        <p className='font-sans font-medium text-md text-gray'>Welcome to Bilcon!</p>
        <div className='w-64 h-20 mt-6'>
            <p className="font-sans text-blue font-bold text-sm py-2">Bilkent Mail</p>
            <input type="email" className="border-2 border-gray-light text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="user@bilkent.edu.tr" required=""></input>
        </div>    
        <div className='w-64 h-20 mt-3'>
            <p className="font-sans text-blue font-bold text-sm py-2">Password</p>
            <input type="password" className="border-2 border-gray-light text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Min. 8 characters" required=""></input>
        </div>
        <div className='flex flex-col w-64'>
        <button type="submit" className="w-64 mt-4 text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
        <a href='#' className=" self-center p-2 font-sans text-blue font-medium text-xs justify-end hover:underline">Forgot Password?</a>

        </div>
    </div>);
}

export default Login;
