import React from 'react';
import NavMenu from '../ui-component/navMenu';
import Feed from '../ui-component/feed';
import Header from '../ui-component/header';



function Rent() 
{
    return(
        <div className='bg-gray-light flex flex-col gap-3 h-full'>
            <div className='fixed top-0 w-full bg-white z-10'>
                <Header type='Renting' />
                <NavMenu currPage='Renting' />
            </div>
            <div className=' mt-28 flex justify-center h-full' >
            <div className='w-full max-w-screen-lg h-full'>
                    <Feed type='Renting' />
                </div>
            </div>
        </div>
    );
}

export default Rent;
