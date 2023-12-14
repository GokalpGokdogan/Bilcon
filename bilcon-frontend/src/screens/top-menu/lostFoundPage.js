import React from 'react';
import NavMenu from '../ui-component/navMenu';
import Feed from '../ui-component/feed';
import Header from '../ui-component/header';


function LostFound() 
{
    return(
        <div className='bg-white h-screen'>
            <Header type='Lost & Found'/>
            <NavMenu currPage='Lost & Found' />
            <Feed type='Lost & Found'/>
       </div>
    );
}

export default LostFound;
