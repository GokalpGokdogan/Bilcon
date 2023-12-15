import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LostandFoundItem = () => {
    let product = { "id": 1, "name": "CS book", "img": "https://m.media-amazon.com/images/I/918QF2d-EQL._AC_UF1000,1000_QL80_.jpg", "seller": "@Onur", "price": "2TL", "duration": "x hours", "date": "12.01.2023" };

    const [day, month, year] = product.date.split('.');

    return (
        // <Link to='/detailsPage' className='bg-gray-light rounded-md' key={product.id}>
        <div className='flex flex-row'>
            <img
                className="h-60 w-48 rounded-md mr-4"
                alt='Lost Item'
                src={`${product.img} `}
            />
            <div className='flex flex-col m-6 w-60 text-sm font-sans'>
                <p className='text-ui-purple font-bold text-lg'>{product.name}</p>
                <div className='flex flex-row text-ui-purple items-center'>
                    <LocationOnIcon className=' text-gray' fontSize="small" />
                    <p className='text-gray mr-3'>Lorem ipsum</p>
                    <p className='text-gray'>{`${day}/${month}/${year}`}</p>
                </div>
                <div className='flex flex-col mt-auto'>
                <p className= 'font-bold text-sm'>{(product.seller).replace('@', '')}</p>
                </div>
            </div>

        </div>
        //</Link>
    );
}

export default LostandFoundItem;