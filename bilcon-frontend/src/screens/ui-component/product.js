import React from 'react';
import { Link } from 'react-router-dom';

// //gets product list and updates the feed
// function setList(/*filter*/){
//     let list = [];
//     for (let i = 0; i < 10; i++) {
        
//         list.push(
//             <Link to='/detailsPage' className='my-6' key={i}>
//                 <img
                    
//                     className="h-40 w-32 rounded-md mx-6 my-2"
//                     alt=''
//                     src='https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg'
//                 />
//                 <div className='w-auto flex flex-col justify-center items-center' style={{fontSize:'12px'}}>
//                     <strong>CS 315 Book</strong>
//                     <p>@Gokalp</p>
//                 </div>
//             </Link>
//         );
//     }
//     return list;
// }

function Product({nameIn="Nameless", priceIn=-1, sellerIn="@Gokalp", photoIn='https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg', key="" }) 
{
    
    /**filter = database; */
    // let products = setList(/*filter*/);
    
    
    return(
        
        
        <Link to='/detailsPage' className='my-6'>
            <img            
            className="h-40 w-32 rounded-md mx-6 my-2"
                alt=''
                src={`${photoIn } `}
            />
                <div className='w-auto flex flex-col justify-center items-center' style={{fontSize:'12px'}}>
                <strong>{nameIn}</strong>
                <p>{sellerIn}</p>
                <p>Price: {priceIn}</p>
            </div>
        </Link>
       
    );
}

export default Product;
