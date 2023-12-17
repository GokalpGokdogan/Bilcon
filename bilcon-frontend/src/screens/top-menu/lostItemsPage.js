import React from 'react';
import NavMenu from '../ui-component/navMenu';
import Feed from '../ui-component/feed';
import Header from '../ui-component/header';


function LostItems() 
{
    return(
        <div className='bg-gray-light flex flex-col gap-3'>
        <div className='fixed top-0 w-full bg-white z-10'>
            <Header type='LostandFound' />
            <NavMenu currPage='LostItems' />
        </div>
        <div className=' mt-28 flex justify-center' >
        <div className='w-full max-w-screen-lg px-4'>
                <Feed type='LostItems' />
            </div>
        </div>
    </div>
    );
}

export default LostItems;
