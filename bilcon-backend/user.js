class User{
    #name;
    #email;
    #studentId;
    //#userId;
    #password;
    //#isVerified;
    //#emailToken;
    constructor(name, email, studentId, password){
        this.#name = name;
        this.#email = email;
        this.#studentId = studentId;
        //this.#userId = userId;
        this.#password = password;            
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

/*     get userId(){
        return this.#userId;
    } */

    get password(){
        return this.#password;
    }
/*     get isVerified(){
        return this.#isVerified;
    }
    get emailToken(){
        return this.#emailToken;
    } */

    set name(newName){
        this.#name = newName;
    }

    set email(newEmail){
        this.#email = newEmail;
    }

    set studentId(newStudentId){
        this.#studentId = newStudentId;
    }
/* 
    set userId(newUserId){
        this.#userId = newUserId;
    } */

    set password(newPassword){
        this.#password = newPassword;
    }
/*     set isVerified(newIsVerified){
        this.#isVerified = newIsVerified;
    }
    set emailToken(NewEmailToken){
        this.#emailToken = NewEmailToken;
    } */
}

module.exports = User;