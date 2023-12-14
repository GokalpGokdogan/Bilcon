import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MarketItem = () => {
    let product = { "id": 1, "name": "CS book", "img": "https://m.media-amazon.com/images/I/918QF2d-EQL._AC_UF1000,1000_QL80_.jpg", "seller": "@Onur", "price": "2TL" };

    return (
        // <Link to='/detailsPage' className='bg-gray-light rounded-md' key={product.id}>
        <div className='m-6'>
            <img
                className="h-40 w-32 rounded-md "
                alt='Market Item'
                src={`${product.img} `}
            />
            <div className='w-auto flex flex-col justify-center items-left mt-3 font-sans text-sm'>
                <p className='text-ui-purple font-bold'>{product.name}</p>
                <p>{(product.seller).replace('@', '')}</p>
                <p>Price: {product.price}</p>
            </div>
        </div>
        //</Link>
    );
}

export default MarketItem;