import React, { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';

const FoundItem = ({product}) => {

    return (
        // <Link to='/detailsPage' className='bg-gray-light rounded-md' key={product.id}>
        <div className='flex flex-row bg-white rounded-lg p-2 relative shadow-sm'>
            <div  className="border-r border-gray-light">
            <img
                className="h-48 w-48 rounded-md object-contain mr-2"
                alt='Lost Item'
                src={`data:image/jpeg;base64,${product.photo}`}
            />
            </div>
            <Link to={`/details/found/${product.itemId}`}>
            <div className='flex flex-col m-6 w-60 text-sm font-sans'>
                <p className='font-bold text-lg'>{product.name}</p>
                <p>{product.posterName}</p>
                <div className='flex flex-row items-center mt-2'>
                    <LocationOnIcon className='text-xs text-gray -ml-1'/>
                    <p className='text-gray mr-5'>{product.place}</p>
                    <p className='text-gray'>{`${product.dayOfFind}/${product.monthOfFind}/${product.yearOfFind}`}</p>
                </div>
                
                <div className='flex flex-col mt-3 gap-2'>
                    <p className='text-sm max-w-sm truncate'>{product.definition}</p>
                    {/* <a href='' className='text-sm text-blue font-semibold hover:text-blue-dark hover:underline'>View details</a> */}
                </div>
            </div>
            </Link>
        </div>
        //</Link>
    );
}

export default FoundItem;