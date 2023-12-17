import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addItemToFavoritesList, removeItemFromFavoritesList } from '../../utils/Requests';

const MarketItem = ({product}) => {
    const [isFavorite, setFavorite] = useState(product.isInFavorites);

    const handleFavoriteClick = () => {
        setFavorite(!isFavorite);
        if(!isFavorite)
        { addToFavorites(); }
        else
        { removeFromFavorites();}
        
    };

    const addToFavorites = async () => {
        try {
            const data = await addItemToFavoritesList(product.itemId, "sale");
            if (data) {
                console.log(data);
            }
        } catch (error) {
            console.error('Error in fetching items:', error);
        }
    };
    const removeFromFavorites = async () => { 
        try {
        const data = await removeItemFromFavoritesList(product.itemId, "sale");
        if (data) {
            console.log(data);
        }
    } catch (error) {
        console.error('Error in fetching items:', error);
    }};

    useEffect(() => {
        console.log(product);
    }, []);
    

    return (
           <div className='flex flex-col m-8 bg-white rounded-lg h-70 w-52 p-3 relative shadow-sm'>
                <div className='absolute top-0 right-0 border border-gray-light bg-red rounded-md w-8 h-8 flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-md' onClick={handleFavoriteClick}>
                    {isFavorite? (
                        <FavoriteIcon style={{fontSize: 'large', fontWeight: 'bold' }} className='text-white'/>
                    ) : (
                        <FavoriteBorderIcon style={{fontSize: 'large', fontWeight: 'bold' }} className='text-white'/>
                    )}
                </div>
                <div className='w-full flex justify-center border-b border-gray-mid'>
                    <img
                        className="h-40 w-52 rounded-md self-center mb-2 object-contain"
                        alt='Market Item'
                        src={`data:image/jpeg;base64,${product.photo}`}
                    />
                </div>
                <Link to={`/details/sale/${product.itemId}`}> 
                <div className='w-auto flex flex-col justify-center items-left mt-1 font-sans'>
                    <p className='font-semibold text-md'>{product.name}</p>
                    <p className='font-bold text-lg'>{product.price} TL</p>
                    <p className='text-sm'>{(product.posterName).replace('@', '')}</p>
                    
                </div></Link>
            </div> 

    );
}

export default MarketItem;