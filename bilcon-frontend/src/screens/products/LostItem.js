import React, { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LostItem = ({product}) => {

    return (
        // <Link to='/detailsPage' className='bg-gray-light rounded-md' key={product.id}>
        <div className='flex flex-row bg-white rounded-lg p-2 relative shadow-sm'>

            <div className='flex flex-col m-6 w-60 text-sm font-sans'>
                <p className='font-bold text-lg'>{product.name}</p>
                <p>{product.posterName}</p>
                <div className='flex flex-row items-center mt-2'>
                    <LocationOnIcon className='text-xs text-gray -ml-1'/>
                    <p className='text-gray mr-5'>{product.place}</p>
                    <p className='text-gray'>{`${product.dayOfLose}/${product.monthOfLose}/${product.yearOfLose}`}</p>
                </div>
                <div className='flex flex-col mt-3 gap-2'>
                    <p className='text-sm max-w-sm truncate'>{product.definition}</p>
                    <a href='' className='text-sm text-blue font-semibold hover:text-blue-dark hover:underline'>View details</a>
                </div>
            </div>

        </div>
        //</Link>
    );
}

export default LostItem;