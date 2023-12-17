import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addItemToFavoritesList, removeItemFromFavoritesList } from '../../utils/Requests';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const PrivateLessonItem = ({product}) => {

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
            const data = await addItemToFavoritesList(product.itemId, "lesson");
            if (data) {
                console.log(data);
            }
        } catch (error) {
            console.error('Error in fetching items:', error);
        }
    };
    const removeFromFavorites = async () => { 
        try {
        const data = await removeItemFromFavoritesList(product.itemId, "lesson");
        if (data) {
            console.log(data);
        }
    } catch (error) {
        console.error('Error in fetching items:', error);
    }};


    return (
        <div className='m-8 w-60 h-60 bg-white rounded-md p-3 relative shadow-sm font-sans'>
           <div className='absolute top-0 right-0 border border-gray-light bg-red rounded-md w-8 h-8 flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-md' onClick={handleFavoriteClick}>
                    {isFavorite? (
                        <FavoriteIcon style={{fontSize: 'large', fontWeight: 'bold' }} className='text-white'/>
                    ) : (
                        <FavoriteBorderIcon style={{fontSize: 'large', fontWeight: 'bold' }} className='text-white'/>
                    )}
                </div>
           
            <div className='w-auto h-48 flex flex-col ml-2 justify-center items-left items-stretch' >
                <p className='mt-2 font-semibold text-lg' style={{overflowWrap: 'break-word' }}>{product.name}</p>
                {(product.photo && product.photo !== " ")? 
                ( <img
                        className="h-32 w-full rounded-md self-center mb-2 object-contain"
                        alt='Market Item'
                        src={`data:image/jpeg;base64,${product.photo}`}
                    />
                )
                :
                (
                    <div></div>
                )
                }<Link to={`/details/lesson/${product.itemId}`}>
                <div className='flex flex-col border-t border-gray-mid font-sanstext-sm'>
                    <p className='font-bold text-lg'>{product.price} TL/hour</p>
                    <p>{(product.posterName).replace('@', '')}</p>
                </div></Link>
            </div>
        </div>
    );
}

export default PrivateLessonItem;