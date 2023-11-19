import React from 'react';
import { Link } from 'react-router-dom';

//gets product list and updates the feed
function setList(/*filter*/){
    let list = [];
    for (let i = 0; i < 10; i++) {
        
        list.push(
            <Link to='/detailsPage' className='my-6' key={i}>
                <img
                    
                    className="h-40 w-32 rounded-md mx-6 my-2"
                    alt=''
                    src='https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg'
                />
                <div className='w-auto flex flex-col justify-center items-center' style={{fontSize:'12px'}}>
                    <strong>CS 315 Book</strong>
                    <p>@Gokalp</p>
                </div>
            </Link>
        );
    }
    return list;
}

function Feed() 
{
    
    /**filter = database; */
    let products = setList(/*filter*/);
    
    
    return(
        
        
        <div className='flex flex-row mx-auto justify-center items-center py-10 w-220'>
            <div class="grid grid-cols-5 gap-4">
                {products}
            </div>
        </div> 
       
    );
}

export default Feed;
