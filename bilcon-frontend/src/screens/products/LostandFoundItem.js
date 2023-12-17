import React, { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LostandFoundItem = (product) => {
    product = { "id": 1, "itemType": "lost","name": "CS book", "img": "https://image.cnnturk.com/i/cnnturk/75/740x416/639af44b70380e06b8eaa291.jpg", "seller": "@Onur", "price": "2TL", "location": "x hours", "date": "12.01.2023" };

    const [day, month, year] = product.date.split('.');

    return (
        // <Link to='/detailsPage' className='bg-gray-light rounded-md' key={product.id}>
        <div className='flex flex-row bg-white rounded-lg p-2 relative shadow-sm'>
            <div  className="border-r border-gray-light">
            <img
                className="h-48 w-48 rounded-md object-contain mr-2"
                alt='Lost Item'
                src={`${product.img} `}
            />
            </div>
            <div className='flex flex-col m-6 w-60 text-sm font-sans'>
                <p className='font-bold text-lg'>{product.name}</p>
                <div className='flex flex-row items-center'>
                    <LocationOnIcon className='text-xs text-gray -ml-1'/>
                    <p className='text-gray mr-5'>{product.location}</p>
                    <p className='text-gray'>{`${day}/${month}/${year}`}</p>
                </div>
                <div className='flex flex-col mt-3 gap-2'>
                    <p className='text-sm max-w-sm truncate'>Found at G building</p>
                    <a href='' className='text-sm text-blue font-semibold hover:text-blue-dark hover:underline'>View details</a>
                </div>
            </div>

        </div>
        //</Link>
    );
}

export default LostandFoundItem;