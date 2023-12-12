class User{
    #name;
    #email;
    #studentId;    
    #password;
    #isVerified;
    //#emailToken;
    constructor(name, email, studentId, password, isVerified){
        this.#name = name;
        this.#email = email;
        this.#studentId = studentId;        
        this.#password = password;
        this.#isVerified = isVerified      
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

}

module.exports = User;