import React from 'react';
import NavMenu from '../ui-component/navMenu';
import Feed from '../ui-component/feed';
import Header from '../ui-component/header';

function PrivateLessons() 
{
    return(
        <div className='bg-white h-screen'> 
            <div className='fixed top-0 w-full bg-white pb-2'>
                <Header type='Private Lessons'/>
                <NavMenu currPage='Private Lessons' />
            </div>
            
            <div className='mt-28'>
                <Feed type='Private Lessons'/> 
            </div>

       </div>
    );
}

export default PrivateLessons;
