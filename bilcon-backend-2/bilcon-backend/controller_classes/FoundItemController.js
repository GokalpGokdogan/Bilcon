const FoundItem = require("../js_classes/FoundItem");
const FoundItemDB = require("../db_modules/FoundItemDb");

class FoundItemController{
    constructor(){
    }
    async createAndAddItemToDb(name, definition, itemId, photo, place, dayOfFind, monthOfFind, yearOfFind, posterId){
        let foundItem = new FoundItem(name, definition, itemId, photo, place, dayOfFind, monthOfFind, yearOfFind, posterId);
        console.log("aaa" + posterId);
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
            photo: foundItem.photo
        }).then((res) => {
            return res._id;
        });
    }

    async getFoundItems(numberOfFoundItems, offset){
        const foundItemDb = FoundItemDB;
        return await foundItemDb.find({}).sort({date: -1}).skip(offset).limit(numberOfFoundItems).then((res) => {
            return res.map((itemData) => {
                return new FoundItem(itemData.name, itemData.definition, itemData.itemId, itemData.photo, itemData.place, itemData.date.getDate(), itemData.date.getMonth(), itemData.date.getYear(), itemData.posterId);
            });
        });
    }

    async editItem(name, definition, place, dayOfFind, monthOfFind, yearOfFind, photo, objectId){
        const foundItemDb = FoundItemDB;
        let newDate = new Date();
        newDate.setHours(0, 0, 0, 0);
        newDate.setFullYear(yearOfFind, monthOfFind, dayOfFind);
        
        return foundItemDb.findByIdAndUpdate(objectId, {$set: {name: name, definition: definition, place: place, date: date, photo: photo}})
        .then((res) => {
            return true;
        });
    }

    async getObjectIdByItemId(itemId){
        const foundItemDb = FoundItemDB;
        return foundItemDb.findOne({itemId: itemId}).then((res) => {
            return res._id;
        });
    }

    async searchInFoundItems(searchQuery, numberOfFoundItems, offset, minDayOfFind, minMonthOfFind, minYearOfFind, maxDay, maxMonth, maxYear){ 
        const foundItemDb = FoundItemDB;
        let minDate = new Date();
        minDate.setHours(0, 0, 0, 0);
        minDate.setFullYear(minYearOfFind, minMonthOfFind, minDayOfFind);
        let maxDate = new Date();
        maxDate.setHours(0, 0, 0, 0);
        maxDate.setFullYear(maxYear, maxMonth, maxDay);
        let arrayOfFoundObjects = await foundItemDb.fuzzySearch(searchQuery, {
            date: {
                $gte: minDate,
                $lte: maxDate
            }
        }).skip(offset).limit(numberOfFoundItems);
        return arrayOfFoundObjects.map((itemData) => {
            return new FoundItem(itemData.name, itemData.definition, itemData.itemId, itemData.photo, itemData.place, itemData.date.getDate(), itemData.date.getMonth(), itemData.date.getYear(), itemData.posterId);
        });
    }

    async filterItems(minDayOfFound, minMonthOfFound, minYearOfFound, maxDay, maxMonth, maxYear, offset, numberOfFoundItem, sortBy){
        const foundItemDb = FoundItemDB;
        let minDate = new Date();
        minDate.setHours(0, 0, 0, 0);
        minDate.setFullYear(minYearOfFound, minMonthOfFound, minDayOfFound);
        let maxDate = new Date();
        maxDate.setHours(0, 0, 0, 0);
        maxDate.setFullYear(maxYear, maxMonth, maxDay);


        let arrayOfItems;
        if(sortBy == -1){
            arrayOfItems = await foundItemDb.find({
                date: {
                    $lte: maxDate,
                    $gte: minDate
                }
            }).sort({date: -1}).skip(offset).limit(numberOfFoundItem);
        }
        else if(sortBy == 1){
            arrayOfItems = await foundItemDb.find({
                date: {
                    $lte: maxDate,
                    $gte: minDate
                }
            }).sort({date: 1}).skip(offset).limit(numberOfFoundItem);
        }
        else{
            arrayOfItems = await foundItemDb.find({
                date: {
                    $lte: maxDate,
                    $gte: minDate
                }
            }).skip(offset).limit(numberOfFoundItem);
        }

        return arrayOfItems.map((itemData) => {
            return new FoundItem(itemData.name, itemData.definition, itemData.itemId, itemData.photo, itemData.place, itemData.date.getDate(), itemData.date.getMonth(), itemData.date.getYear(), itemData.posterId);
        });
    }

    async deleteItem(itemId){
        let objectId = await this.getObjectIdByItemId(itemId);
        const foundItemDb = FoundItemDB;
        return foundItemDb.findByIdAndDelete(objectId).then((res) => {
            return true;
        });
    }

    async getItemsByIds(arrayOfIds){
        const foundItemDb = FoundItemDB;
        return foundItemDb.find({
            _id: {$in: {arrayOfIds}}
        }).map((item) => {
            return new FoundItem(itemData.name, itemData.definition, itemData.itemId, itemData.photo, itemData.place, itemData.date.getDate(), itemData.date.getMonth(), itemData.date.getYear(), itemData.posterId);
        });

    }



}

module.exports = FoundItemController;