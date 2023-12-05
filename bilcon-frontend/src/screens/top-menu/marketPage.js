import React from 'react';
import NavMenu from '../ui-component/navMenu';
import Feed from '../ui-component/feed';
import Header from '../ui-component/header';



function Market() 
{
    

    
    return(
        <div className='bg-white h-screen'>
            
           
            <Header/>
            <NavMenu currPage='Market' />
            <Feed/> 
       </div>
    );
}

export default Market;