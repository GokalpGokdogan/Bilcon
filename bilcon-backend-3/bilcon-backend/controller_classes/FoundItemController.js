const FoundItem = require("../js_classes/FoundItem");
const FoundItemDB = require("../db_modules/FoundItemDb");
const ItemController = require("./ItemController");

class FoundItemController extends ItemController{
    constructor(){
        super();
    }
    async createAndAddItemToDb(name, definition, itemId, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, 
        wantToGive, posterId, photo, posterName){
        let foundItem = new FoundItem(name, definition, itemId, photo, place, day, month, year, posterId, posterName);
        return this.saveItemToDb(foundItem);
    }

    async saveItemToDb(foundItem){
        const foundItemDb = FoundItemDB;
        return foundItemDb.create({
            name: foundItem.name,
            definition: foundItem.definition,
            itemId: foundItem.itemId,
            place: foundItem.place,
            posterId: foundItem.posterId,
            date: foundItem.date,
            photo: foundItem.photo,
            posterName: foundItem.posterName
        }).then((res) => {
            return res._id;
        });
    }

    async getItems(numberOfFoundItems, offset){
        const foundItemDb = FoundItemDB;
        return await foundItemDb.find({}).sort({date: -1}).skip(offset).limit(numberOfFoundItems).then((res) => {
            return res.map((itemData) => {
                return new FoundItem(itemData.name, itemData.definition, itemData.itemId, itemData.photo, itemData.place, itemData.date.getDate(), itemData.date.getMonth(), itemData.date.getYear(), itemData.posterId, itemData.posterName);
            });
        });
    }

    async editItem(name, definition, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, wantToGive, posterId, photo, objectId){
        const foundItemDb = FoundItemDB;
        let newDate = new Date();
        newDate.setHours(12, 0, 0, 0);
        newDate.setFullYear(year, month, day);
        
        return foundItemDb.findByIdAndUpdate(objectId, {$set: {definition: definition, place: place, date: newDate, photo: photo}})
        .then((res) => {
            return true;
        });
    }

    async getObjectId(itemId){
        const foundItemDb = FoundItemDB;
        return foundItemDb.findOne({itemId: itemId}).then((res) => {
            return res._id;
        });
    }

    async searchInItems(searchQuery, numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, 
        availabilityDuration, minDay,minMonth, minYear, maxDay, maxMonth, maxYear){
        const foundItemDb = FoundItemDB;
        let minDate = new Date();
        minDate.setHours(11, 0, 0, 0);
        minDate.setFullYear(minYear, minMonth, minDay);
        let maxDate = new Date();
        maxDate.setHours(13, 0, 0, 0);
        maxDate.setFullYear(maxYear, maxMonth, maxDay);
        let arrayOfFoundObjects = await foundItemDb.fuzzySearch(searchQuery, {
            date: {
                $gte: minDate,
                $lte: maxDate
            }
        }).skip(offset).limit(numberOfItems);
        return arrayOfFoundObjects.map((itemData) => {
            return new FoundItem(itemData.name, itemData.definition, itemData.itemId, itemData.photo, itemData.place, itemData.date.getDate(), itemData.date.getMonth(), itemData.date.getYear(), itemData.posterId, itemData.posterName);
        });
    }

    async filterItems(numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth,
        minYear, maxDay, maxMonth, maxYear, sectionNo, wantToGive, sortBy, name){
        const foundItemDb = FoundItemDB;
        let minDate = new Date();
        minDate.setHours(11, 0, 0, 0);
        minDate.setFullYear(minYear, minMonth, minDay);
        let maxDate = new Date();
        maxDate.setHours(13, 0, 0, 0);
        maxDate.setFullYear(maxYear, maxMonth, maxDay);


        let arrayOfItems;
        if(sortBy == -1){
            arrayOfItems = await foundItemDb.find({
                date: {
                    $lte: maxDate,
                    $gte: minDate
                }
            }).sort({date: -1}).skip(offset).limit(numberOfItems);
        }
        else if(sortBy == 1){
            arrayOfItems = await foundItemDb.find({
                date: {
                    $lte: maxDate,
                    $gte: minDate
                }
            }).sort({date: 1}).skip(offset).limit(numberOfItems);
        }
        else{
            arrayOfItems = await foundItemDb.find({
                date: {
                    $lte: maxDate,
                    $gte: minDate
                }
            }).skip(offset).limit(numberOfItems);
        }

        return arrayOfItems.map((itemData) => {
            return new FoundItem(itemData.name, itemData.definition, itemData.itemId, itemData.photo, itemData.place, itemData.date.getDate(), itemData.date.getMonth(), itemData.date.getYear(), itemData.posterId, itemData.posterName);
        });
    }

    async addCustomerToFavoritesList(customerId, itemId){
        // cannot add foun item to favorites list
        return null;
    }

    async removeCustomerFromFavoritesList(customerId, itemId){
        return null;
    }

    async deleteItem(itemId){
        let objectId = await this.getObjectId(itemId);
        const foundItemDb = FoundItemDB;
        return foundItemDb.findByIdAndDelete(objectId).then((res) => {
            return [];
        });
    }

    async getItemsByObjectIds(arrayOfObjectIds){
        const foundItemDb = FoundItemDB;
        return foundItemDb.find({
            _id: {$in: arrayOfObjectIds}
        }).then((res) => {
            if(res == null){
                return [];
            }
            return res.map((itemData) => {
                return new FoundItem(itemData.name, itemData.definition, itemData.itemId, itemData.photo, itemData.place, itemData.date.getDate(), itemData.date.getMonth(), itemData.date.getYear(), itemData.posterId, itemData.posterName);
            });
        })

    }

    getItemType(){
        return "found";
    }


}

module.exports = FoundItemController;