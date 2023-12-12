const Item = require("./js_classes/Item");
const itemDB = require("./db_modules/itemDb.js");

class ItemController{
    constructor(){
    }
    async addItem(name, definition, price, sellerId, photo){
        let item = new Item(name, definition, price, sellerId, photo);
        return this.saveItemToDB(item);
    }
    async saveItemToDB(item){ // returns the object id of the item
        const itemDb = itemDB({
            name: item.name,
            definition: item.definition,
            price: item.price,
            sellerId: item.sellerId,
            photo: item.photo
        });
        return itemDb.create()
        .then((result) => {
            if(result === null){
                return null;
            }
            else{
                return result._id.toString();
            }
        })
    }
}
module.exports = ItemController;