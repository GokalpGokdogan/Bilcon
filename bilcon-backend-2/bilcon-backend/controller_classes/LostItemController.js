const LostItem = require("../js_classes/LostItem");
const LostItemDB = require("../db_modules/LostItemDb");

class LostItemController{
    constructor(){
    }
    async createAndAddItemToDb(name, definition, itemId, place, dayOfLose, monthOfLose, yearOfLose, posterId){
        let lostItem = new LostItem(name, definition, itemId, place, dayOfLose, monthOfLose, yearOfLose, posterId);
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
            date: lostItem.date
        }).then((res) => {
            return res._id;
        });
    }

    async getLostItems(numberOfLostItems, offset){
        const lostItemDb = LostItemDB;
        return await lostItemDb.find({}).sort({date: -1}).skip(offset).limit(numberOfLostItems).then((res) => {
            return res.map((itemData) => {
                return new LostItem(itemData.name, itemData.definition, itemData.itemId, itemData.place, itemData.dayOfLose, itemData.monthOfLose, itemData.yearOfLose, itemData.posterId);
            });
        });
    }

    async editItem(name, definition, place, dayOfLose, monthOfLose, yearOfLose, objectId){
        const lostItemDb = LostItemDB;
        let newDate = new Date();
        newDate.setHours(0, 0, 0, 0);
        newDate.setFullYear(yearOfLose, monthOfLose, dayOfLose);
        
        return lostItemDb.findByIdAndUpdate(objectId, {$set: {name: name, definition: definition, place: place, date: date}})
        .then((res) => {
            return true;
        });
    }

    async getObjectIdByItemId(itemId){
        const lostItemDb = LostItemDB;
        return lostItemDb.findOne({itemId: itemId}).then((res) => {
            return res._id;
        });
    }

    async searchInLostItems(searchQuery, numberOfLostItems, offset, minDayOfLose, minMonthOfLose, minYearOfLose, maxDay, maxMonth, maxYear){ 
        const lostItemDb = LostItemDB;
        let minDate = new Date();
        minDate.setHours(0, 0, 0, 0);
        minDate.setFullYear(minYearOfLose, minMonthOfLose, minDayOfLose);
        let maxDate = new Date();
        maxDate.setHours(0, 0, 0, 0);
        maxDate.setFullYear(maxYear, maxMonth, maxDay);
        let arrayOfLostObjects = await lostItemDb.fuzzySearch(searchQuery, {
            date: {
                $gte: minDate,
                $lte: maxDate
            }
        }).skip(offset).limit(numberOfLostItems);
        return arrayOfLostObjects.map((item) => {
            return new LostItem(item.name, item.definition, item.itemId, item.place, item.date.getDate(), item.date.getMonth(), item.date.getYear(), item.posterId);
        });
    }

    async filterItems(minDayOfLose, minMonthOfLose, minYearOfLose, maxDay, maxMonth, maxYear, offset, numberOfLostItems, sortBy){
        const lostItemDb = LostItemDB;
        let minDate = new Date();
        minDate.setHours(0, 0, 0, 0);
        minDate.setFullYear(minYearOfLose, minMonthOfLose, minDayOfLose);
        let maxDate = new Date();
        maxDate.setHours(0, 0, 0, 0);
        maxDate.setFullYear(maxYear, maxMonth, maxDay);


        let arrayOfItems;

        if(sortBy == -1){
            arrayOfItems = await lostItemDb.find({
                date: {
                    $lte: maxDate,
                    $gte: minDate
                }
            }).sort({date: -1}).skip(offset).limit(numberOfLostItems);
        }
        else if(sortBy == 1){
            arrayOfItems = await lostItemDb.find({
                date: {
                    $lte: maxDate,
                    $gte: minDate
                }
            }).sort({date: 1}).skip(offset).limit(numberOfLostItems);
        }
        else{
            arrayOfItems = await lostItemDb.find({
                date: {
                    $lte: maxDate,
                    $gte: minDate
                }
            }).skip(offset).limit(numberOfLostItems);
        }

        return arrayOfItems.map((item) => {
            return new LostItem(item.name, item.definition, item.itemId, item.place, item.date.getDate(), item.date.getMonth(), item.date.getYear(), item.posterId);
        });
    }

    async deleteItem(itemId){
        let objectId = await this.getObjectIdByItemId(itemId);
        const lostItemDb = LostItemDB;
        return lostItemDb.findByIdAndDelete(objectId).then((res) => {
            return true;
        });
    }

    async getItemsByIds(arrayOfIds){
        const lostItemDb = LostItemDB;
        return lostItemDb.find({
            _id: {$in: {arrayOfIds}}
        }).map((item) => {
            return new LostItem(item.name, item.definition, item.itemId, item.place, item.date.getDate(), item.date.getMonth(), item.date.getYear(), item.posterId);
        });

    }
}
module.exports = LostItemController;