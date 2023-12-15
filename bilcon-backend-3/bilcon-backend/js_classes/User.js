class User{
    #name;
    #email;
    #studentId;    
    #password;
    #isVerified;
    #posterId;
    #customerId;
    #rating;
    #raterCount;
    #boughtTransactions;
    #soldTransactions;    
    constructor(name, email, studentId, password, isVerified, posterId, customerId, rating, raterCount){
        this.#name = name;
        this.#email = email;
        this.#studentId = studentId;        
        this.#password = password;
        this.#isVerified = isVerified;
        this.#posterId = posterId;
        this.#customerId = customerId;
        this.#rating = rating;
        this.#raterCount = raterCount;     
        this.#boughtTransactions = []; 
        this.#soldTransactions = [];
    }

    get name(){
        return this.#name;
    }
    
    get email(){
        return this.#email;
    }

    get studentId(){
        return this.#studentId;
    }


    get password(){
        return this.#password;
    }
    get isVerified(){
        return this.#isVerified;
    }

    get posterId(){
        return this.#posterId;
    }

    get customerId(){
        return this.#customerId;
    }

    get rating(){
        return this.#rating;
    }

    get raterCount(){
        return this.#raterCount;
    }
    get boughtTransactions(){
        return this.#boughtTransactions;
    }
    get soldTransactions(){
        return this.#soldTransactions;
    }


    set name(newName){
        this.#name = newName;
    }

    set email(newEmail){
        this.#email = newEmail;
    }

    set studentId(newStudentId){
        this.#studentId = newStudentId;
    }

    set password(newPassword){
        this.#password = newPassword;
    }
    set isVerified(newIsVerified){
        this.#isVerified = newIsVerified;
    }
    set posterId(newPosterId){
        this.#posterId = newPosterId;
    }

    set customerId(newCustomerId){
        this.#customerId = newCustomerId;
    }

    set rating(newRating){
        this.#rating = newRating;
    }

    set raterCount(newRaterCount){
       this.#raterCount = newRaterCount;
    }
    set boughtTransactions(newBoughtTransactions){
        this.#boughtTransactions = newBoughtTransactions;
     }
    set soldTransactions(newSoldTransactions){
        this.#soldTransactions = newSoldTransactions;
     }

}

module.exports = User;