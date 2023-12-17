const User = require("../js_classes/User");
const UserDB = require("../db_modules/UserDb");
const PosterController = require("./PosterController");
const CustomerController = require("./CustomerController");
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
    //Method for logging user in.
    async loginUser(studentIdOfUser, passwordOfUser) {
        try {
            let doesExists = await this.userExistsID(studentIdOfUser); //Checking whether there is a user with given ID
            if (doesExists) {
                const userDB = UserDB;
                //User with given ID is received from Database
                const foundUser = await userDB.findOne({ studentId: studentIdOfUser });
    
                return new Promise((resolve, reject) => {
                    //bcrypt is hashing and salting module for storing passwords safely.
                    bcrypt.compare(passwordOfUser, foundUser.password, function (err, result) {
                        if (result === true && foundUser.isVerified === true) {
                            console.log(`User with ID ${foundUser.studentId} has logged in.`);
                            resolve(foundUser); //If entered password is correct, foundUser is passed to frontend.
                        } 
                        else if(result ===true && foundUser.isVerified ===false){
                            resolve (false); //If there is a user with given id, but it is not activated via mail yet.
                        }
                        else {
                            console.log("Entered wrong password");
                            resolve(null); //If entered password is incorrect
                        }
                    });
                });
            } else {
                console.log("User with entered ID does not exist."); //If user with given id does not exist
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async registerUser(nameOfUser, emailOfUser, studentIdOfUser, passwordOfUser){
        if(!await this.userExistsID(studentIdOfUser)){
            bcrypt.hash(passwordOfUser, saltRounds, async  (err, hash)=> {
                let user = new User(nameOfUser, emailOfUser, studentIdOfUser, passwordOfUser, false);
                await this.saveUserToDB(user, hash);
            })
        }
        else{
            console.log("User already exists.");
        }


    }
    //This is method for sending registration confirmation mail
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
            //If there aren't any user with given id, user is saved to Database but not verified(as his/her status)
            await this.sendVerificationMail(User);
            const userDb = UserDB;
            await userDb.create({                
                name: User.name,
                email: User.email,
                studentId: User.studentId,                
                password: hash,
                isVerified: false,
                posterId: " ",
                customerId: " ",
                rating: -1,
                raterCount: 0,
                totalRating: 0
            }).then(async (res) => {
                let userId = res._id;
                let posterController = new PosterController(" ", " ");
                let customerController = new CustomerController(" ", " ");
                let posterId = await posterController.createPosterInDb(userId);
                let customerId = await customerController.createCustomerInDb(userId);
                await userDb.findByIdAndUpdate(userId, {
                    posterId: posterId,
                    customerId: customerId
                });

            })
                        
        }
    }
    async getUserObjectIdByPosterId(posterId){
        const userDb = UserDB;
        let userId = await userDb.findOne({posterId: posterId});
        userId = userId._id;
        return userId;
    }
    async getNameByUserId(userId){
        const userDb = UserDB;
        return userDb.findById(userId).then((res) => {
            return res.name;
        });
    }

    async getEmailByUserId(userId){
        const userDb = UserDB;
        return userDb.findById(userId).then((res) => {
            return res.email;
        });
    }
    //Checking whether user exists with given mail and id
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
    //When user confirms the link, his/her isVerified status is changed to true.
    async activateUser(userEmail){        
        const userDB = UserDB;
        let updatedUser = await userDB.findOneAndUpdate({email: userEmail}, {isVerified: true});
    }

    async getPosterIdByUserId(userId){
        const userDb = UserDB;
        return userDb.findById(userId).then((res) => {
            return res.posterId;
        });
    }

    async getCustomerIdByUserId(userId){
        const userDb = UserDB;
        return userDb.findById(userId).then((res) => {
            return res.customerId;
        });
    }

    async getPosterIdByName(name){
        const userDb = UserDB;
        return userDb.findOne({name: name}).then((res) => {
            console.log(res);
            return res.posterId;
        });
    }

    async getNamesOfPosterIds(posterIdArray){
        const userDb = UserDB;

        return userDb.find({
            posterId: {
                $in: posterIdArray
            }
        }).then((res) => {
            let nameArray = res.map((user) => {
                return user.name;
            });
            let willReturn = [];
            let pointer = 0;
            willReturn.push(nameArray[pointer]);
            for(let i = 1; i < posterIdArray.length; i++){
                if(posterIdArray[i] == posterIdArray[i - 1]){
                    willReturn.push(nameArray[pointer]);
                }
                else{
                    pointer++;
                    willReturn.push(nameArray[pointer]);
                }
            }
            return willReturn;
        });

    }
    //This method will change the password of user with given email.
    async changePassword(emailOfUser, newPassword){
        bcrypt.hash(newPassword, saltRounds, async  (err, hash)=> {
            const userDB = UserDB;
            let updatedUser = await userDB.findOneAndUpdate({email: emailOfUser}, {password: hash});
        })
    }
    //sending a mail for changing password
    async sendMailForPassword(userEmail, userName){
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
            to: userEmail,
            subject: "Password Change Request",
            html: `Hi ${userName} 👋, <br>Please follow <a href = http://localhost:3000/newPassword/${token}>this link </a> to change your password.
            <br>Note: Activation link expires in 15 minutes.
            <br><br>Thanks,
            <br>Bilcon Web App Team` 
        });
        console.log(`Email sent to ${userEmail} (password change request)`);
    }

    async accessUserWithId(studentIdOfUser) {
        try {
            let doesExists = await this.userExistsID(studentIdOfUser);
            if (doesExists) {
                const userDB = UserDB;
                const foundUser = await userDB.findOne({ studentId: studentIdOfUser });
                return foundUser;
            } else {
                console.log("User with entered ID does not exist.");
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async sendMailForForgotPassword(userEmail, userName, userId){
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
            to: userEmail,
            subject: "Password Reset Request",
            html: `Hi ${userName} 👋, <br>Please follow <a href = http://localhost:3000/resetPassword/${token}/${userId}>this link </a> to reset your password.
            <br>Note: Activation link expires in 15 minutes.
            <br><br>Thanks,
            <br>Bilcon Web App Team` 
        });
        console.log(`Email sent to ${userEmail} (password change request)`);
    }

    //Sending mail to user to notify that a user is interested in his/her product.
    async sendMailForRequest(requestedUserEmail, requestedUserName, userEmail, userName, userId, itemName){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bilconwebapp@gmail.com',
                pass: 'vnjt ydrm hqkn fpth'
            }
          });

        await transporter.sendMail({
            from: 'bilconwebapp@gmail.com',
            to: requestedUserEmail,
            subject: "Contact Request",
            html: `Hi ${requestedUserName} 👋, <br>Bilcon Web App user ${userName} with id ${userId} wants to contact you about ${itemName}.
            <br>You can contact ${userName} by ${userEmail},
            <br>Bilcon Web App Team` 
        });
        console.log(`Email sent to ${requestedUserEmail} (contact request)`);
    }
}
module.exports = UserController;
