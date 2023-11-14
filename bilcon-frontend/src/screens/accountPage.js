import React from 'react';
import { Link } from 'react-router-dom';

function accountPage() 
{
    const buttonClassAccount = "w-64 my-1.5 text-black bg-gray-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    return(
    <div className='flex flex-row'>
        <div className='flex flex-col bg-white justify-center h-screen px-10'>
            <p className='font-inter font-extrabold text-3xl text-ui-purple my-4'>Account</p>
            <Link type="submit" to="/home" className={buttonClassAccount}>Security</Link>
            <Link type="submit" to="/home" className={buttonClassAccount}>Notifications</Link>
            <Link type="submit" to="/home" className={buttonClassAccount}>Purchases</Link>
            <Link type="submit" to="/home" className={buttonClassAccount}>Sold Items</Link>
            <Link type="submit" to="/home" className={buttonClassAccount}>Ratings</Link>
            <Link type="submit" to="/home" className={buttonClassAccount}>Favorites</Link>
            
            <div className='flex flex-col w-64 mt-3'></div>
        </div>
        
    </div>
    
    );
}

export default accountPage;
