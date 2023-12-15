class Chat{

    #members
    
        constructor(members){
            this.#members = members;
        }
        get members() {
            return this.#members;
          }
        set members(newMembers){
            this.#members = newMembers;  
         }
    
    }
    
    module.exports = Chat;