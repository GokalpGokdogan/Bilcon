import React from 'react';
import NavMenu from '../ui-component/navMenu';
import Feed from '../ui-component/feed';
import Header from '../ui-component/header';



function Market() 
{
    

    
    return(
        <div className='bg-white h-screen'>
            
            <div className='fixed top-0 w-full bg-white pb-2'>
                <Header type='Market'/>
                <NavMenu currPage='Market' />
            </div>
            
            <div className='mt-28'>
                <Feed type='Market'/> 
            </div>
       </div>
    );
}

export default Market;
