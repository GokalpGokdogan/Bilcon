const PrivateLessonItem = require("../js_classes/PrivateLessonItem");
const privateLessonItemDB = require("../db_modules/PrivateLessonItemDb");
const ItemController = require("./ItemController");

class PrivateLessonItemController extends ItemController{

    constructor(){
        super();
    }

    async createAndAddItemToDb(name, definition, itemId, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, 
        wantToGive, posterId, photo, posterName){
        let privateLessonItem = new PrivateLessonItem(name, definition, itemId, photo, price, posterId, [], posterName);
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
            arrayOfFavoritesList: privateLessonItem.arrayOfFavoritesListCustomerIds,
            posterName: privateLessonItem.posterName
        }).then((res) => {
            return res._id;
        });
    }

    async getItems(numberOfPLItems, offset){
        const privateLessonItemDb = privateLessonItemDB;
        return privateLessonItemDb.find({}).sort({createdAt: -1}).skip(offset).limit(numberOfPLItems).then((res) => {
            return res.map((item) => {
                return new PrivateLessonItem(item.name, item.definition, item.itemId, item.photo, item.price, item.posterId, item.arrayOfFavoritesListCustomerIds, item.posterName);
            });
        });
    }

    async editItem(name, definition, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, wantToGive, posterId, photo, objectId){
        const privateLessonItemDb = privateLessonItemDB;
        return privateLessonItemDb.findByIdAndUpdate(objectId, {$set: {definition: definition, photo: photo, price: price}}).then((res) => {
            return true;
        });
    }

    async getObjectId(itemId){
        const privateLessonItemDb = privateLessonItemDB;
        return privateLessonItemDb.findOne({itemId: itemId}).then((res) => {
            return res._id;
        });
    }

    async searchInItems(searchQuery, numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, 
        availabilityDuration, minDay,minMonth, minYear, maxDay, maxMonth, maxYear){
        const privateLessonItemDb = privateLessonItemDB;
        let arrayOfPLObjects = await privateLessonItemDb.fuzzySearch(searchQuery, {
            price: {
                $lte: maxPrice,
                $gte: minPrice
            }
        }).skip(offset).limit(numberOfItems);

        return arrayOfPLObjects.map((item) => {
            return new PrivateLessonItem(item.name, item.definition, item.itemId, item.photo, item.price, item.posterId, item.arrayOfFavoritesListCustomerIds, item.posterName);
        });
    }

    async filterItems(numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth,
        minYear, maxDay, maxMonth, maxYear, sectionNo, wantToGive, sortBy, name){
        const privateLessonItemDb = privateLessonItemDB;
        let arrayOfPLObjects;
        if(sortBy == -1){
            arrayOfPLObjects = await privateLessonItemDb.find({
                price: {
                    $lte: maxPrice,
                    $gte: minPrice
                }
            }).sort({price: -1}).skip(offset).limit(numberOfItems);
        }
        else if(sortBy == 1){
            arrayOfPLObjects = await privateLessonItemDb.find({
                price: {
                    $lte: maxPrice,
                    $gte: minPrice
                }
            }).sort({price: 1}).skip(offset).limit(numberOfItems);
        }
        else{
            arrayOfPLObjects = await privateLessonItemDb.find({
                price: {
                    $lte: maxPrice,
                    $gte: minPrice
                }
            }).skip(offset).limit(numberOfItems);
        }
        return arrayOfPLObjects.map((item) => {
            return new PrivateLessonItem(item.name, item.definition, item.itemId, item.photo, item.price, item.posterId, item.arrayOfFavoritesListCustomerIds, item.posterName);
        });
    }

    async addCustomerToFavoritesList(customerId, itemId){
        let objectId = await this.getObjectId(itemId);
        const privateLessonItemDb = privateLessonItemDB;
        return privateLessonItemDb.findByIdAndUpdate(objectId, {$addToSet: {arrayOfFavoritesList: customerId}}).then((res) => {
            return true;
        });
    }

    async removeCustomerFromFavoritesList(customerId, itemId){
        let objectId = await this.getObjectId(itemId);
        const privateLessonItemDb = privateLessonItemDB;
        return privateLessonItemDb.findByIdAndUpdate(objectId, {$pull: {arrayOfFavoritesList: customerId}}).then((res) => {
            return true;
        });
    }

    async deleteItem(itemId){
        const privateLessonItemDb = privateLessonItemDB;
        let objectId = await this.getObjectId(itemId);
        return privateLessonItemDb.findByIdAndDelete(objectId).then((res) => {
            return res.arrayOfFavoritesList;
        });
    }

    async getItemsByObjectIds(arrayOfObjectIds){
        const privateLessonItemDb = privateLessonItemDB;
        return privateLessonItemDb.find({
            _id: {$in: arrayOfObjectIds}
        }).then((res) => {
            if(res == null){
                return [];
            }
            return res.map((item) => {
                return new PrivateLessonItem(item.name, item.definition, item.itemId, item.photo, item.price, item.posterId, item.arrayOfFavoritesListCustomerIds, item.posterName);
            });
        });

    }

    getItemType(){
        return "lesson";
    }
    async getItemsExceptUsersItems(numberOfItems, offset, nameOfUser){
        const privateLessonItemDb = privateLessonItemDB;
        return privateLessonItemDb.find({posterName: {$ne: nameOfUser}}).sort({createdAt: -1}).skip(offset).limit(numberOfItems).then((res) => {
            return res.map((item) => {
                return new PrivateLessonItem(item.name, item.definition, item.itemId, item.photo, item.price, item.posterId, item.arrayOfFavoritesListCustomerIds, item.posterName);
            });
        });
    }
    async searchItemsExceptUsersItems(searchQuery, numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, 
    availabilityDuration, minDay,minMonth, minYear, maxDay, maxMonth, maxYear, nameOfUser){
        const privateLessonItemDb = privateLessonItemDB;
        let arrayOfPLObjects = await privateLessonItemDb.fuzzySearch(searchQuery, {
            price: {
                $lte: maxPrice,
                $gte: minPrice
            },
            posterName: {
                $ne: nameOfUser
            }
        }).skip(offset).limit(numberOfItems);

        return arrayOfPLObjects.map((item) => {
            return new PrivateLessonItem(item.name, item.definition, item.itemId, item.photo, item.price, item.posterId, item.arrayOfFavoritesListCustomerIds, item.posterName);
        });
    }
    async filterItemsExceptUsersItems(numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth,
    minYear, maxDay, maxMonth, maxYear, sectionNo, wantToGive, sortBy, courseName, nameOfUser){
        const privateLessonItemDb = privateLessonItemDB;
        let arrayOfPLObjects;
        if(sortBy == -1){
            arrayOfPLObjects = await privateLessonItemDb.find({
                price: {
                    $lte: maxPrice,
                    $gte: minPrice
                },
                posterName: {
                    $ne: nameOfUser
                }
            }).sort({price: -1}).skip(offset).limit(numberOfItems);
        }
        else if(sortBy == 1){
            arrayOfPLObjects = await privateLessonItemDb.find({
                price: {
                    $lte: maxPrice,
                    $gte: minPrice
                },
                posterName: {
                    $ne: nameOfUser
                }
            }).sort({price: 1}).skip(offset).limit(numberOfItems);
        }
        else{
            arrayOfPLObjects = await privateLessonItemDb.find({
                price: {
                    $lte: maxPrice,
                    $gte: minPrice
                },
                posterName: {
                    $ne: nameOfUser
                }
            }).skip(offset).limit(numberOfItems);
        }
        return arrayOfPLObjects.map((item) => {
            return new PrivateLessonItem(item.name, item.definition, item.itemId, item.photo, item.price, item.posterId, item.arrayOfFavoritesListCustomerIds, item.posterName);
        });
    }

}

module.exports = PrivateLessonItemController;
