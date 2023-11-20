import React from 'react';
import NavMenu from './ui-component/navMenu';
import Header from './ui-component/header';

function detailsPage() 
{
    
   
    return(
    <div className='flex flex-col bg-white justify-center items-center'>

        <Header/>
        <NavMenu currPage="Details Page"/>
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
