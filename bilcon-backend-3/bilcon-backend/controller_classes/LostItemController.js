const LostItem = require("../js_classes/LostItem");
const LostItemDB = require("../db_modules/LostItemDb");
const ItemController = require("./ItemController");

class LostItemController extends ItemController{
    constructor(){
        super();
    }
    async createAndAddItemToDb(name, definition, itemId, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, 
        wantToGive, posterId, photo, posterName){
        let lostItem = new LostItem(name, definition, itemId, place, day, month, year, posterId, posterName);
        return this.saveItemToDb(lostItem);
    }

    async saveItemToDb(lostItem){
        const lostItemDb = LostItemDB;
        return lostItemDb.create({
            name: lostItem.name,
            definition: lostItem.definition,
            itemId: lostItem.itemId,
            place: lostItem.place,
            posterId: lostItem.posterId,
            date: lostItem.date, 
            posterName: lostItem.posterName
        }).then((res) => {
            return res._id;
        });
    }

    async getItems(numberOfLostItems, offset){
        const lostItemDb = LostItemDB;
        return await lostItemDb.find({}).sort({date: -1}).skip(offset).limit(numberOfLostItems).then((res) => {
            return res.map((itemData) => {
                return new LostItem(itemData.name, itemData.definition, itemData.itemId, itemData.place, itemData.date.getDate(), itemData.date.getMonth(), itemData.date.getYear(), itemData.posterId, itemData.posterName);
            });
        });
    }

    async editItem(name, definition, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, wantToGive, posterId, photo, objectId){
        const lostItemDb = LostItemDB;
        let newDate = new Date();
        newDate.setHours(12, 0, 0, 0);
        newDate.setFullYear(year, month, day);
        
        return lostItemDb.findByIdAndUpdate(objectId, {$set: {definition: definition, place: place, date: newDate}})
        .then((res) => {
            return true;
        });
    }

    async getObjectId(itemId){
        const lostItemDb = LostItemDB;
        return lostItemDb.findOne({itemId: itemId}).then((res) => {
            return res._id;
        });
    }

    async searchInItems(searchQuery, numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, 
        availabilityDuration, minDay,minMonth, minYear, maxDay, maxMonth, maxYear){
        const lostItemDb = LostItemDB;
        let minDate = new Date();
        minDate.setHours(11, 0, 0, 0);
        minDate.setFullYear(minYear, minMonth, minDay);
        let maxDate = new Date();
        maxDate.setHours(13, 0, 0, 0);
        maxDate.setFullYear(maxYear, maxMonth, maxDay);
        let arrayOfLostObjects = await lostItemDb.fuzzySearch(searchQuery, {
            date: {
                $gte: minDate,
                $lte: maxDate
            }
        }).skip(offset).limit(numberOfItems);
        return arrayOfLostObjects.map((item) => {
            return new LostItem(item.name, item.definition, item.itemId, item.place, item.date.getDate(), item.date.getMonth(), item.date.getYear(), item.posterId, item.posterName);
        });
    }

    async filterItems(numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth,
        minYear, maxDay, maxMonth, maxYear, sectionNo, wantToGive, sortBy, name){
        const lostItemDb = LostItemDB;
        let minDate = new Date();
        minDate.setHours(11, 0, 0, 0);
        minDate.setFullYear(minYear, minMonth, minDay);
        let maxDate = new Date();
        maxDate.setHours(13, 0, 0, 0);
        maxDate.setFullYear(maxYear, maxMonth, maxDay);


        let arrayOfItems;

        if(sortBy == -1){
            arrayOfItems = await lostItemDb.find({
                date: {
                    $lte: maxDate,
                    $gte: minDate
                }
            }).sort({date: -1}).skip(offset).limit(numberOfItems);
        }
        else if(sortBy == 1){
            arrayOfItems = await lostItemDb.find({
                date: {
                    $lte: maxDate,
                    $gte: minDate
                }
            }).sort({date: 1}).skip(offset).limit(numberOfItems);
        }
        else{
            arrayOfItems = await lostItemDb.find({
                date: {
                    $lte: maxDate,
                    $gte: minDate
                }
            }).skip(offset).limit(numberOfItems);
        }

        return arrayOfItems.map((item) => {
            return new LostItem(item.name, item.definition, item.itemId, item.place, item.date.getDate(), item.date.getMonth(), item.date.getYear(), item.posterId, item.posterName);
        });
    }

    async addCustomerToFavoritesList(customerId, itemId){
        // cannot add lost item to favorites list
        return null;
    }

    async removeCustomerFromFavoritesList(customerId, itemId){
        return null;
    }

    async deleteItem(itemId){
        let objectId = await this.getObjectId(itemId);
        const lostItemDb = LostItemDB;
        return lostItemDb.findByIdAndDelete(objectId).then((res) => {
            return [];
        });
    }

    async getItemsByObjectIds(arrayOfObjectIds){
        const lostItemDb = LostItemDB;
        return lostItemDb.find({
            _id: {$in: arrayOfObjectIds}
        }).then((res) => {
            if(res == null){
                return [];
            }
            return res.map((item) => {
                return new LostItem(item.name, item.definition, item.itemId, item.place, item.date.getDate(), item.date.getMonth(), item.date.getYear(), item.posterId, item.posterName);
            });
        });

    }

    getItemType(){
        return "lost";
    }
}
module.exports = LostItemController;