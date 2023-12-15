import React from 'react';
import NavMenu from '../ui-component/navMenu';
import Feed from '../ui-component/feed';
import Header from '../ui-component/header';



function Rent() 
{
    return(
        <div className='bg-white h-screen'>
            <Header type='Renting'/>
            <NavMenu currPage='Renting' />
            <Feed type='Renting'/>
       </div>
    );
}

export default Rent;
