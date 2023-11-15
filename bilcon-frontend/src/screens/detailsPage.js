import React from 'react';
import { Link } from 'react-router-dom';

function detailsPage() 
{
    return(
    <div className='flex flex-col bg-white justify-center items-center'>

        <div className='flex flex-row p-4 w-full'>
            <p className='font-inter font-extrabold text-3xl text-blue-dark'>BILCON</p>
            <input type="text" className="mx-auto border border-gray bg-gray-light text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-2.5 w-80 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search for second-hand items, books and more!" required=""></input>
            <Link type="submit" to="/accountPage" className="w-32 my-auto text-black bg-gray-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Account</Link>
        </div>
        
        <h1 className='font-inter font-extrabold text-3xl text-ui-purple my-4'>CS 315 Book</h1>
        <div className='flex flex-row'>
            <div>
                <img
                    className="h-120 w-96 rounded-md mx-6 my-6"
                    alt=''
                    src='https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg'
                />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <p>
                <strong>Seller:</strong>   @Gokalp
                </p>
                <p className='flex flex-col justify-center items-center'>
                Required book for CS315. Especially you must buy it if 3 days left to your exam. <p></p>Condition: meh
                </p> 
                <p>
                <strong>Price:</strong> 800 TL (price is negotiable)
                </p>
            </div>


        </div>
        
    </div>
    );
}

export default detailsPage;
