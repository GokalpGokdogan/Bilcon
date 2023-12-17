import React, {useState, useEffect, useRef, useContext} from 'react';
import { Link } from 'react-router-dom';
import Message from './ui-component/message';
import Header from './ui-component/header';
import NavMenu from './ui-component/navMenu';  
import { ChatContext } from '../context/ChatContext';

/*

    The structure of a conversation is as follows (It is in MessageDb class inside db_modules):

    *****************************************************************************

    participants: Array, // Array of user IDs participating in the conversation For example: participants = ["7", "9"] implies that, user1Id = "7", user2Id = "9" 
    messages: [
        {
            sentFrom: { // sender id
            type: String,
            required : true
            },

            text: { // actual text user is sending
            type: String,
            required : true
            },

            timestamp: { type: Date, default: Date.now }, // timestamp of the sent message 
        }
    ]
    *****************************************************************************


    3 functions are in the backend:
    1) /sendMessage
    2) /createConversation
    3) /getConversation
    4) /getAllConversations

    1) /SendMessage
        const {participants, text, sentFrom} = req.body;
            participants is a array string of two user ids in sorted order. For example: user2Id = "6", user2Id = "8", then participants = ["6", "8"]. (6 < 8 (lexicgrophic order)).
            text is the text user enters
            sentFrom is the user id of the sender

            

    2) /createConversation
        const {participants} = req.body;
        participants is  string array of two user ids in sorted order, as explained in 1).

        When user wants to create a chat with a user, this function will be called. !Edge case is they already have a created chat.
        In that case, the function returns the existing conversation. So when the page changes to the chatBox page, you have the necessary conversation to display. 
        If the chat is newly created, then, it will return an empty conversation, which can be displayed as empty.

    3) /getConversation
        const {participants} = req.body;
    
        When user clicks on a chatBox, this function will be called. It returns the conversation from the db.
    4) /getAllConversations
        const {participant} = req.body;
        For example: "0", is given as the body, then it returns all conversation that has the user "0" as a participant. Can be used when displaying the different chats a user has.
    

        
    Example Scenario:

    1) User looks at a post, and clicks on a designated button that creates a chat with the owner of the post. (The button must contain the id of the post owner for future use.)
    2) The button calls the /createConversation endpoint, request body is the string array of the current user's id and the poster's owner id in sorted order. E.g: currentUserID = "22", posterOwnerId = "33", then, 
    request body is: {"participants" : ["22", "33"]}.

    3) Assumption: The button changes the page to the chatBox page
        3.1) (They have a past conversation) 
            Then, /createConversation endpoints returns the previous messages of the two users for display. The user enters a text and presses the send button.
            Then, /SendMessage function is called with the request body: 
                {
                    "participants" : "this is the same with the current conversation's participants key value" , 
                    text : "text the user entered",
                    sentFrom "sender's id": 
                }

        3.2) (They dont have a past conversation)
            Then, /createConversation endpoints returns the empty messages array of the two users for display. The user enters a text and presses the send button.
            Then, /SendMessage function is called with the request body: 
                {
                    "participants" : "this is the same with the current conversation's participants key value" , 
                    text : "text the user entered",
                    sentFrom "sender's id": 
                }
    4) About real time chatting:
                When a user has the page that displays previous chats open, the frontend needs to be aware of this. (adamın chat sayfasını anlık olarak açıp açmadığını anlayamıyosak başka bir şey yapıcam, chat sayfası dediğim adamın 4-5 tane eski chati gözüküyo atıyorum.)
                If we can understand that a given user has his chat page open, then, front end will always call /getAllConversations implicity in small time periods (say 50ms). 

                Yapmaya çalıştığım şu:
                    Adamın 5 tane chati var diyelim. Kendi idsi 0, diğerleri 1,2,3,4,5  olsun. Yani 5 chatin participants kısmı şöyle: [["0", "1"], ... , ["0","5"]]
                    /getAllConversations deyince dönen arrayin içinde farklı conversation objeleri var. Bunları DM sayfasında display ediyoruz for loopla falan.
                    Adamın bu DM sayfasını açtığını anlayıp, 50ms de bir, getAllConversations çağırmamız lazım.
                    Burada, request body'e current userın id sini, yani 0'ı vermeniz lazım. request.body = {participant : "0"}
                    Böylece, db den sürekli conversationların son halini çekebiliriz.

                    Eğer adam spesifik bir chate tıklarsa, aynı mantığın devam etmesi lazım. Bu sefer daha hızlı olması için, sadece bu chati istiyebilirsiniz backendden, / getConversation diyerek.
                    Gene 50ms de bir falan çağırmanız lazım. Atıyorum adam ["0", "3"] chatini açmış olsun, /getConversation 50ms bir çağırıp sürekli ["0", "3"] vererek request body'e.
                    
                    Adam "03" chatinden çıkıp, gene tüm chatlerin olduğu sayfaya dönerse, gene /getAllConversation çağırmamız lazım yukarda ilk anlattığımdaki gibi.
                    FSM gibi aslında, her bir sayfa bir sinyal gibi ve state değiştiriyoruz.

 */

function Chat({userId} /*{nameIn="Nameless", priceIn=-1, sellerIn="@Gokalp", imgIn='https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg', key="" }*/) 
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

    const sendMessage = () => { // call /sendMessage here.
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
        <div className='flex flex-col items-center justify-between'>
            <strong className='text-ui-purple'> Please Rate User </strong>
            <div className='flex flex-row items-center justify-between'>
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
