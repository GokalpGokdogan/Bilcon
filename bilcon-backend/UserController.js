const User = require("./user");
const UserDB = require("./userDb");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { resolve } = require("path");
const { rejects } = require("assert");
const saltRounds = 10;

class UserController{
    
    constructor(){
        
    }
    /* 
    Adds the user with the given parameters to database. First checks if the email or student id is already being used and if so, it returns false
    and doesnt create the user. If not, it creates a new user and saves it to database.
    */
    /*async addUser(nameOfUser, emailOfUser, studentIdOfUser, userIdOfUser, passwordOfUser){
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
    } */
    /* 
    Checks if there exists a user with the given email or student id. If so, it returns false. Ef not, it returns true.
    
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
    */
    


    async loginUser(studentIdOfUser, passwordOfUser) {
        try {
            let doesExists = await this.userExistsID(studentIdOfUser);
            if (doesExists) {
                const userDB = UserDB;
                const foundUser = await userDB.findOne({ studentId: studentIdOfUser });
    
                return new Promise((resolve, reject) => {
                    bcrypt.compare(passwordOfUser, foundUser.password, function (err, result) {
                        if (result === true) {
                            console.log(`User with ID ${foundUser.studentId} has logged in.`);
                            resolve(foundUser);
                        } else {
                            console.log("Entered wrong password");
                            resolve(null);
                        }
                    });
                });
            } else {
                console.log("User with entered ID does not exist.");
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async registerUser(nameOfUser, emailOfUser, studentIdOfUser, passwordOfUser){
        bcrypt.hash(passwordOfUser, saltRounds, async  (err, hash)=> {
            let user = new User(nameOfUser, emailOfUser, studentIdOfUser, passwordOfUser, false);
            await this.saveUserToDB(user, hash);
        })

    }
    async sendVerificationMail(User){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bilconwebapp@gmail.com',
                pass: 'vnjt ydrm hqkn fpth'
            }
          });


          const token = jwt.sign({ 
            data: 'Token Data'  
            }, 'ourSecretKey', { expiresIn: '15m' }   
        ); 

        await transporter.sendMail({
            from: 'bilconwebapp@gmail.com',
            to: User.email,
            subject: "Verify Your Mail to Complete Registration Process",
            html: `Hi ${User.name} 👋, <br>Please follow <a href = http://localhost:3000/verify/${token}/${User.email}>this link </a> to verify your email.
            <br>Note: Activation link expires in 15 minutes.
            <br><br>Thanks,
            <br>Bilcon Web App Team` 
        });
        console.log(`Email sent to ${User.email}`);
    }
    async saveUserToDB(User , hash){
        if(await this.userExists(User.email, User.studentId)){
            console.log("User already exists");
        }
        else{
            await this.sendVerificationMail(User);
            const addedUser = new UserDB({                
                name: User.name,
                email: User.email,
                studentId: User.studentId,                
                password: hash,
                isVerified: false             
            });
            addedUser.save();            
        }
    }
    async userExists(mail , id){        
        const userDB = UserDB;
        let exists = userDB.findOne({email: mail})
        .then((result) => {
            if(result !== null){
                return true;
            }
            else{
                return userDB.findOne({studentId: id})
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
    async userExistsID(id){        
        const userDB = UserDB;
        let exists = userDB.findOne({studentId: id})
        .then((result) => {
            if(result !== null){
                return true;
            }
            else{
                return false;
            }
        });        
       return await exists;
    }
    async activateUser(userEmail){        
        const userDB = UserDB;
        let updatedUser = await userDB.findOneAndUpdate({email: userEmail}, {isVerified: true});
    }
}
module.exports = UserController;