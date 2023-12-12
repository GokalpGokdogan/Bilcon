import React from 'react';
import { Link } from 'react-router-dom';



function ProductComponent({productIn, type = 'Market'} /*{nameIn="Nameless", priceIn=-1, sellerIn="@Gokalp", imgIn='https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg', key="" }*/) 
{
    
    /**filter = database; */
    // let products = setList(/*filter*/);
    // console.log(productIn.productIn)


    const product = productIn || {};
    const pages = ['Market', 'Renting', 'Lost & Found', 'Private Lessons', 'Course Trading'];

    let component;
    //console.log(productIn)
        
    if(type.type === pages[0]){
        component = <Link to='/detailsPage' className='bg-gray-light rounded-md' key={product.id}>
        <div className='m-6'>
            <img            
            className="h-40 w-32 rounded-md "
                alt=''
                src={`${product.img} `}
            />
            <div className='w-auto flex flex-col justify-center items-left mt-3 text-ellipsis' style={{fontSize:'12px'}}>
                <strong className='text-ui-purple'>{product.name}</strong>
                <p>{(product.seller).replace('@','')}</p>
                <p>Price: {product.price}</p>
            </div>
        </div>
    </Link>
    }
    else if(type.type === pages[1]){
        component = <Link to='/detailsPage' className='bg-gray-light rounded-md' key={product.id}>
        <div className='m-6'>
            <img            
            className="h-40 w-32 rounded-md "
                alt=''
                src={`${product.img } `}
            />
            <div className='w-auto flex flex-col justify-center items-left mt-3 text-ellipsis' style={{fontSize:'12px'}}>
                <strong className='text-ui-purple'>{product.name}</strong>
                <p>{(product.seller).replace('@','')}</p>
                <p>Price: {product.price}</p>
                <p>Duration: - </p>
            </div>
        </div>
    </Link>
    }
    else if(type.type === pages[2]){
        component = <Link to='/detailsPage' className='my-6 mx-15 w-70 h-60 rounded-md block bg-gray-light' /*style={{ maxWidth: '90%'}}*/ key={product.id}>
        <div className='flex flex-row'>
            <img            
            className="h-60 w-48 rounded-md mr-4"
                alt=''
                src={`${product.img } `}
            />
            <div className='w-auto flex flex-col m-6 w-60 ' style={{fontSize:'12px'}}>
                <strong  className='text-ui-purple text-ellipsis' style={{fontSize:'20px'}}>{product.name}</strong>
                <div className='flex flex-row text-ui-pruple'>
                    <img className='h-4 w-4' alt='' src='https://png.pngtree.com/png-clipart/20191121/original/pngtree-vector-location-icon-png-image_5159127.jpg'/>
                    <p className='text-gray'>Lorem ipsum  
                    --/--/---- </p>
                </div>
                <div className='flex flex-col mt-auto text-ellipsis'>
                    <strong>{(product.seller).replace('@','')}</strong>
                </div>
            </div>

        </div>
        
    </Link>
    }
    else if(type.type === pages[3]){
        component = <Link to='/detailsPage' className='my-6 mx-6 w-60 h-60 bg-gray-light rounded-md' key={product.id}>
                        <div className='w-auto h-auto flex flex-col justify-center items-left m-6 items-stretch' style={{fontSize:'14px', height: '80%'}}>
                            <strong  className='text-ui-purple' style={{fontSize:'20px', overflowWrap: 'break-word'}}>{product.name}</strong>
                            <div className='flex flex-col mt-auto'>
                                
                                <strong>{(product.seller).replace('@','')}</strong>
                                <strong>Price: {product.price} TL/hour</strong>
                            </div>
                            {/* <div className='h-20'></div> */}
                            
                        </div>
                    </Link>
    }
    else if(type.type === pages[4]){
        component = <Link to='/detailsPage' className='my-6 mx-6 w-60 h-60 bg-gray-light rounded-md' key={product.id}>
                        <div className='w-auto h-auto flex flex-col justify-center items-left m-6 items-stretch' style={{fontSize:'14px', height: '80%'}}>
                            <strong  className='text-ui-purple' style={{fontSize:'20px', overflowWrap: 'break-word'}}>{product.name}</strong>
                            <div className='flex flex-col mt-auto'>
                                
                                <strong>{(product.seller).replace('@','')}</strong>
                                <strong>Section: {product.price}</strong>
                            </div>
                            {/* <div className='h-20'></div> */}
                            
                        </div>
                    </Link>
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

export default ProductComponent;
