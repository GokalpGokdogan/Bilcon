import React from 'react';
import { Link } from 'react-router-dom';



function ProductComponent(productIn/*{nameIn="Nameless", priceIn=-1, sellerIn="@Gokalp", photoIn='https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg', key="" }*/) 
{
    
    /**filter = database; */
    // let products = setList(/*filter*/);
    // console.log(productIn.productIn)
    const product = productIn.productIn || {};
    // console.log(product)
    return(
        
        
        <Link to='/detailsPage' className='my-6' key={product.id}>
            <img            
            className="h-40 w-32 rounded-md mx-6 my-2"
                alt=''
                src={`${product.photo } `}
            />
            <div className='w-auto flex flex-col justify-center items-center' style={{fontSize:'12px'}}>
                <strong>{product.name}</strong>
                <p>{product.seller}</p>
                <p>Price: {product.price}</p>
            </div>
        </Link>
       
    );
}

export default ProductComponent;
