import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Product from '../../Classes/Product'



function setList(/*type,pageOffset*/){
    let list = [];
    for (let i = 0; i < 10; i++) {
        
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

function FavPop({type = 'Course Trading'} /*{nameIn="Nameless", priceIn=-1, sellerIn="@Gokalp", imgIn='https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg', key="" }*/) 
{
    
    /**filter = database; */
    // let products = setList(/*filter*/);
    // console.log(productIn.productIn)



    const pages = ['Market', 'Renting', 'Lost & Found', 'Private Lessons', 'Course Trading'];

    const list = setList();



    let component = list;
    //console.log(productIn)

    
    // if(type == pages[0]){
    //     component=  
    // }
    // else if(type == pages[1]){
    //     component=  
    // }
    // else if(type == pages[2]){
    //     component=  
    // }
    // else if(type == pages[3]){
    //     component=  
    // }
    // else if(type == pages[4]){
    //     component=  
    // }
    // else {
    //     component = <div>
    //         <strong>Unknown Error</strong>
    //     </div>
    // }
    
    return(
        
        <div className={'bg-gray-blue w-[80vw] z-10 absolute top-full left-[-80vw] h-[45vw] border-ui-purple shadow-lg rounded-lg p-4'}>
        {/* Your popup content goes here */}
            {/* <div>

            <div className='w-64 my-1.5 text-black bg-gray-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
            <strong className='text-ui-purple'>{type}</strong>
            
            </div>
            
            <div className='bg-gray-light p-5 rounded-lg'>
                <div className='flex flex-row w-240 justify-center items-center'>
                    <button className='flex flex-row justify-center items-center bg-gray-blue rounded-md px-4 py-1.5 text-ui-purple text-sm font-bold'>back</button>
                    {component}
                    <button className='flex flex-row justify-center items-center bg-gray-blue rounded-md px-4 py-1.5 text-ui-purple text-sm font-bold'>next</button>
                </div>
            </div>
            
        </div> */}
            <div className='flex flex-row h-[45vw] w-240 justify-center items-center justify-between'>
                
                <button className='flex flex-row justify-center items-center bg-gray-blue rounded-md px-4 py-1.5 text-ui-purple text-sm font-bold'>back</button>
                <div className='flex flex-row mx-auto justify-center items-center py-1 w-220'>
                        <div className='grid grid-cols-5 gap-2'>
                            {component}
                        </div>
                    </div> 

                <button className='flex flex-row justify-center items-center bg-gray-blue rounded-md px-4 py-1.5 text-ui-purple text-sm font-bold'>next</button>
            </div>
                    
                
            
            
        </div>

       
    );
}

export default FavPop;
