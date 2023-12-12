const Seller = require("./js_classes/Seller");
const SellerDB = require("./db_modules/sellerDb");
const ItemController = require("./ItemController");

class SellerController{
    constructor(){
    }
    async addSeller(userObjectId){
        let seller = new Seller(userObjectId,[], -1, 0);
        return this.saveSellerToDB(seller);
    }
    async saveSellerToDB(seller){ // returns the id of seller object in db
        const sellerDb = SellerDB({
            userObjectId: seller.userObjectId,
            arrayOfItemIds: seller.arrayOfItemIds,
            sellerRating: seller.sellerRating,
            raterCount: seller.raterCount
        });
        return sellerDb.create()
        .then((result) =>{
            return true;
        })
    }
    async getSellerObjectId(userObjectId){
        const sellerDb = SellerDB;
        return sellerDb.findOne({userObjectId: userObjectId}) // fix this , it should look at the objects whose value is userObjectId
        .then((result) => {
            if(result === null){
                return "";
            }
            else{
                return result._id.toString();
            }
        })
    }
    async postItem(name, definition, price, sellerObjectId, photo){ // returns boolean
        // calls create item from item controller
        let itemController = new ItemController();
        let itemObjectId = await itemController.addItem(name, definition, price, sellerObjectId, photo); 
        const sellerDb = SellerDB;
        return sellerDb.findByIdAndUpdate(sellerObjectId, {$push:{arrayOfItemIds: itemObjectId}})
        .then((result) => {
            if(result === null){
                return false;
            }
            else{
                return true;
            }
        });
    }
}

module.exports = SellerController;