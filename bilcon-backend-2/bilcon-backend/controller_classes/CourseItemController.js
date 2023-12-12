const CourseItem = require("../js_classes/CourseItem");
const CourseItemDB = require("../db_modules/CourseItemDb");

class CourseItemController{
    constructor(){
    }

    async createAndAddItemToDb(name, definition, itemId, sectionNo, posterId, wantToGive){
        let courseItem = new CourseItem(name, definition, itemId, sectionNo, posterId, wantToGive, []);
        return this.saveItemToDb(courseItem);
    }

    async saveItemToDb(courseItem){
        const courseItemDb = CourseItemDB;
        return courseItemDb.create({
            name: courseItem.name,
            definition: courseItem.definition,
            itemId: courseItem.itemId,
            sectionNo: courseItem.sectionNo,
            posterId: courseItem.posterId,
            wantToGive: courseItem.wantToGive,
            arrayOfFavoritesList: courseItem.arrayOfFavoritesListCustomerIds
        }).then((res) => {
            return res._id;
        });
    }

    async getCourseItems(numberOfCourseItems, offset){
        const courseItemDb = CourseItemDB;
        let arrayOfCourseItems = await courseItemDb.find({}).sort({createdAt: -1}).skip(offset).limit(numberOfCourseItems).then((res) => {
            return res.map((item) => {
                return new CourseItem(item.name, item.definition, item.itemId, item.sectionNo, item.posterId, item.wantToGive, item.arrayOfFavoritesList);
            });
        });
        return arrayOfCourseItems;
    }

    async editItem(name, definition, sectionNo, wantToGive, objectId){
        const courseItemDb = CourseItemDB;
        return courseItemDb.findByIdAndUpdate(objectId, {$set: {
            name: name,
            definition: definition,
            sectionNo: sectionNo,
            wantToGive: wantToGive
        }}).then((res) => {
            return true;
        });
    }

    async getObjectIdByItemId(itemId){
        const courseItemDb = CourseItemDB;
        return courseItemDb.findOne({itemId: itemId}).then((res) => {
            return res._id;
        });
    }

    async filterItems(numberOfCourseItems, offset, sortBy, name, sectionNo, wantToGive){
        const courseItemDb = CourseItemDB;
        let arrayOfCourseItems;
        if(sortBy == -1){
            arrayOfCourseItems = await courseItemDb.find({
                name: name,
                sectionNo: sectionNo,
                wantToGive: wantToGive
            }).sort({createdAt: -1}).skip(offset).limit(numberOfCourseItems);
        }
        else if(sortBy == 1){
            arrayOfCourseItems = await courseItemDb.find({
                name: name,
                sectionNo: sectionNo,
                wantToGive: wantToGive
            }).sort({createdAt: 1}).skip(offset).limit(numberOfCourseItems);
        }
        else{
            arrayOfCourseItems = await courseItemDb.find({
                name: name,
                sectionNo: sectionNo,
                wantToGive: wantToGive
            }).skip(offset).limit(numberOfCourseItems);
        }
        return arrayOfCourseItems.map((item) => {
            return new CourseItem(item.name, item.definition, item.itemId, item.sectionNo, item.posterId, item.wantToGive, item.arrayOfFavoritesList);
        });
    }

    async addCustomerIdToFavoritesList(itemId, customerId){
        let objectId = await this.getObjectIdByItemId(itemId);
        const courseItemDb = CourseItemDB;
        return courseItemDb.findByIdAndUpdate(objectId, {$push: {arrayOfFavoritesList: customerId}}).then((res) => {
            return true;
        });
    }

    async removeCustomerFromFavoritesList(itemId, customerId){
        let objectId = await this.getObjectIdByItemId(itemId);
        const courseItemDb = CourseItemDB;
        return courseItemDb.findByIdAndUpdate(objectId, {$pull: {arrayOfFavoritesList: customerId}}).then((res) => {
            return true;
        });
    }

    async deleteItem(itemId){
        let objectId = await this.getObjectIdByItemId(itemId);
        const courseItemDb = CourseItemDB;
        return courseItemDb.findByIdAndDelete(objectId).then((res) => {
            return res.arrayOfFavoritesList;
        });
    }

    async getItemsByIds(arrayOfIds){
        const courseItemDb = CourseItemDB;
        return courseItemDb.find({
            _id: {$in: {arrayOfIds}}
        }).map((item) => {
            return new CourseItem(item.name, item.definition, item.itemId, item.sectionNo, item.posterId, item.wantToGive, item.arrayOfFavoritesList);
        });

    }
}

module.exports = CourseItemController;