const Transaction = require("../js_classes/Transaction");
const UserDB = require("../db_modules/UserDb");
const { resolve } = require("path");
const { rejects } = require("assert");
const UserController = require("../controller_classes/UserController");
const TransactionDB = require("../db_modules/TransactionDb");


class TransactionController{
    
    constructor(){
        
    }

    async addTransactionToUser(studentIdOfUser, studentIdOfRatedUser, itemName, isBought) {
        let userController = new UserController();   
        try {
            let doesRatedUserExists = await userController.userExistsID(studentIdOfRatedUser);
            if (doesRatedUserExists) {
                const userDB = UserDB;
                //add transaction to user
                const transactionDB = TransactionDB;
                
                if(isBought === "true"){
                    const foundUser = await userDB.findOneAndUpdate({ studentId: studentIdOfUser }, { $push: { boughtTransactions: {itemName: itemName , from:studentIdOfRatedUser} } },
                    { new: true });
                }
                else{
                    const foundUser = await userDB.findOneAndUpdate({ studentId: studentIdOfUser }, { $push: { soldTransactions: {itemName:itemName , to:studentIdOfRatedUser}} },
                    { new: true });                  
                }             
                
            } else {
                console.log("User with entered ID does not exist.");
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    async updateRaterCount(studentIdOfRatedUser){   
        let userController = new UserController();       
        
        try {
            let doesRatedUserExists = await userController.userExistsID(studentIdOfRatedUser);
            if (doesRatedUserExists) {
                const userDB = UserDB;
                let updatedUser = await userDB.findOneAndUpdate({studentId: studentIdOfRatedUser}, { $inc: { raterCount: 1 } }, { new: true });
                
            } else {
                console.log("User with entered ID does not exist.");
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    async updateRating(studentIdOfRatedUser, newRating){   
        
        let userController = new UserController();       
        
        try {
            let doesRatedUserExists = await userController.userExistsID(studentIdOfRatedUser);
            if (doesRatedUserExists) {
                const userDB = UserDB;
                const foundUser = await userDB.findOne({ studentId: studentIdOfRatedUser });
                let userRating = foundUser.rating;
                let userRaterCount = foundUser.raterCount;
                
                //calculate rating
                if (userRating == -1){
                    userRating = newRating;
                    await userDB.findOneAndUpdate({ studentId: studentIdOfRatedUser }, {totalRating: newRating })
                }
                else {
                    await userDB.findOneAndUpdate({ studentId: studentIdOfRatedUser }, {$inc:{totalRating: newRating }})
                    const foundUser2 = await userDB.findOne({ studentId: studentIdOfRatedUser });                    
                    userRating = foundUser2.totalRating / (userRaterCount + 1);                                      
                }
                
                userRaterCount++;

                // Update the user with the new rating and incremented raterCount
                let updatedUser = await userDB.findByIdAndUpdate(
                    foundUser._id,
                    { $set: { rating: userRating, raterCount: userRaterCount} },
                    { new: true } // This option returns the modified document
                );
                
            } else {
                console.log("User with entered ID does not exist.");
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }

}
module.exports = TransactionController;