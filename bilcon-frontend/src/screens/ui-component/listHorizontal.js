import React, {useState, useEffect} from 'react';
import ProductComponent from './productComponent';
import Product from '../../Classes/Product'
import { Link } from 'react-router-dom';
import ProductList from './ProductList';
import {getAllItemsInFavoritesList } from '../../utils/Requests';






    
//gets product list and updates the feed
function setList(listIn, pageOffset) {
    let list = listIn || [];
    let jsxList = []; // Create a new array to store the JSX elements
    
    for (let i = 0; i < 4; i++) {
        let obj = list[i + pageOffset * 4];

        if (obj) {
            console.log(obj);

            // Push the JSX element into jsxList instead of list
            jsxList.push(
                <Link to='/detailsPage' className='bg-gray-blue rounded-md m-3 w-[12vw] flex items-center justify-center text-ui-purple hover:bg-ig-blue hover:text-white' key={obj.id}>
                    <div className='m-6'>
                        <div className='h-[8vw] w-[8vw] flex items-center justify-center border-b border-gray-mid mb-2'>
                        <img
                            className="h-[8vw] w-[8vw] rounded-md self-center object-contain"
                            alt='Market Item'
                            src={`data:image/jpeg;base64,${obj.photo}`}
                        />
                    </div>
                        <div className='w-auto flex flex-col justify-center items-left mt-3 text-ellipsis' style={{fontSize:'12px'}}>
                            <strong>{obj.name}</strong>
                            <p>{obj.posterName}</p>
                        </div>
                    </div>
                </Link>
            );
        }
    }
    return jsxList; // Return jsxList instead of list
}


function ListHorizontal({title='Favorites', products}) 
{
    //console.log(products);
    // const [data, setData] = useState([]);

    // const handleFavoritesSale = async () => {
    //     let curr = await getAllItemsInFavoritesList(0, "sale");
    //     console.log(curr);
    //     if (curr) {
    //         setData(curr);
    //     }
    // };

    // useEffect(() => {
    //     handleFavoritesSale();
    // }, []); // <-- Dependency array should be inside the parentheses
    
    

    //const [favorites, setFavorites] = useState([]);
    const [isOpen, setIsOpen] = useState(false);    
    const [pageOffset, setPageOffset] = useState(0);
    const list = setList(products, pageOffset);
    const maxOffset = Math.floor(products.length / 4);;
    const component = list //<ProductList products={products} type={"Market"} />

    return(
        <div>

            <div className='w-64 my-1.5 text-black bg-gray-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' onClick={() => setIsOpen(!isOpen)}>
            <strong className='text-ui-purple'>{title}</strong>
            
            </div>
            {isOpen && (
                <div className='bg-gray-light p-5 rounded-lg'>
                    <div className='flex flex-row w-240 justify-center items-center'>
                        <button 
                            onClick={()=>{if(pageOffset > 0){ setPageOffset(pageOffset - 1);}}} 
                            disabled={pageOffset===0} 
                            className={`flex flex-row justify-center items-center bg-gray-blue rounded-md px-4 py-1.5 text-sm font-bold transition duration-200 ease-in-out ${
                                pageOffset===0 ? 'text-gray-light bg-gray-light' : 'text-ui-purple hover:bg-ui-purple hover:text-white'}`}
                        >back</button>
                        {component}
                        <button 
                            onClick={()=>{if(pageOffset < maxOffset){ setPageOffset(pageOffset + 1);}}} 
                            disabled={pageOffset >= maxOffset-1} 
                            className={`flex flex-row justify-center items-center bg-gray-blue rounded-md px-4 py-1.5  text-sm font-bold transition duration-200 ease-in-out ${
                                pageOffset >= maxOffset-1 ? 'text-gray-light bg-gray-light' : 'text-ui-purple hover:bg-ui-purple hover:text-white'}`}
                        >next{pageOffset}{maxOffset}</button>
                    </div>
                </div>
            )}
        </div>
       
    );
}

export default ListHorizontal;
