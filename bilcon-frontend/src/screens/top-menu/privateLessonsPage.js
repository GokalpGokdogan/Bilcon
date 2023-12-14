import React from 'react';
import NavMenu from '../ui-component/navMenu';
import Feed from '../ui-component/feed';
import Header from '../ui-component/header';

function PrivateLessons() 
{
    return(
        <div className='bg-white h-screen'>
            <Header type='Private Lessons'/>
            <NavMenu currPage='Private Lessons' />
            <Feed type='Private Lessons'/> 
       </div>
    );
}

export default PrivateLessons;
