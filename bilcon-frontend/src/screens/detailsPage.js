    import React from 'react';
    import { Link } from 'react-router-dom';
    import NavMenu from './ui-component/navMenu';
    import Header from './ui-component/header';
import Product from '../Classes/Product';

    function detailsPage({productIn, type = 'Renting'}) 
    {
        const product = productIn || new Product();
        const pages = ['Market', 'Renting', 'Lost & Found', 'Private Lessons', 'Course Trading'];
        let component;
        console.log(product)
        if (type === pages[0]) {
            component = <div className='flex flex-col bg-white justify-center items-center'>

                            <Header/>
                            <NavMenu currPage="Details Page"/>
                            <h1 className='font-inter font-extrabold text-3xl text-ui-purple my-4'>CS 315 Book</h1>
                            <div className='flex flex-row bg-gray-light rounded-xl'>
                                <div>
                                    <img
                                        className="h-120 w-96 rounded-md mx-6 my-6"
                                        alt=''
                                        src={`${product.img } `}
                                    />
                                </div>
                                <div className='block w-100 h-100'>
                                    <div className='flex flex-col justify-center text-ellipsis m-6 items-left'>
                                        <p>
                                        <strong>Seller:</strong>   {product.seller}
                                        </p>
                                        <p className='flex flex-col justify-center items-center'>
                                        {product.description}
                                        </p> 
                                        <p>
                                        <strong>Price:</strong> {product.price} TL {product.negotiable? '(Negotiable)':''}
                                        </p>
                                        {/* DM */}
                                        <div>
                                            <Link to='/Market' /**Change it to correct form */ className='bg-ui-purple rounded-md text-white p-3 inline-block' key={product.id}/**Change it to correct id */>
                                                DM {product.seller}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                


                            </div>
                            
                        </div>
        } else if (type === pages[1]) {
            component = <div className='flex flex-col bg-white justify-center items-center'>

                            <Header/>
                            <NavMenu currPage="Details Page"/>
                            <h1 className='font-inter font-extrabold text-3xl text-ui-purple my-4'>CS 315 Book</h1>
                            <div className='flex flex-row bg-gray-light rounded-xl'>
                                <div>
                                    <img
                                        className="h-120 w-96 rounded-md mx-6 my-6"
                                        alt=''
                                        src={`${product.img } `}
                                    />
                                </div>
                                <div className='block w-100 h-100'>
                                    <div className='flex flex-col justify-center text-ellipsis m-6 items-left'>
                                        <p>
                                        <strong>Seller:</strong>   {product.seller}
                                        </p>
                                       <p className='flex flex-col h-[9.5vw] w-[50vw] overflow-hidden'>
                                            {product.description}sjkkkkkkkkjjjjjjjjjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkdssdjfiufsfsjadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                            {product.description}sjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkdssdjfiufsfsjadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                            {product.description}sjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkdssdjfiufsfsjadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                            {product.description}sjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkdssdjfiufsfsjadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                                        </p>
                                        
                                        <p>
                                        <strong>Price:</strong> {product.price/product.rentDurationNumber} TL/{product.rentDurationType}  Total Price: {product.price} TL/{product.rentDurationType}  {product.negotiable? '(Negotiable)':''}
                                        </p>
                                        {/* DM */}
                                        <div>
                                            <Link to='/Market' /**Change it to correct form */ className='bg-ui-purple rounded-md text-white p-3 inline-block' key={product.id}/**Change it to correct id */>
                                                DM {product.seller}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                


                            </div>
                            
                        </div>
        } else if (type === pages[2]) {
            component = <div className='flex flex-col bg-white justify-center items-center'>

                            <Header/>
                            <NavMenu currPage="Details Page"/>
                            <h1 className='font-inter font-extrabold text-3xl text-ui-purple my-4'>CS 315 Book</h1>
                            <div className='flex flex-row'>
                                <div>
                                    <img
                                        className="h-120 w-96 rounded-md mx-6 my-6"
                                        alt=''
                                        src={`${product.img } `}
                                    />
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <p>
                                    <strong>Seller:</strong>   {product.seller}
                                    </p>
                                    <p className='flex flex-col justify-center items-center'>
                                    {product.description}
                                    </p> 
                                    <p>
                                    <strong>Price:</strong> {product.price} TL
                                    </p>
                                    {/* DM */}
                                    <Link to='/Market' /**Change it to correct form */ className='bg-ui-pirple rounded-md text-white' key={product.id}/**Change it to correct id */>
                                    </Link>
                                </div>


                            </div>
                            
                        </div>
        } else if (type === pages[3]) {
            component = <div className='flex flex-col bg-white justify-center items-center'>

                            <Header/>
                            <NavMenu currPage="Details Page"/>
                            <h1 className='font-inter font-extrabold text-3xl text-ui-purple my-4'>CS 315 Book</h1>
                            <div className='flex flex-row'>
                                <div>
                                    <img
                                        className="h-120 w-96 rounded-md mx-6 my-6"
                                        alt=''
                                        src={`${product.img } `}
                                    />
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <p>
                                    <strong>Seller:</strong>   {product.seller}
                                    </p>
                                    <p className='flex flex-col justify-center items-center'>
                                    {product.description}
                                    </p> 
                                    <p>
                                    <strong>Price:</strong> {product.price} TL
                                    </p>
                                    {/* DM */}
                                    <Link to='/Market' /**Change it to correct form */ className='bg-ui-pirple rounded-md text-white' key={product.id}/**Change it to correct id */>
                                    </Link>
                                </div>


                            </div>
                            
                        </div>
        } else if (type === pages[4]) {
            component = <div className='flex flex-col bg-white justify-center items-center'>

                            <Header/>
                            <NavMenu currPage="Details Page"/>
                            <h1 className='font-inter font-extrabold text-3xl text-ui-purple my-4'>CS 315 Book</h1>
                            <div className='flex flex-row'>
                                <div>
                                    <img
                                        className="h-120 w-96 rounded-md mx-6 my-6"
                                        alt=''
                                        src={`${product.img } `}
                                    />
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <p>
                                    <strong>Seller:</strong>   {product.seller}
                                    </p>
                                    <p className='flex flex-col justify-center items-center'>
                                    {product.description}
                                    </p> 
                                    <p>
                                    <strong>Price:</strong> {product.price} TL
                                    </p>
                                    {/* DM */}
                                    <Link to='/Market' /**Change it to correct form */ className='bg-ui-pirple rounded-md text-white' key={product.id}/**Change it to correct id */>
                                    </Link>
                                </div>


                            </div>
                            
                        </div>
        } else {
            component = <div>
            <strong>Unknown Error</strong>
            </div>;
        }
        
    
        return(
            component
        );
    }

    export default detailsPage;
