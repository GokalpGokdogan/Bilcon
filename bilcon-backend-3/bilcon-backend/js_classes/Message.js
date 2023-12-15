class Message{

    #chatId
    #senderId
    #text


    constructor(chatId, senderId, text){
        this.#chatId = chatId;
        this.#senderId = senderId;
        this.#text = text;
    }   
    get chatId(){
        return this.#chatId;
    }
    get senderId(){
        return this.#senderId;

    }
    get text(){
        return this.#text;
    }
    set chatId(newChatId){
         this.#chatId = newChatId;
    }
    set senderId(newSenderId){
         this.#senderId = newSenderId;

    }
    set text(newText){
         this.#text = newText;
    }

}

module.exports = Message;