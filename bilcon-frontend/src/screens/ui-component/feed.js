import React from 'react';
import ProductComponent from './productComponent';
import Product from '../../Classes/Product'

//gets product list and updates the feed
function setList(/*filter*/){
    let list = [];
    for (let i = 0; i < 10; i++) {
        
        let obj = new Product();
        obj.productId=10+i*i*1.5
        obj.price=10+i*i*1.5 
        list.push(
            /*<Product nameIn={"CS315 Book " + (i+1)} 
            priceIn={10+i*i*1.5} 
            sellerIn="@Gokalp" 
            photoIn='https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg' 
            key={i} />*/
            <ProductComponent productIn={obj} key={i}/>
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
            <div className='grid grid-cols-5 gap-4'>
                {products}
            </div>
        </div> 
       
    );
}

export default Feed;
