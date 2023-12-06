import React from 'react';
import { Link } from 'react-router-dom';



function ProductComponent({productIn, type = 'Market'} /*{nameIn="Nameless", priceIn=-1, sellerIn="@Gokalp", photoIn='https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg', key="" }*/) 
{
    
    /**filter = database; */
    // let products = setList(/*filter*/);
    // console.log(productIn.productIn)


    const product = productIn || {};
    const pages = ['Market', 'Renting', 'Lost & Found', 'Private Lessons', 'Course Trading'];

    let component;
    //console.log(productIn)

    if(type.type === pages[0]){
        component = <Link to='/detailsPage' className='my-6' key={product.id}>
        <img            
        className="h-40 w-32 rounded-md mx-6 my-2"
            alt=''
            src={`${product.photo } `}
        />
        <div className='w-auto flex flex-col justify-center items-center' style={{fontSize:'12px'}}>
            <strong>{product.name}</strong>
            <p>{product.seller}</p>
            <p>Price: {product.price}</p>
        </div>
    </Link>
    }
    else if(type.type === pages[1]){
        component = <Link to='/detailsPage' className='my-6' key={product.id}>
        <img            
        className="h-40 w-32 rounded-md mx-6 my-2"
            alt=''
            src={`${product.photo } `}
        />
        <div className='w-auto flex flex-col justify-center items-center' style={{fontSize:'12px'}}>
            <strong>{product.name}</strong>
            <p>{product.seller}</p>
            <p>Price: {product.price}</p>
            <p>Duration: - </p>
        </div>
    </Link>
    }
    else if(type.type === pages[2]){
        component = <Link to='/detailsPage' className='my-6 mx-15 w-70 h-60 rounded-md block bg-gray-light' style={{ maxWidth: '90%'}} key={product.id}>
        <div className='flex flex-row'>
            <img            
            className="h-60 w-48 rounded-md mr-4"
                alt=''
                src={`${product.photo } `}
            />
            <div className='w-auto flex flex-col m-6 w-60 ' style={{fontSize:'12px'}}>
            <strong style={{fontSize:'20px', overflowWrap: 'break-word'}}>{product.name}</strong>
            <div className='flex flex-col mt-auto'>
                
                <strong>{product.seller}</strong>
                <strong>Price: {product.price} TL/hour</strong>
            </div>
            </div>
        
        </div>
        
    </Link>
    }
    else if(type.type === pages[3]){
        component = <Link to='/detailsPage' className='my-6 mx-6 w-60 h-60 bg-gray-light rounded-md' key={product.id}>
        <div className='w-auto h-auto flex flex-col justify-center m-6 items-stretch' style={{fontSize:'14px', textAlign: 'left', height: '80%'}}>
            <strong style={{fontSize:'20px', overflowWrap: 'break-word'}}>{product.name}</strong>
            <div className='flex flex-col mt-auto'>
                
                <strong>{product.seller}</strong>
                <strong>Price: {product.price} TL/hour</strong>
            </div>
            {/* <div className='h-20'></div> */}
            
        </div>
    </Link>
    }
    else if(type.type === pages[4]){
        component = <Link to='/detailsPage' className='my-6' key={product.id}>
                        <img            
                        className="h-40 w-32 rounded-md mx-6 my-2"
                            alt=''
                            src={`${product.photo } `}
                        />
                        <div className='w-auto flex flex-col justify-center items-center' style={{fontSize:'12px'}}>
                            <strong>{product.name}</strong>
                            <p>{product.seller}</p>
                            <p>Price: {product.price}</p>
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
