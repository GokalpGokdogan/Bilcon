import React from 'react';
import ProductComponent from './productComponent';
import Product from '../../Classes/Product'

//gets product list and updates the feed
function setList(prodType/*filter*/){
    let list = [];
    for (let i = 0; i < 10; i++) {
        
        let obj = new Product();
        obj.productId=10+i*i*1.5
        obj.price=10+i*i*1.5 
        
        list.push(
            <ProductComponent key={ obj.productId + i} productIn={obj}  type={prodType}/>
        );
    }
    return list;
}

function Feed(type='Market') 
{
    
    /**filter = database; */
    let products = setList(type/*filter*/);
    const pages = ['Market', 'Renting', 'Lost & Found', 'Private Lessons', 'Course Trading'];

    let component;
    //console.log(productIn)

    if(type.type === pages[0]){
        component = <div className='flex flex-row mx-auto justify-center items-center py-10 w-220'>
                        <div className='grid grid-cols-5 gap-4'>
                            {products}
                        </div>
                    </div> 
    }
    else if(type.type === pages[1]){
        component = <div className='flex flex-row mx-auto justify-center items-center py-10 w-220'>
                        <div className='grid grid-cols-5 gap-4'>
                            {products}
                        </div>
                    </div> 
    }
    else if(type.type === pages[2]){
        component = <div className='flex flex-col justify-center py-10 w-220' style={{marginLeft: '45px', marginRight: '45px'}}>
                        {products}
                    </div> 
    }
    else if(type.type === pages[3]){
        component = <div className='flex flex-row mx-auto justify-center items-center py-10 w-220'>
                        <div className='grid grid-cols-4 gap-4'>
                            {products}
                        </div>
                    </div> 
    }
    else if(type.type === pages[4]){
        component = <div className='flex flex-row mx-auto justify-center items-center py-10 w-220'>
                        <div className='grid grid-cols-4 gap-4'>
                            {products}
                        </div>
                    </div> 
    }
    else {
        component = <div>
                        <strong>Unknown Error</strong>
                    </div>
    }






    
    return(
        
        
        component
       
    );
}

export default Feed;
