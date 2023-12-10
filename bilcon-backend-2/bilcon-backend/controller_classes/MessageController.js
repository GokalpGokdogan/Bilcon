const messageModel = require('../db_modules/MessageDb');


class messageController{

    async createMessage(chatId, senderId, text){
        const message = new messageModel({chatId, senderId, text});

    try{

        const response = await message.save();
        return response;

    }catch(error){

        console.log(error);

        return false;
    }
    };


    async getMessages(chatId){
        try{
        
            const messages = await messageModel.find({chatId});
            res.status(200).json(messages);
    
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    };

}

module.exports = messageController;