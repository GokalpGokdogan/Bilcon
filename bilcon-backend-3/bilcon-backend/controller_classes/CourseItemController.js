const CourseItem = require("../js_classes/CourseItem");
const CourseItemDB = require("../db_modules/CourseItemDb");
const ItemController = require("./ItemController");

class CourseItemController extends ItemController{
    constructor(){
        super();
    }

    async createAndAddItemToDb(name, definition, itemId, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, 
        wantToGive, posterId, photo, posterName){
            console.log("xxx");
        let courseItem = new CourseItem(name, definition, itemId, sectionNo, posterId, wantToGive, [], posterName);
        return this.saveItemToDb(courseItem);
    }

    async saveItemToDb(courseItem){
        console.log("yyy");
        const courseItemDb = CourseItemDB;
        return courseItemDb.create({
            name: courseItem.name,
            definition: courseItem.definition,
            itemId: courseItem.itemId,
            sectionNo: courseItem.sectionNo,
            posterId: courseItem.posterId,
            wantToGive: courseItem.wantToGive,
            arrayOfFavoritesList: courseItem.arrayOfFavoritesListCustomerIds,
            posterName: courseItem.posterName
        }).then((res) => {
            return res._id;
        });
    }

    async getItems(numberOfCourseItems, offset){
        const courseItemDb = CourseItemDB;
        let arrayOfCourseItems = await courseItemDb.find({}).sort({createdAt: -1}).skip(offset).limit(numberOfCourseItems).then((res) => {
            return res.map((item) => {
                return new CourseItem(item.name, item.definition, item.itemId, item.sectionNo, item.posterId, item.wantToGive, item.arrayOfFavoritesList, item.posterName);
            });
        });
        return arrayOfCourseItems;
    }

