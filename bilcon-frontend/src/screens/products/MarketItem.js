import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const MarketItem = () => {
    let product = { "id": 1, "name": "Digital Design and Computer Architecture", "img": "https://m.media-amazon.com/images/I/918QF2d-EQL._AC_UF1000,1000_QL80_.jpg", "seller": "@Onur Özdemir", "price": "2TL" };

    const [isFavorite, setFavorite] = useState(false);

    const handleFavoriteClick = () => {
        setFavorite(!isFavorite);
    };

    return (
       // <Link to='/detailsPage' className='hover:text-black hover:font-bold' key={product.id}>
            <div className='flex flex-col m-8 bg-white rounded-lg h-70 w-52 p-3 relative shadow-sm'>
                <div className='absolute top-0 right-0 border border-gray-light bg-red rounded-md w-8 h-8 flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-md' onClick={handleFavoriteClick}>
                    {isFavorite ? (
                        <FavoriteIcon style={{fontSize: 'large', fontWeight: 'bold' }} className='text-white'/>
                    ) : (
                        <FavoriteBorderIcon style={{fontSize: 'large', fontWeight: 'bold' }} className='text-white'/>
                    )}
                </div>
                <div className='w-full flex justify-center border-b border-gray-mid'>
                    <img
                        className="h-40 w-32 rounded-md self-center mb-2"
                        alt='Market Item'
                        src={`${product.img} `}
                    />
                </div>
                <div className='w-auto flex flex-col justify-center items-left mt-1 font-sans'>
                    <p className='font-semibold text-md'>{product.name}</p>
                    <p className='font-bold text-lg'>{product.price}</p>
                    <p className='text-sm'>{(product.seller).replace('@', '')}</p>
                    
                </div>
            </div>
      //  </Link>
    );
}

export default MarketItem;