const SaleItem = require("../js_classes/SaleItem");
const SaleItemDB = require("../db_modules/SaleItemDb");
const ItemController = require("./ItemController");

class SaleItemController extends ItemController{
    constructor(){
        super();
    }
    async createAndAddItemToDb(name, definition, itemId, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, 
        wantToGive, posterId, photo, posterName){ // will return the object id of the sale item
        let itemToBeAdded = new SaleItem(name, definition, itemId, price, posterId, photo, [], posterName);
        return await this.saveItemToDb(itemToBeAdded);
    }
    async saveItemToDb(saleItem){ // will return the object id of the sale item
        const saleItemDb = SaleItemDB;
        return saleItemDb.create({
            name: saleItem.name,
            definition: saleItem.definition,
            itemId: saleItem.itemId,
            price: saleItem.price,
            posterId: saleItem.posterId,
            photo: saleItem.photo,
            arrayOfFavoritesList: saleItem.arrayOfFavoritesListCustomerIds,
            posterName: saleItem.posterName
        }).then((result) => {
            return result._id;
        });
    }
    async getItems(numberOfSaleItems, offset){ // when the customer first opens the screen, returns an array of SaleItem objects
        const saleItemDb = SaleItemDB;
        return saleItemDb.find({}).sort({createdAt: -1}).skip(offset).limit(numberOfSaleItems).then( (saleItems) => {
            return saleItems.map((itemData) => {
                return new SaleItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.posterId, itemData.photo, itemData.arrayOfFavoritesList, itemData.posterName);
            })
        });
    }
    async editItem(name, definition, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, wantToGive, posterId, photo, objectId){// item id cannot be changed, it is a parameter because the item will be found by the item id
        const saleItemDb = SaleItemDB;
        return saleItemDb.findByIdAndUpdate(objectId, {$set: {price: price, definition: definition, photo: photo}})
        .then((res) => {
            return true;
        });
    } 
    async getObjectId(itemId){
        const saleItemDb = SaleItemDB;
        return saleItemDb.findOne({itemId: itemId})
        .then((res) => {
            return res._id;
        });
    }
    async searchInItems(searchQuery, numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, 
        availabilityDuration, minDay,minMonth, minYear, maxDay, maxMonth, maxYear){ // numberOfSaleItems is the count of items that will be returned, min-maxPrice are for filtering. There is no sorting becuase if we sort, searching would be meaningless
        const saleItemDb = SaleItemDB;
        //let arrayOfDbObjects = await saleItemDb.fuzzySearch(searchQuery, {}, {
            let arrayOfDbObjects = await saleItemDb.fuzzySearch(searchQuery, {
            price: {
                $gte: minPrice,
                $lte: maxPrice
            }
        }).skip(offset).limit(numberOfItems);
        return arrayOfDbObjects.map((item) => {
            return new SaleItem(item.name, item.definition, item.itemId, item.price, item.posterId, item.photo, item.arrayOfFavoritesList, item.posterName);
        });
    }
    async filterItems(numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth,
        minYear, maxDay, maxMonth, maxYear, sectionNo, wantToGive, sortBy, name){ // -1 for descending, 1 for ascending, 0 for any order
        const saleItemDb = SaleItemDB;
        let arrayOfDbObjects;
        if(sortBy == -1){ // descending
            arrayOfDbObjects = await saleItemDb.find({
                price: {
                    $gte: minPrice,
                    $lte: maxPrice
                }
            }).sort({price: -1}).skip(offset).limit(numberOfItems);
            return arrayOfDbObjects.map((item) => {
                return new SaleItem(item.name, item.definition, item.itemId, item.price, item.posterId, item.photo, item.arrayOfFavoritesList, item.posterName);
            });
        }
        else if(sortBy == 1){ // ascending
            arrayOfDbObjects = await saleItemDb.find({
                price: {
                    $gte: minPrice,
                    $lte: maxPrice
                }
            }).sort({price: 1}).skip(offset).limit(numberOfItems);
            return arrayOfDbObjects.map((item) => {
                return new SaleItem(item.name, item.definition, item.itemId, item.price, item.posterId, item.photo, item.arrayOfFavoritesList, item.posterName);
            });
        }
        else{
            arrayOfDbObjects = await saleItemDb.find({
                price: {
                    $gte: minPrice,
                    $lte: maxPrice
                }
            }).skip(offset).limit(numberOfItems);
            return arrayOfDbObjects.map((item) => {
                return new SaleItem(item.name, item.definition, item.itemId, item.price, item.posterId, item.photo, item.arrayOfFavoritesList, item.posterName);
            });
        }
    }
    async addCustomerToFavoritesList(customerId, itemId){
        const saleItemDb = SaleItemDB;
        let objectId = await this.getObjectId(itemId);
        return saleItemDb.findByIdAndUpdate(objectId, {$addToSet: {arrayOfFavoritesList: customerId}})
        .then((res) => {
            return true;
        });
    }
    async removeCustomerFromFavoritesList(customerId, itemId){
        const saleItemDb = SaleItemDB;
        let objectId = await this.getObjectId(itemId);
        return saleItemDb.findByIdAndUpdate(objectId, {$pull: {arrayOfFavoritesList: customerId}})
        .then((res) => {
            return true;
        });
    }
    async deleteItem(itemId){
        const saleItemDb = SaleItemDB;
        let objectId = await this.getObjectId(itemId);
        return saleItemDb.findByIdAndDelete(objectId)
        .then((res) => {
            return res.arrayOfFavoritesList;
        })
    }

    async getItemsByObjectIds(arrayOfObjectIds){
        const saleItemDb = SaleItemDB;
        return saleItemDb.find({
            _id: {$in: arrayOfObjectIds}
        }).then((res) => {
            if(res == null){
                return [];
            }
            return res.map((item) => {
                return new SaleItem(item.name, item.definition, item.itemId, item.price, item.posterId, item.photo, item.arrayOfFavoritesList, item.posterName);
            });
        })

    }
    getItemType(){
        return "sale";
    }



    

}
module.exports = SaleItemController;