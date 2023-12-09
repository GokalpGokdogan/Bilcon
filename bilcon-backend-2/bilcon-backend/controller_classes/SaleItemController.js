const SaleItem = require("../js_classes/SaleItem");
const SaleItemDB = require("../db_modules/SaleItemDb");

class SaleItemController{
    constructor(){
    }
    async createAndAddSaleItemToDb(name, definition, itemId, price, posterId, photo){ // will return the object id of the sale item
        let itemToBeAdded = new SaleItem(name, definition, itemId, price, posterId, photo, []);
        return await this.saveSaleItemToDb(itemToBeAdded);
    }
    async saveSaleItemToDb(saleItem){ // will return the object id of the sale item
        const saleItemDb = SaleItemDB;
        return saleItemDb.create({
            name: saleItem.name,
            definition: saleItem.definition,
            itemId: saleItem.itemId,
            price: saleItem.price,
            posterId: saleItem.posterId,
            photo: saleItem.photo,
            arrayOfFavoritesList: saleItem.arrayOfFavoritesListCustomerIds
        }).then((result) => {
            return result._id;
        });
    }
    async getSaleItems(numberOfSaleItems, offset){ // when the customer first opens the screen, returns an array of SaleItem objects
        const saleItemDb = SaleItemDB;
        return saleItemDb.find({}).sort({createdAt: -1}).skip(offset).limit(numberOfSaleItems).then( (saleItems) => {
            return saleItems.map((itemData) => {
                return new SaleItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.posterId, itemData.photo, itemData.arrayOfFavoritesList);
            })
        });
    }
    async editItem(name, definition, price, photo, objectId){ // item id cannot be changed, it is a parameter because the item will be found by the item id
        const saleItemDb = SaleItemDB;
        return saleItemDb.findByIdAndUpdate(objectId, {$set: {name: name, price: price, definition: definition, photo: photo}})
        .then((res) => {
            return true;
        });
    } 
    async getObjectIdOfSaleItem(itemId){
        const saleItemDb = SaleItemDB;
        return saleItemDb.findOne({itemId: itemId})
        .then((res) => {
            return res._id;
        });
    }
    async searchInSaleItem(searchQuery, numberOfSaleItems, minPrice, maxPrice, offset){ // numberOfSaleItems is the count of items that will be returned, min-maxPrice are for filtering. There is no sorting becuase if we sort, searching would be meaningless
        const saleItemDb = SaleItemDB;
        //let arrayOfDbObjects = await saleItemDb.fuzzySearch(searchQuery, {}, {
            let arrayOfDbObjects = await saleItemDb.fuzzySearch(searchQuery, {
            price: {
                $gte: minPrice,
                $lte: maxPrice
            }
        }).skip(offset).limit(numberOfSaleItems);
        return arrayOfDbObjects.map((item) => {
            return new SaleItem(item.name, item.definition, item.itemId, item.price, item.posterId, item.photo, item.arrayOfFavoritesList);
        });
    }
    async filterItems(numberOfSaleItems, minPrice, maxPrice, offset, sortBy){ // -1 for descending, 1 for ascending, 0 for any order
        const saleItemDb = SaleItemDB;
        let arrayOfDbObjects;
        if(sortBy == -1){ // descending
            arrayOfDbObjects = await saleItemDb.find({
                price: {
                    $gte: minPrice,
                    $lte: maxPrice
                }
            }).sort({price: -1}).skip(offset).limit(numberOfSaleItems);
            return arrayOfDbObjects.map((item) => {
                return new SaleItem(item.name, item.definition, item.itemId, item.price, item.posterId, item.photo, item.arrayOfFavoritesList);
            });
        }
        else if(sortBy == 1){ // ascending
            arrayOfDbObjects = await saleItemDb.find({
                price: {
                    $gte: minPrice,
                    $lte: maxPrice
                }
            }).sort({price: 1}).skip(offset).limit(numberOfSaleItems);
            return arrayOfDbObjects.map((item) => {
                return new SaleItem(item.name, item.definition, item.itemId, item.price, item.posterId, item.photo, item.arrayOfFavoritesList);
            });
        }
        else{
            arrayOfDbObjects = await saleItemDb.find({
                price: {
                    $gte: minPrice,
                    $lte: maxPrice
                }
            }).skip(offset).limit(numberOfSaleItems);
            return arrayOfDbObjects.map((item) => {
                return new SaleItem(item.name, item.definition, item.itemId, item.price, item.posterId, item.photo, item.arrayOfFavoritesList);
            });
        }
    }
    async addCustomerIdToFavoritesList(customerId, itemId){
        const saleItemDb = SaleItemDB;
        let objectId = await this.getObjectIdOfSaleItem(itemId);
        return saleItemDb.findByIdAndUpdate(objectId, {$push: {arrayOfFavoritesList: customerId}})
        .then((res) => {
            return true;
        });
    }
    async removeCustomerFromFavoritesList(customerId, itemId){
        const saleItemDb = SaleItemDB;
        let objectId = await this.getObjectIdOfSaleItem(itemId);
        return saleItemDb.findByIdAndUpdate(objectId, {$pull: {arrayOfFavoritesList: customerId}})
        .then((res) => {
            return true;
        });
    }
    async deleteItem(itemId){
        const saleItemDb = SaleItemDB;
        let objectId = await this.getObjectIdOfSaleItem(itemId);
        return saleItemDb.findByIdAndDelete(objectId)
        .then((res) => {
            return res.arrayOfFavoritesList;
        })
    }

    async getItemsByIds(arrayOfIds){
        const saleItemDb = SaleItemDB;
        return saleItemDb.find({
            _id: {$in: {arrayOfIds}}
        }).map((item) => {
            return new SaleItem(item.name, item.definition, item.itemId, item.price, item.posterId, item.photo, item.arrayOfFavoritesList);
        });

    }



    

}
module.exports = SaleItemController;