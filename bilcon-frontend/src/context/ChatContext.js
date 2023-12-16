import {createContext, useState, useEffect, useCallback} from "react";
import { io } from "socket.io-client";
import axios from 'axios';

export const ChatContext = createContext();

export const ChatContextProvider = ({children, user}) => { // user is the current user
 
    const baseUrl = "localhost:3000"

    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]); // if two users already have a chat, do not create a new one (potentialChats contain chats that are possible to create)
    const [currentChat, setCurrentChat] = useState(null); // with the current chat use chatId to get the messages for that chat
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(null);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);


    console.log("onlineUsers", onlineUsers);

    useEffect(()=>{
        const newSocket = io("http://localhost:8080"); // port of the socket
        setSocket(newSocket);

        return () => { // cleanup function for disconnecting whenever an user tries to reconnect
            newSocket.disconnect();
        }

    }, [user]);

 /* 
    // add online users
    useEffect(() => {
        if(socket === null) return;

        socket.emit("addNewUser", user?._id);
        socket.on("getOnlineUsers", (res) => { // client listens to socket server, in the getOnilneUsers event of the server, cilent updates the onlineUsers array
            setOnlineUsers(res);
        });

        return () => {
            socket.off("getOnlineUsers");  
        };


    }, [socket]); // whenever socket changes trigger event, therefore [socket] is the dependency array


    //send message socket
    useEffect(() => {
        
        if(socket === null) return;

        const recipientId = currentChat?.members?.find((id) => id !== user?._id);
        socket.emit("sendMessage", {...newMessage, recipientId});



    }, [newMessage]);

    
    // receive message from socket

    useEffect(() => {
        
        if(socket === null) return;

        socket.on("getMessage", res => {
            if(currentChat?._id !== res.chatId) return;

            setMessages((prev) => [...prev, res]);

        });

        return () => {
            socket.off("getMessage");
        }

    }, [socket, currentChat]);


    useEffect(()=>{
        
        const getUserChats = async () =>{
            if(user?._id){
                
                setIsUserChatsLoading(true);
                setUserChatsError(null);

                const response = await axios({
                    method: 'get',
                    url: `http://${baseUrl}/findUserChats/${user?._id}`,
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });

                setIsUserChatsLoading(false);

                if(response.error){
                    return setUserChatsError(response);
                }

                setUserChats(response);
            }
        }
        getUserChats();
    }, [user])



    useEffect(() => {

        const  getUsers = async () => {
            const response = await axios({
                method: 'get',
                url: `http://${baseUrl}/getAllUsers`,
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }); // add getAllUsers to backend api

            if(response.error){
                return console.log("Error fetching users", response);
            }
            const potChats = response.filter((u) => { // filter potential users that a user can have a chat with (currently does not have)
                let isChatCreated = false;

                if(user?._id === u._id){ // dont add current user to potential chat array
                    return false;
                }

                if(userChats){
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id;
                    })
                }
                
                return !isChatCreated;

            });


            setPotentialChats(potChats);

        }
        getUsers();
    }, [userChats]);


   useEffect(()=>{
        
        const getMessages = async () =>{
                
            console.log(currentChat);
                setIsMessagesLoading(true);
                setMessagesError(null);

                const response = await axios({
                    method: 'get',
                    url: `${baseUrl}/getMessages/${currentChat?._id}`,
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });

                setIsMessagesLoading(false);

                if(response.error){
                    return setMessagesError(response);
                }

                setMessages(response);
            
        }
        getMessages();
    }, [currentChat])  */

    /**
     * In the front-end the below function can be called like:
     * <button className = "send-btn" onClick{() => sendTextMessage (textMessage, user, currentChat._id, setTextMessage)}>
     * 
     * When user tries to send a message like clicking a button above, frontend will call the backend api called /sendMessage.
     * Socket server will automatically update the state of the chat component internally, there is no need for extra requests to socket server.
     * 
     * 
     */
    const sendTextMessage = useCallback (async (textMessage, sender, currentChatId, setTextMessage) => {

        if(!textMessage) return console.log("You must type something")

        const response = await axios({
            method: 'post',
            url: `${baseUrl}/sendMessage`,
            headers: { 'Content-Type': 'application/json' },
            body: {
                "chatId" : currentChatId,
                "senderId": sender._id,
                "text": textMessage
            },
            withCredentials: true
        });
        if(response.error){
            return setSendTextMessageError(response);
        }

        setNewMessage(response);
        setMessages((prev) => [...prev, response]);
        setTextMessage(""); 
        /**
         * setTextMessage(""); 
         * Clearing the textMessage state results in the 
         * input field being cleared, providing a visual indication to 
         * the user that the message has been sent and encouraging them to 
         * start typing a new message.
         **/

    }, []);


    const updateCurrentChat = useCallback((chat) => { // Update the current chat. Among an array of chat objects, when the user clicks on a certain one, feed that chat as input.
        setCurrentChat(chat);
    }, [])


    const createChat = useCallback( async (firstId, secondId) => {
        const response = await axios({
            method: 'post',
            url: `${baseUrl}/createChat`,
            headers: { 'Content-Type': 'application/json' },
            body: {
                "firstId": firstId,
                "secondId": secondId
            },
            withCredentials: true
        });
            if(response.error){
                return console.log("Error creating chat", response);
            }

        setUserChats((prev) => [...prev, response]);
            

    },[]);

    return (<ChatContext.Provider value = {{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        sendTextMessage,
        onlineUsers,

    }}>
        {children}
    </ChatContext.Provider>);

};

