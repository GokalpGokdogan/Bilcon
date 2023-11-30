const User = require("./user");
const UserDB = require("./userDb");
class UserController{
    constructor(){
    }
    /* 
    Adds the user with the given parameters to database. First checks if the email or student id is already being used and if so, it returns false
    and doesnt create the user. If not, it creates a new user and saves it to database.
    */
    async addUser(nameOfUser, emailOfUser, studentIdOfUser, userIdOfUser, passwordOfUser){
        let user = new User(nameOfUser, emailOfUser, studentIdOfUser, userIdOfUser, passwordOfUser);
        let added = this.saveToDB(user)
        .then((result) => {
            if(result){
                return true;
            }
            else{
                return false;
            }
        });
        return await added;
    }
    /* 
    Adds the user object to database(it takes a user object as a parameter). First checks if the email or student id is already being used and if so, it returns false
    and doesnt create the user. If not, it creates a new user and saves it to database.
    */
    async saveToDB(user){
        let isSaved = this.checkUserExists(user.email, user.studentId)
        .then((result) => {
            if(result){
                return false;
            }
            else{
                const userDb = UserDB({
                    name: user.name,
                    email: user.email,
                    studentId: user.studentId,
                    userId: user.userId,
                    password: user.password
                });
                return userDb.save()
                .then((result) => {
                    return true;
                });
            }
        })
        return await isSaved;
    }
    /* 
    Checks if there exists a user with the given email or student id. If so, it returns false. Ef not, it returns true.
    */
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
       return await exists;
    }
}

module.exports = UserController;