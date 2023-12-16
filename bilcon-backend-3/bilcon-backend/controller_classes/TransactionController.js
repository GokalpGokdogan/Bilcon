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

    /*async addTransactionToRatedUser(studentIdOfUser, studentIdOfRatedUser, itemName, isBought) {
        let userController = new UserController();   
        try {
            let doesRatedUserExists = await userController.userExistsID(studentIdOfRatedUser);
            if (doesRatedUserExists) {
                const userDB = UserDB;
                
                if(isBought ===  "true"){
                    const foundUser = await userDB.findOneAndUpdate({ studentId: studentIdOfUser }, { $push: { boughtTransactions: itemName } },
                    { new: true });
                }
                else{
                    const foundUser = await userDB.findOneAndUpdate({ studentId: studentIdOfUser }, { $push: { soldTransactions: itemName } },
                    { new: true });                  
                }
                
            } else {
                console.log("User with entered ID does not exist.");
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }*/
    
    
}
module.exports = TransactionController;