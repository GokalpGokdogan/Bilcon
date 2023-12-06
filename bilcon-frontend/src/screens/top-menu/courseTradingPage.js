import React from 'react';
import NavMenu from '../ui-component/navMenu';
import Feed from '../ui-component/feed';
import Header from '../ui-component/header';

function CourseTrading() 
{

    
    return(
        <div className='bg-white h-screen'>
            
           
            <Header/>
            <NavMenu currPage='Course Trading' />
            <Feed  type='Course Trading'/>
       </div>
    );
}

export default CourseTrading;
