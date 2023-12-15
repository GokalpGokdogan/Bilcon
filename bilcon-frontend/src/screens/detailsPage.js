import React from 'react';
import { Link } from 'react-router-dom';
import NavMenu from './ui-component/navMenu';
import Header from './ui-component/header';
import Product from '../Classes/Product';

    function detailsPage({productIn, type = 'Course Trading'}) 
    {
        const product = productIn || new Product();
        const pages = ['Market', 'Renting', 'LostandFound', 'PrivateLessons', 'CourseTrading'];
        const starIcons = Array.from({ length: 5 /**account.rating.ceil */ }, (_, i) => (
            <svg key={i} className='my-auto' width="1vw" height="1vw" viewBox="0 0 36 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>Star</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Profile-nav" transform="translate(-11.000000, -4.000000)" fill="#F8E71C" stroke="none" stroke-width="2">
                        <g id="Group-2" transform="translate(0.000000, -1.000000)">
                            <polygon id="Star" points="29 32.8753882 19.595436 38 21.3915479 27.145898 13.7830957 19.4589803 24.297718 17.8753882 29 8 33.702242 17.8753882 44.2169043 19.4589803 36.6084521 27.145898 38.404564 38"></polygon>
                        </g>
                    </g>
                </g>
            </svg>
        ));
        const line = <hr className='border-gray border-1 w-100 my-[1vw]'/>
        const user = <div className='flex flex-row items-center mb-[1vw]'>
                        <img
                            className="h-[32px] w-[32px] rounded-full my-auto mr-[1vw]"
                            alt=''
                            src={`${product.img } `}
                        />
                        <div className='mt-0 flex flex-row'>
                            <div className='mr-[1vw]'>
                                <strong className='text-[14px] mt-0'>{(product.seller).replace('@','')}</strong>
                            </div>
                            <div className='flex flex-row mt-0'>
                                {starIcons}
                            </div>
                        </div>
                    </div>
        let component;
        console.log(product)
        if (type === pages[0]) {
            component = <div className='flex flex-col bg-white justify-center items-center'>

                            <Header/>
                            <NavMenu currPage="Details Page"/>
                            <h1 className='font-inter font-extrabold text-3xl text-ui-purple my-2'>{product.name}</h1>
                            <div className='flex flex-row bg-gray-light rounded-xl'>
                                <div>
                                    <img
                                        className="h-[32vw] w-[24vw] rounded-md m-[2vw]"
                                        alt=''
                                        src={`${product.img } `}
                                    />
                                </div>
                                <div className='block h-[20vw] w-[50vw]'>
                                    <div className='flex flex-col justify-center text-ellipsis m-6 items-left'>
                                        {user}
                                        {line}
                                        <div className='relative flex-col h-[20vw] w-[45vw] overflow-hidden text-ellipsis '>
                                            <p>
                                                {product.description}
                                            </p>
                                            <div style={{ paddingTop: '50%' }}></div>
                                        </div>
                                        {line}
                                        <p>
                                            <strong>Price:</strong> {product.price} TL  {product.negotiable? '(Negotiable)':''}
                                        </p>
                                        {line}
                                        {/* DM */}
                                        <div>
                                            <Link to='/Market' /**Change it to correct form */ className='bg-ui-purple rounded-md text-white p-3 inline-block' key={product.id}/**Change it to correct id */>
                                                DM {(product.seller).replace('@','')}
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
                            <h1 className='font-inter font-extrabold text-3xl text-ui-purple my-2'>{product.name}</h1>
                            <div className='flex flex-row bg-gray-light rounded-xl'>
                                <div>
                                    <img
                                        className="h-[32vw] w-[24vw] rounded-md m-[2vw]"
                                        alt=''
                                        src={`${product.img } `}
                                    />
                                </div>
                                <div className='block h-[20vw] w-[50vw]'>
                                    <div className='flex flex-col justify-center text-ellipsis m-6 items-left'>
                                        {user}
                                        {line}
                                        <div className='relative flex-col h-[20vw] w-[45vw] overflow-hidden text-ellipsis '>
                                            <p>
                                                {product.description}
                                            </p>
                                            <div style={{ paddingTop: '50%' }}></div>
                                        </div>
                                        {line}
                                        <p>
                                            <strong>Price:</strong> {product.price/product.rentDurationNumber} TL/{product.rentDurationType}  Total Price: {product.price} TL/{product.rentDurationType}  {product.negotiable? '(Negotiable)':''}
                                        </p>
                                        {line}
                                        {/* DM */}
                                        <div>
                                            <Link to='/Market' /**Change it to correct form */ className='bg-ui-purple rounded-md text-white p-3 inline-block' key={product.id}/**Change it to correct id */>
                                                DM {(product.seller).replace('@','')}
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
                            <h1 className='font-inter font-extrabold text-3xl text-ui-purple my-2'>{product.name}</h1>
                            <div className='flex flex-row bg-gray-light rounded-xl'>
                                <div>
                                    <img
                                        className="h-[32vw] w-[24vw] rounded-md m-[2vw]"
                                        alt=''
                                        src={`${product.img } `}
                                    />
                                </div>
                                <div className='block h-[20vw] w-[50vw]'>
                                    <div className='flex flex-col justify-center text-ellipsis m-6 items-left'>
                                        {user}
                                        <div className='flex flex-row text-ui-pruple items-stretch'>
                                            <div className='flex flex-row mr-auto'>
                                                <img className='h-4 w-4 my-auto mr-[1vw]' alt='' src='https://png.pngtree.com/png-clipart/20191121/original/pngtree-vector-location-icon-png-image_5159127.jpg'/>
                                                <p className='text-gray'>Lorem Ipsum </p> 
                                            </div>

                                            <p className='text-gray mr-4'>--/--/---- </p>
                                        </div>
                                        {line}
                                        <div className='relative flex-col h-[20vw] w-[45vw] overflow-hidden text-ellipsis '>
                                            <p>
                                                {product.description}
                                            </p>
                                            <div style={{ paddingTop: '50%' }}></div>
                                        </div>
                                        
                                        
                                        {line}
                                        {/* DM */}
                                        <div>
                                            <Link to='/Market' /**Change it to correct form */ className='bg-ui-purple rounded-md text-white p-3 inline-block' key={product.id}/**Change it to correct id */>
                                                DM {(product.seller).replace('@','')}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                


                            </div>
                            
                        </div>
        } else if (type === pages[3]) {
            component = <div className='flex flex-col bg-white justify-center items-center'>

                            <Header/>
                            <NavMenu currPage="Details Page"/>
                            <h1 className='font-inter font-extrabold text-3xl text-ui-purple my-2'>{product.name}</h1>
                            <div className='flex flex-row bg-gray-light rounded-xl'>
                                <div className="flex h-[34vw] w-[32vw] items-center justify-center">
                                    <img
                                        className="h-[32vw] w-[24vw] rounded-md m-[1vw]"
                                        alt=''
                                        src={`${product.img } `}
                                    />
                                </div>
                                <div className='block h-[20vw] w-[50vw]'>
                                    <div className='flex flex-col justify-center text-ellipsis m-6 items-left'>
                                        {user}
                                        <div className='flex flex-row text-ui-pruple items-stretch'>
                                            <div className='flex flex-row mr-auto'>
                                                <img className='h-4 w-4 my-auto mr-[1vw]' alt='' src='https://png.pngtree.com/png-clipart/20191121/original/pngtree-vector-location-icon-png-image_5159127.jpg'/>
                                                <p className='text-gray'>Lorem Ipsum </p> 
                                            </div>

                                            <p className='text-gray mr-4'>--/--/---- </p>
                                        </div>
                                        {line}
                                        <div className='relative flex-col h-[16vw] w-[45vw] overflow-hidden text-ellipsis '>
                                            <p>
                                                {product.description}
                                            </p>
                                            <div style={{ paddingTop: '50%' }}></div>
                                        </div>
                                        
                                        {line}
                                        <p>
                                            <strong>Price:</strong> {product.price/product.rentDurationNumber} TL/{product.rentDurationType}  Total Price: {product.price} TL/{product.rentDurationType}  {product.negotiable? '(Negotiable)':''}
                                        </p>
                                        {line}
                                        {/* DM */}
                                        <div>
                                            <Link to='/Market' /**Change it to correct form */ className='bg-ui-purple rounded-md text-white p-3 inline-block' key={product.id}/**Change it to correct id */>
                                                DM {(product.seller).replace('@','')}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                


                            </div>
                            
                        </div>
           } else if (type === pages[4]) {
            component = <div className='flex flex-col bg-white justify-center items-center'>

                            <Header/>
                            <NavMenu currPage="Details Page"/>
                            <h1 className='font-inter font-extrabold text-3xl text-ui-purple my-1'>{product.name}~{product.price}{/**[lecture code]~[section no] */}</h1>
                            <div className='flex flex-row bg-gray-light rounded-xl'>
                                <div>
                                    <img
                                        className="h-[32vw] w-[24vw] rounded-md m-[2vw]"
                                        alt=''
                                        src={`${product.img } `}
                                    />
                                </div>
                                <div className='block h-[20vw] w-[50vw]'>
                                    <div className='flex flex-col justify-center text-ellipsis m-6 items-left'>
                                        {user}
                                        <div className='flex flex-row text-ui-pruple items-stretch'>
                                            <div className='flex flex-row mr-auto'>
                                                <img className='h-4 w-4 my-auto mr-[1vw]' alt='' src='https://png.pngtree.com/png-clipart/20191121/original/pngtree-vector-location-icon-png-image_5159127.jpg'/>
                                                <p className='text-gray'>Lorem Ipsum </p> 
                                            </div>

                                            <p className='text-gray mr-4'>--/--/---- </p>
                                        </div>
                                        {line}
                                        <div className='relative flex-col h-[20vw] w-[45vw] overflow-hidden text-ellipsis '>
                                            <p>
                                                {product.description}
                                            </p>
                                            <div style={{ paddingTop: '50%' }}></div>
                                        </div>
                                        
                                        
                                        {line}
                                        {/* DM */}
                                        <div>
                                            <Link to='/Market' /**Change it to correct form */ className='bg-ui-purple rounded-md text-white p-3 inline-block' key={product.id}/**Change it to correct id */>
                                                DM {(product.seller).replace('@','')}
                                            </Link>
                                        </div>
                                    </div>
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
