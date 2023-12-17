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
                raterCount: 0
            }).then(async (res) => {
                let userId = res._id;
                let posterController = new PosterController();
                let customerController = new CustomerController();
                let posterId = await posterController.createPosterInDb(userId);
                let customerId = await customerController.createCustomerInDb(userId);
                await userDb.findByIdAndUpdate(userId, {
                    posterId: posterId,
                    customerId: customerId
                });

            })
                        
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

    async getPosterIdByUserId(userId){
        const userDb = UserDB;
        return userDb.findById(userId).then((res) => {
            return res.posterId;
        });
    }

    async getCustomerIdByUserId(userId){
        let userDb = UserDB;
        return userDb = userDb.findById(userId).then((res) => {
            return res.customerId;
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
}
module.exports = UserController;