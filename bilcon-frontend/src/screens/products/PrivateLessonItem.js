import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PrivateLessonItem = () => {
    let product = { "id": 1, "name": "CS book", "img": "https://m.media-amazon.com/images/I/918QF2d-EQL._AC_UF1000,1000_QL80_.jpg", "seller": "@Onur", "price": "2", "duration": "x hours" };

    return (
        <div className='my-6 mx-6 w-60 h-60 bg-gray-light rounded-md' key={product.id}>
            <div className='w-auto h-48 flex flex-col justify-center items-left m-6 items-stretch' >
                <p className='text-ui-purple font-bold text-lg' style={{overflowWrap: 'break-word' }}>{product.name}</p>
                <div className='flex flex-col mt-auto font-sans font-bold text-sm'>
                    <p>{(product.seller).replace('@', '')}</p>
                    <p>Price: {product.price} TL/hour</p>
                </div>
            </div>
        </div>
    );
}

export default PrivateLessonItem;