const PrivateLessonItem = require("../js_classes/PrivateLessonItem");
const privateLessonItemDB = require("../db_modules/PrivateLessonItemDb");

class PrivateLessonItemController{

    constructor(){
    }

    async createAndAddItemToDb(name, definition, itemId, photo, price, posterId){
        let privateLessonItem = new PrivateLessonItem(name, definition, itemId, photo, price, posterId, []);
        return this.saveItemToDb(privateLessonItem);
    }

    async saveItemToDb(privateLessonItem){
        const privateLessonItemDb = privateLessonItemDB;
        return privateLessonItemDb.create({
            name: privateLessonItem.name,
            definition: privateLessonItem.definition,
            itemId: privateLessonItem.itemId,
            price: privateLessonItem.price,
            posterId: privateLessonItem.posterId,
            photo: privateLessonItem.photo,
            arrayOfFavoritesList: privateLessonItem.arrayOfFavoritesListCustomerIds
        }).then((res) => {
            return res._id;
        });
    }

    async getPrivateLessonItems(numberOfPLItems, offset){
        const privateLessonItemDb = privateLessonItemDB;
        return privateLessonItemDb.find({}).sort({createdAt: -1}).skip(offset).limit(numberOfPLItems).then((res) => {
            return res.map((item) => {
                return new PrivateLessonItem(item.name, item.definition, item.itemId, item.photo, item.price, item.posterId, item.arrayOfFavoritesListCustomerIds);
            });
        });
    }

    async editItem(name, definition, photo, price, objectId){
        const privateLessonItemDb = privateLessonItemDB;
        return privateLessonItemDb.findByIdAndUpdate(objectId, {$set: {name: name, definition: definition, photo: photo, price: price}}).then((res) => {
            return true;
        });
    }

    async getObjectIdByItemId(itemId){
        const privateLessonItemDb = privateLessonItemDB;
        return privateLessonItemDb.findOne({itemId: itemId}).then((res) => {
            return res._id;
        });
    }

    async searchInPrivateLessonItems(searchQuery, minPrice, maxPrice, offset, numberOfPLItems){
        const privateLessonItemDb = privateLessonItemDB;
        let arrayOfPLObjects = await privateLessonItemDb.fuzzySearch(searchQuery, {
            price: {
                $lte: maxPrice,
                $gte: minPrice
            }
        }).skip(offset).limit(numberOfPLItems);

        return arrayOfPLObjects.map((item) => {
            return new PrivateLessonItem(item.name, item.definition, item.itemId, item.photo, item.price, item.posterId, item.arrayOfFavoritesListCustomerIds);
        });
    }

    async filterItems(minPrice, maxPrice, offset, numberOfPLItems, sortBy){
        const privateLessonItemDb = privateLessonItemDB;
        let arrayOfPLObjects;
        if(sortBy == -1){
            arrayOfPLObjects = await privateLessonItemDb.find({
                price: {
                    $lte: maxPrice,
                    $gte: minPrice
                }
            }).sort({price: -1}).skip(offset).limit(numberOfPLItems);
        }
        else if(sortBy == 1){
            arrayOfPLObjects = await privateLessonItemDb.find({
                price: {
                    $lte: maxPrice,
                    $gte: minPrice
                }
            }).sort({price: 1}).skip(offset).limit(numberOfPLItems);
        }
        else{
            arrayOfPLObjects = await privateLessonItemDb.find({
                price: {
                    $lte: maxPrice,
                    $gte: minPrice
                }
            }).skip(offset).limit(numberOfPLItems);
        }
        return arrayOfPLObjects.map((item) => {
            return new PrivateLessonItem(item.name, item.definition, item.itemId, item.photo, item.price, item.posterId, item.arrayOfFavoritesListCustomerIds);
        });
    }

    async addCustomerIdToFavoritesList(itemId, customerId){
        let objectId = this.getObjectIdByItemId(itemId);
        const privateLessonItemDb = privateLessonItemDB;
        return privateLessonItemDb.findByIdAndUpdate(objectId, {$push: {arrayOfFavoritesList: customerId}}).then((res) => {
            return true;
        });
    }

    async removeCustomerFromFavoritesList(itemId, customerId){
        let objectId = this.getObjectIdByItemId(itemId);
        const privateLessonItemDb = privateLessonItemDB;
        return privateLessonItemDb.findByIdAndUpdate(objectId, {$pull: {arrayOfFavoritesList: customerId}}).then((res) => {
            return true;
        });
    }

    async deleteItem(itemId){
        const privateLessonItemDb = privateLessonItemDB;
        let objectId = await this.getObjectIdByItemId(itemId);
        return privateLessonItemDb.findByIdAndDelete(objectId).then((res) => {
            return res.arrayOfFavoritesList;
        });
    }

    async getItemsByIds(arrayOfIds){
        const privateLessonItemDb = privateLessonItemDB;
        return privateLessonItemDb.find({
            _id: {$in: {arrayOfIds}}
        }).map((item) => {
            return new PrivateLessonItem(item.name, item.definition, item.itemId, item.photo, item.price, item.posterId, item.arrayOfFavoritesListCustomerIds);
        });

    }

}

module.exports = PrivateLessonItemController;