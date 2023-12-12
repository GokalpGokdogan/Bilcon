// create chat
// get user chats
// findChat

const chatModel = require('../db_modules/ChatDb');

class chatController{


    async createChat(firstId, secondId) {


        try{

            const chat = await chatModel.findOne({
                members : {$all : [firstId, secondId]}
            });
    
            if(chat){
                return res.status(200).json(chat);
            }
    
            const newChat = new chatModel({
                members: [firstId, secondId]
            });
    
            const response = await newChat.save();
    
            
            return response;
    
        }catch(error){
            console.log(error);
            return false;
        }
    };

    

    async findChat(firstId, secondId){
        try{

            const chat = await chatModel.find({
                members: {$all : [firstId, secondId]}
            });
            console.log(chat);
            return chat;
    
    
        }catch(error){
            console.log(error);
            return false;
        }
    };

    async findUserChats(userId){

        try{

            const chats = await chatModel.find({
                members: {$in : [userId]}
            });
    
            return chats;
    
        }catch(error){
            console.log(error);
            return false;
        }
        
    };
}

module.exports = chatController;