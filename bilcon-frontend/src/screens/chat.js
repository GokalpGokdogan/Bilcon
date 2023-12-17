import React, {useState, useEffect, useRef, useContext} from 'react';
import { Link } from 'react-router-dom';
import Message from './ui-component/message';
import Header from './ui-component/header';
import NavMenu from './ui-component/navMenu';  
import { ChatContext } from '../context/ChatContext';



function Chat({OtherId = '22222222'} /*{nameIn="Nameless", priceIn=-1, sellerIn="@Gokalp", imgIn='https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg', key="" }*/) 
{
    
    const chatContext = useContext(ChatContext);

    const {createChat } = chatContext;

    const [list, setList] = useState([]);

    const [newText, setNewText] = useState('');

    const [isOpenEnd, setIsOpenEnd] = useState(false);
    const [noStar, setNoStar] = useState(-1);

    function loadList(){
        let list = [];
        for (let i = 0; i < 20; i++) {
            
            let obj = <Message type={i%2==0? 'Self':'Other' }></Message>;
            
            
            
            list.push(
                <div className='inline-block w-[50vw]'>
                    {obj}
                </div>
            );
        }
        setList(list);
    }

    const sendMessage = () => {
        const newMessage = (
            <div className='inline-block w-[50vw]'>
                <Message type='Self' text={newText}></Message>
            </div>
        );
        setList(prevList => [...prevList, newMessage]);
        setNewText('');
        createChat({"first": "657c3d9453e88c291cb70aaf", "second": "657cdc55ad49a566f0d00109"});
    };

    useEffect(() => {
        loadList();
    }, []);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

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

    const starIconsSpecial = Array.from({ length: 5  }, (_, i) => (
        <button key={i} onClick={() => { setNoStar(i) }}>
            <svg className='my-auto' width="2vw" height="2vw" viewBox="0 0 36 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>Star</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Profile-nav" transform="translate(-11.000000, -4.000000)" fill={ (noStar<i)?"#979797":"#F8E71C"} stroke="none" stroke-width="2">
                        <g id="Group-2" transform="translate(0.000000, -1.000000)">
                            <polygon id="Star" points="29 32.8753882 19.595436 38 21.3915479 27.145898 13.7830957 19.4589803 24.297718 17.8753882 29 8 33.702242 17.8753882 44.2169043 19.4589803 36.6084521 27.145898 38.404564 38"></polygon>
                        </g>
                    </g>
                </g>
            </svg>
        </button>
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
    
    let pop = <div className={'bg-gray-blue z-10 absolute top-full left-[-15vw] border-ui-purple shadow-lg rounded-lg p-4'}>
        <div className='flex flex-col justify-center items-center justify-between'>
            <strong className='text-ui-purple'> Please Rate User </strong>
            <div className='flex flex-row justify-center items-center justify-between'>
                {starIconsSpecial}
            </div>
            
            <button onClick={()=>{ /**rating fn to here */ setIsOpenEnd(!isOpenEnd)}} className="mt-4 bg-ui-purple text-white w-full py-2 rounded hover:bg-purple-700 transition duration-200 ease-in-out">
                Submit
            </button>
        </div>
    </div>

    useEffect(scrollToBottom, [list]);

    
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
                        <div className='relative ml-auto'>
                            <button onClick={ ()=>{setIsOpenEnd(!isOpenEnd)}} className="bg-ig-purple transform transition-transform duration-200 ease-in-out scale-95 hover:scale-100 text-white font-bold py-2 px-4 rounded ml-auto">
                                Rate User
                            </button>
                            {isOpenEnd && (
                                <div className="absolute right-0 top-full">
                                    {pop}
                                </div>
                            )}
                        </div>
                        
                    </div>
                </div>
                <div className='flex flex-col items-center bg-white'>
                    
                    
                    <div className='mt-36 w-[45vw] mb-16 '>
                        
                        {list}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    
                    <div className='fixed bottom-0 bg-white p-2 pb-4 w-full flex justify-center'>
                        <div className="relative w-[50vw] mx-2">
                            <input value={newText} onChange={ (e) => {setNewText(e.target.value)}}
                                                    onKeyDown={ (e) => {if(e.key === 'Enter'){ if(newText != ''){sendMessage()}
                                                    setNewText('') 
                                                    }}} 
                                                    type="text" className="border border-gray bg-gray-light text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-2.5 w-full" placeholder="Write here..." required=""></input>
                            <button onClick={ () =>{ if(newText != ''){sendMessage()}
                                                setNewText('') 
                                            }} 
                                    
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-ui-purple hover:bg-blue-700 text-white font-bold my-1/2 py-1 px-4 rounded">
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
