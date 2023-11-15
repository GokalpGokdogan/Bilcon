import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';


function Market() 
{
    
    const currPage = 'Market'
    const pages = ['Market', 'Renting', 'Lost & Found', 'Private Lessons', 'Course Trading'];
    let products = [];
    for (let i = 0; i < 5; i++) {
        
        products.push(
            <Link to='/detailsPage' className='my-6'>
                <img
                    key={i}
                    className="h-40 w-32 rounded-md mx-6 my-2"
                    alt=''
                    src='https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg'
                />
                <div className='w-auto flex flex-col justify-center items-center' style={{fontSize:'12px'}}>
                    <strong>CS 315 Book</strong>
                    <p>@Gokalp</p>
                </div>
            </Link>
        );
    }

    
    return(
        <div className='bg-white h-screen'>
            
           
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
            <div className='flex flex-row mx-auto justify-center items-center py-10'>
                <div className='flex flex-row w-220'>
                    {products}
                </div>
            </div> 
       </div>
    );
}

export default Market;
