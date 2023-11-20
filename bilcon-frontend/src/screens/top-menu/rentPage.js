import React from 'react';
import NavMenu from '../ui-component/navMenu';
import Feed from '../ui-component/feed';
import Header from '../ui-component/header';



function Rent() 
{
    

    return(
        <div className='bg-white h-screen'>
            
           
            <Header/>
            <NavMenu currPage='Renting' />
            <Feed/>
       </div>
    );
}

export default Rent;
