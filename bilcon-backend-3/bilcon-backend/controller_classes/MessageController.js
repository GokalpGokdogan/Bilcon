const messageModel = require('../db_modules/MessageDb');


class messageController{

    async checkUserExists(emailOfUser, studentIdOfUser){
        const userDb = UserDB;
        let exists = userDb.findOne({email: emailOfUser})
        .then((result) => {
            if(result !== null){
                return true;
            }
            else{
                return userDb.findOne({studentId: studentIdOfUser})
                .then((result) => {
                if(result !== null){
                    return true;
                }
                else{
                    return false;
                }
                });
            }
        });
       return exists;
    } 

    // conversationTuple contains the ids of users, that is: let "0" and "1" be the ids of the two users.
    // then taking the id of the users, we sort them in ascending order and concatanate them into a string.
    // In this case, "1" and "0" are sorted and concatanated and the result is: conversationTuple = "01"
    //
    // text: text that the user entered
    // id of the sender user 
    async sendMessage(participants, text, sentFrom){


        const MessageDb = messageModel;
        let addMessageToConversation = this.checkIfConversationExist(participants)
            .then((result) => {
                
                //let message = new Message(text, sentFrom)
                const  newMessage = {
                    sentFrom: sentFrom,
                    text: text
                }

                if(result !== null){
                  return  MessageDb.findOneAndUpdate(
                        { participants: participants },
                        { $push: { messages: newMessage }})
                        .then((result) => {
                            console.log(result);
                            return true;
                            
                        })
                        .catch((err) =>{
                            return false;
                        });

                }
                else{

                    const conversation = MessageDb({
                        participants: participants,
                        messages : [newMessage]
                    });
                    
                    
                    return conversation.save()
                        .then((result) => {
                            return true;
                        })
                        .catch((err) => {
                            console.log("error");
                            return false;
                        })

                }

            });
        return addMessageToConversation;
    }

   
    async checkIfConversationExist(participants){

        const MessageDb = messageModel;
        let conversation = MessageDb.findOne({participants : participants})
            .then((result) => {
                return result;
            });
            
            return conversation;
    }
    // returns the conversation of two users,  
    //
    async getConversation(participants){

        const MessageDb = messageModel;
        let conversation = MessageDb.findOne({participants : participants})
        .then((result) => {
            return result;
        });
        
        return conversation;

    }




    // 
    //
    //  Creates conversation for the two users. The two user ids are given. For example: user1ID = "5", user2ID = "7".
    // Then, conversation tuple is created as : conversationTuple = "57" (in sorted order 5 < 7). 
    //
    async createConversation(participants){

        const MessageDb = messageModel;

        let created = this.checkIfConversationExist(participants)
            .then((result) => {

                if(result){
                    return this.getConversation(participants);
                }

                else{
                    const conversation = MessageDb({
                        participants: participants,
                        messages : []
                    });

                    return conversation.save()
                        .then((result) => {
                            return result;
                        })
                        .catch((err) => {
                            console.log("error during creating conversation");
                            return false;
                        })
                }
            })
            return created;

    }


    async getAllConversations(userId){


        const MessageDb = messageModel;
        let conversations = MessageDb.find({participants : {$in : [userId]}})
            .then((res) => {
                return res;
            }).catch((err) => {
                console.log(err);
                return false;
            });
        return conversations;
    };  


}


module.exports = messageController;