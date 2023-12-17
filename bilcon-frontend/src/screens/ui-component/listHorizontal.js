import React, {useState} from 'react';
import ProductComponent from './productComponent';
import Product from '../../Classes/Product'
import { Link } from 'react-router-dom';

//gets product list and updates the feed
function setList(/*type,pageOffset*/){
    let list = [];
    for (let i = 0; i < 5; i++) {
        
        let obj = new Product();
        obj.productId=10+i*i*1.5
        
        
        list.push(
            <Link to='/detailsPage' className='bg-gray-blue rounded-md' key={obj.id}>
                <div className='m-6'>
                    <img            
                    className="h-28 w-21 rounded-md "
                        alt=''
                        src={`${obj.img} `}
                    />
                    <div className='w-auto flex flex-col justify-center items-left mt-3 text-ellipsis' style={{fontSize:'12px'}}>
                        <strong className='text-ui-purple'>{obj.name}</strong>
                        <p>{(obj.seller).replace('@','')}</p>
                    </div>
                </div>
            </Link>
        );
    }
    return list;
}

function ListHorizontal(title='Favorites') 
{
    const [isOpen, setIsOpen] = useState(false);
    const list = setList();
    
    const [pageOffset, setPageOffset] = useState(0);
    const maxOffset = list.length/5 + (list.length%5===0 ? 0 : 1);
    const component = <div className='flex flex-row mx-auto justify-center items-center px-4 py-1 w-220'>
                            <div className='grid grid-cols-5 gap-4'>
                                {list}
                            </div>
                        </div> 
    






    
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
                            className={`flex flex-row justify-center items-center bg-gray-blue rounded-md px-4 py-1.5 text-ui-purple text-sm font-bold transition duration-200 ease-in-out ${
                                pageOffset===0 ? 'text-gray-light bg-gray-light' : 'hover:bg-ui-purple hover:text-white'}`}
                        >back</button>
                        {component}
                        <button 
                            onClick={()=>{if(pageOffset < maxOffset){ setPageOffset(pageOffset + 1);}}} 
                            disabled={pageOffset===maxOffset} 
                            className={`flex flex-row justify-center items-center bg-gray-blue rounded-md px-4 py-1.5 text-ui-purple text-sm font-bold transition duration-200 ease-in-out ${
                                pageOffset===maxOffset ? 'text-gray-light bg-gray-light' : 'hover:bg-ui-purple hover:text-white'}`}
                        >next</button>
                    </div>
                </div>
            )}
        </div>
       
    );
}

export default ListHorizontal;
