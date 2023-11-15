import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';

function AccountPage() 
{
    const buttonClassAccount = "w-64 my-1.5 text-black bg-gray-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    
    const starIcons = Array.from({ length: 5 }, (_, i) => (
        <svg key={i} className='my-auto' width="36px" height="35px" viewBox="0 0 36 35" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>Star</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Profile-nav" transform="translate(-11.000000, -4.000000)" fill="#F8E71C" stroke="none" stroke-width="2">
                    <g id="Group-2" transform="translate(0.000000, -1.000000)">
                        <polygon id="Star" points="29 32.8753882 19.595436 38 21.3915479 27.145898 13.7830957 19.4589803 24.297718 17.8753882 29 8 33.702282 17.8753882 44.2169043 19.4589803 36.6084521 27.145898 38.404564 38"></polygon>
                    </g>
                </g>
            </g>
        </svg>
    ));

    const currPage = 'Account'
    const pages = ['Market', 'Renting', 'Lost & Found', 'Private Lessons', 'Course Trading'];
    
    
    return(
        <div>
            <div className='flex flex-row p-4 w-full'>
                <p className='font-inter font-extrabold text-3xl text-blue-dark'>BILCON</p>
                <input type="text" className="mx-auto border border-gray bg-gray-light text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-2.5 w-80 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search for second-hand items, books and more!" required=""></input>
                <Link type="submit" to="/accountPage" className="w-32 my-auto text-white bg-ui-purple hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Account</Link>
            </div>
            <div className="flex justify-center items-center flex-row p-4 w-full w-32 my-auto text-black bg-gray-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              {pages.map((page, index) => (
                <React.Fragment key={page}>
                    {index > 0 && <div  className="flex justify-center items-center border-r border-gray-500 mx-2 h-8" style={{ borderWidth: '0.02vw', alignItems: 'center' }}></div>}
                    <MenuItem className='bg-ui-purple'>
                    <Link
                        to={`/${page.toLowerCase()}`}
                        className= {`${page === currPage ? 'bg-red-500' : 'bg-ui-purple'} bg-ui-purple text-white w-40 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                    >
                        {page}
                    </Link>
                    </MenuItem>
                </React.Fragment>
                ))}
            </div>
            <div className='flex flex-row'>
        <div className='flex flex-col bg-white h-screen px-10'>
            <p className='font-inter font-extrabold text-3xl text-ui-purple my-4'>Account</p>
            <Link type="submit" to="/home" className={buttonClassAccount}>Security</Link>
            <Link type="submit" to="/home" className={buttonClassAccount}>Notifications</Link>
            <Link type="submit" to="/home" className={buttonClassAccount}>Purchases</Link>
            <Link type="submit" to="/home" className={buttonClassAccount}>Sold Items</Link>
            
            <div className='flex flex-row justify-center'>
                <Link type="submit" to="/home" className={buttonClassAccount}>Ratings</Link>
                {starIcons}
            </div>
            
            <Link type="submit" to="/home" className={buttonClassAccount}>Favorites</Link>
            
            <div className='flex flex-col w-64 mt-3'>
                
            </div>
        </div>
        
    </div>
        </div>
    
    
    );
}

export default AccountPage;