    async editItem(name, definition, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, wantToGive, posterId, photo, objectId){
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

    async getObjectId(itemId){
        console.log(itemId + "hjh");
        const courseItemDb = CourseItemDB;
        return courseItemDb.findOne({itemId: itemId}).then((res) => {
            return res._id;
        });
    }

    async searchInItems(searchQuery, numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, 
        availabilityDuration, minDay,minMonth, minYear, maxDay, maxMonth, maxYear){
            return null; // search is not defined for course items, use filter
    }

    async filterItems(numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth,
        minYear, maxDay, maxMonth, maxYear, sectionNo, wantToGive, sortBy, name){
        const courseItemDb = CourseItemDB;
        let arrayOfCourseItems;
        if(sortBy == -1){
            arrayOfCourseItems = await courseItemDb.find({
                name: name,
                sectionNo: sectionNo,
                wantToGive: wantToGive
            }).sort({createdAt: -1}).skip(offset).limit(numberOfItems);
        }
        else if(sortBy == 1){
            arrayOfCourseItems = await courseItemDb.find({
                name: name,
                sectionNo: sectionNo,
                wantToGive: wantToGive
            }).sort({createdAt: 1}).skip(offset).limit(numberOfItems);
        }
        else{
            arrayOfCourseItems = await courseItemDb.find({
                name: name,
                sectionNo: sectionNo,
                wantToGive: wantToGive
            }).skip(offset).limit(numberOfItems);
        }
        return arrayOfCourseItems.map((item) => {
            return new CourseItem(item.name, item.definition, item.itemId, item.sectionNo, item.posterId, item.wantToGive, item.arrayOfFavoritesList, item.posterName);
        });
    }

    async addCustomerToFavoritesList(customerId, itemId){
        let objectId = await this.getObjectId(itemId);
        const courseItemDb = CourseItemDB;
        return courseItemDb.findByIdAndUpdate(objectId, {$addToSet: {arrayOfFavoritesList: customerId}}).then((res) => {
            return true;
        });
    }

    async removeCustomerFromFavoritesList(customerId, itemId){
        let objectId = await this.getObjectId(itemId);
        const courseItemDb = CourseItemDB;
        return courseItemDb.findByIdAndUpdate(objectId, {$pull: {arrayOfFavoritesList: customerId}}).then((res) => {
            return true;
        });
    }

    async deleteItem(itemId){
        let objectId = await this.getObjectId(itemId);
        const courseItemDb = CourseItemDB;
        return courseItemDb.findByIdAndDelete(objectId).then((res) => {
            return res.arrayOfFavoritesList;
        });
    }

    async getItemsByObjectIds(arrayOfObjectIds){
        const courseItemDb = CourseItemDB;
        return courseItemDb.find({
            _id: {$in: arrayOfObjectIds}
        }).then((res) => {
            if(res == null){
                return [];
            }
            return res.map((item) => {
                return new CourseItem(item.name, item.definition, item.itemId, item.sectionNo, item.posterId, item.wantToGive, item.arrayOfFavoritesList, item.posterName);
            });
        })

    }
    async getItemsExceptUsersItems(numberOfItems, offset, nameOfUser){
        const courseItemDb = CourseItemDB;
        let arrayOfCourseItems = await courseItemDb.find({posterName: {$ne: nameOfUser}}).sort({createdAt: -1}).skip(offset).limit(numberOfItems).then((res) => {
            return res.map((item) => {
                return new CourseItem(item.name, item.definition, item.itemId, item.sectionNo, item.posterId, item.wantToGive, item.arrayOfFavoritesList, item.posterName);
            });
        });
        return arrayOfCourseItems;
    }
    async searchItemsExceptUsersItems(searchQuery, numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, 
    availabilityDuration, minDay,minMonth, minYear, maxDay, maxMonth, maxYear, nameOfUser){
        return [];
    }
    async filterItemsExceptUsersItems(numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth,
    minYear, maxDay, maxMonth, maxYear, sectionNo, wantToGive, sortBy, courseName, nameOfUser){
        const courseItemDb = CourseItemDB;
        let arrayOfCourseItems;
        if(sortBy == -1){
            arrayOfCourseItems = await courseItemDb.find({
                name: courseName,
                sectionNo: sectionNo,
                wantToGive: wantToGive,
                posterName: {
                    $ne: nameOfUser
                }
            }).sort({createdAt: -1}).skip(offset).limit(numberOfItems);
        }
        else if(sortBy == 1){
            arrayOfCourseItems = await courseItemDb.find({
                name: courseName,
                sectionNo: sectionNo,
                wantToGive: wantToGive,
                posterName: {
                    $ne: nameOfUser
                }
            }).sort({createdAt: 1}).skip(offset).limit(numberOfItems);
        }
        else{
            arrayOfCourseItems = await courseItemDb.find({
                name: courseName,
                sectionNo: sectionNo,
                wantToGive: wantToGive,
                posterName: {
                    $ne: nameOfUser
                }
            }).skip(offset).limit(numberOfItems);
        }
        return arrayOfCourseItems.map((item) => {
            return new CourseItem(item.name, item.definition, item.itemId, item.sectionNo, item.posterId, item.wantToGive, item.arrayOfFavoritesList, item.posterName);
        });
    }
    getItemType(){
        return "course";
    }

    async getItemCount(nameOfUser){
        const courseItemDb = CourseItemDB;
        let itemCount = await courseItemDb.countDocuments({posterName: {$ne: nameOfUser}}, (err, count) => {
            return count;
        });
        return itemCount;

    }
    async getCountOfItemsByFilter(minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth, minYear, 
        maxDay, maxMonth, maxYear, sectionNo, wantToGive, courseName, nameOfUser){
            const courseItemDb = CourseItemDB;
            
            let itemCount = await courseItemDb.countDocuments({
                name: courseName,
                sectionNo: sectionNo,
                wantToGive: wantToGive,
                posterName: {
                    $ne: nameOfUser
                }
            }, (err, count) => {
                return count;
            });
            return itemCount;
    }
}

module.exports = CourseItemController;
