import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Message from './ui-component/message';
import Header from './ui-component/header';
import NavMenu from './ui-component/navMenu';  



function setList(/*type,pageOffset*/){
    let list = [];
    for (let i = 0; i < 20; i++) {
        
        let obj = <Message type={i%2==0? 'Self':'Other' }></Message>;
        
        
        
        list.push(
            <div className='inline-block w-[50vw]'>
                {obj}
            </div>
        );
    }
    return list;
}

function Chat({OtherId = '22222222'} /*{nameIn="Nameless", priceIn=-1, sellerIn="@Gokalp", imgIn='https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg', key="" }*/) 
{
    
    /**filter = database; */
    // let products = setList(/*filter*/);
    // console.log(productIn.productIn)



    // const pages = ['Market', 'Renting', 'Lost & Found', 'Private Lessons', 'Course Trading'];

    const list = setList();

    

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
    let seller = {name:'@Gokalp',img:'https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg',rating:4.5}

    const starIcons = Array.from({ length: Math.ceil(seller.rating)  }, (_, i) => (
        <svg key={i} className='my-auto' width="2vw" height="2vw" viewBox="0 0 36 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
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
    const user = <div className='flex flex-row items-center'>
                    <img
                        className="h-[36px] w-[36px] rounded-full my-auto mr-[1vw]"
                        alt=''
                        src={`${seller.img } `}
                    />
                    <div className=' flex flex-row'>
                        <div className='flex items-center mr-[1vw]'>
                            <strong className='text-[24px]'>{(seller.name).replace('@','')}</strong>
                        </div>
                        <div className='flex flex-row'>
                            {starIcons}
                        </div>
                    </div>
                </div>
    
    return(
        
        <div className='bg-white h-screen'>

                <div className='fixed top-0 w-full bg-white pb-2'>
                    <Header type='Market'/>
                    <NavMenu currPage='Chat'/>
                </div>  
            <div className='bg-white h-screen pt-28'>
                    
                
                <div className='fixed mt-6 w-screen bg-white p-2 px-0 flex justify-center items-center'>
                    <div className="flex flex-row bg-ui-purple w-[54vw] text-white text-2xl p-3 rounded-md shadow-lg">
                        {/* Header Block */}
                        {user}
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-auto">
                            Rate User
                        </button>
                    </div>
                </div>
                <div className='flex flex-col items-center bg-white'>
                    
                    
                    <div className='mt-36 w-[50vw]'>
                        
                        {list}
                    </div>

                    <div className='fixed bottom-0 bg-white p-2 pb-4 w-full flex justify-center'>
                        <div className="relative w-[50vw] mx-2">
                            <input type="text" className="border border-gray bg-gray-light text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-2.5 w-full" placeholder="Write here..." required=""></input>
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-ui-purple hover:bg-blue-700 text-white font-bold my-1/2 py-1 px-4 rounded">
                                Send
                            </button>
                            
                        </div>
                    </div>

                </div>

            </div>
        </div>

        

       
    );
}

export default Chat;
