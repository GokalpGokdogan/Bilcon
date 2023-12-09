const SaleItemController = require("./SaleItemController");
const RentItemController = require("./RentItemController");
const LostItemController = require("./LostItemController");
const FoundItemController = require("./FoundItemController");
const PrivateLesssonItemController = require("./PrivateLessonItemController");
const CourseItemController = require("./CourseItemController");

const Poster = require("../js_classes/Poster");

const posterDB = require("../db_modules/PosterDb");

class PosterController{
    saleItemController;
    rentItemController;
    lostItemController;
    foundItemController;
    privateLessonItemController;
    courseItemController;
    constructor(){
        this.saleItemController = new SaleItemController();
        this.rentItemController = new RentItemController();
        this.lostItemController = new LostItemController();
        this.foundItemController = new FoundItemController();
        this.privateLessonItemController = new PrivateLesssonItemController();
        this.courseItemController = new CourseItemController();
    }

    async createPosterInDb(userId){
        let poster = new Poster(userId, [], [], [], [], [], [], []);
        const posterDb = posterDB;
        return posterDb.create({
            userObjectId: poster.userObjectId,
            arrayOfSaleItemIds: poster.arrayOfSaleItemIds,
            arrayOfRentItemIds: poster.arrayOfRentItemIds,
            arrayOfLostItemIds: poster.arrayOfLostItemIds,
            arrayOfFoundItemIds: poster.arrayOfFoundItemIds,
            arrayOfPrivateLessonItemIds: poster.arrayOfPrivateLessonItemIds,
            arrayOfCourseItemIds: poster.arrayOfCourseItemIds,
            arrayOfTransactionIds: poster.arrayOfTransactionIds,
        }).then((res) => {
            return res._id;
        });
    }

/*     getPosterByPosterId(posterId){
        const posterDb = posterDB;
        return posterDb.findById(posterId).then((res) => {
            return new Poster(res.userObjectId, res.arrayOfSaleItemIds, res.arrayOfRentItemIds, res.arrayOfLostItemIds, res.arrayOfFoundItemIds, 
            res.arrayOfPrivateLessonItemIds, res.arrayOfCourseItemIds, res.arrayOfTransactionIds);
        });
    } */
    async getUserIdByPosterId(posterId){
        const posterDb = posterDB;
        return posterDb.findById(posterId).then((res) => {
            return res.userObjectId;
        });
    }
    async postSaleItem(name, definition, itemId, price, posterId, photo){
        const posterDb = posterDB;
        let itemObjectId = await this.saleItemController.createAndAddSaleItemToDb(name, definition, itemId, price, posterId, photo);
        return posterDb.findByIdAndUpdate(posterId, {$push: {arrayOfSaleItemIds: itemObjectId}}).then((res) => {
            return true;
        });

    }
    async postRentItem(name, definition, itemId, price, durOfPrice, availabilityScalar, availabilityDur, photo, posterId){
        const posterDb = posterDB;
        let itemObjectId = await this.rentItemController.createAndAddItemToDb(name, definition, itemId, price, durOfPrice, availabilityScalar, availabilityDur, photo, posterId);
        return posterDb.findByIdAndUpdate(posterId, {$push: {arrayOfRentItemIds: itemObjectId}}).then((res) => {
            return true;
        });
    }
    async postLostItem(name, definition, itemId, place, dayOfLose, monthOfLose, yearOfLose, posterId){
        const posterDb = posterDB;
        let itemObjectId = await this.lostItemController.createAndAddItemToDb(name, definition, itemId, place, dayOfLose, monthOfLose, yearOfLose, posterId);
        return posterDb.findByIdAndUpdate(posterId, {$push: {arrayOfLostItemIds: itemObjectId}}).then((res) => {
            return true;
        });
    }
    async postFoundItem(name, definition, itemId, photo, place, dayOfFind, monthOfFind, yearOfFind, posterId){
        const posterDb = posterDB;
        let itemObjectId = await this.foundItemController.createAndAddItemToDb(name, definition, itemId, photo, place, dayOfFind, monthOfFind, yearOfFind, posterId);
        return posterDb.findByIdAndUpdate(posterId, {$push: {arrayOfFoundItemIds: itemObjectId}}).then((res) => {
            return true;
        });
    }
    async postPrivateLessonItem(name, definition, itemId, photo, price, posterId){
        const posterDb = posterDB;
        let itemObjectId = await this.privateLessonItemController.createAndAddItemToDb(name, definition, itemId, photo, price, posterId);
        console.log(itemObjectId);
        return posterDb.findByIdAndUpdate(posterId, {$push: {arrayOfPrivateLessonItemIds: itemObjectId}}).then((res) => {
            return true;
        });
    }
    async postCourseItem(name, definition, itemId, sectionNo, posterId, wantToGive){
        const posterDb = posterDB;
        let itemObjectId = await this.courseItemController.createAndAddItemToDb(name, definition, itemId, sectionNo, posterId, wantToGive);
        return posterDb.findByIdAndUpdate(posterId, {$push: {arrayOfCourseItemIds: itemObjectId}}).then((res) => {
            return true;
        });
    }

    async deleteSaleItem(itemId, posterId){
        const posterDb = posterDB;
        let objectId = await this.saleItemController.getObjectIdOfSaleItem(itemId);
        let customerIds = await this.saleItemController.deleteItem(itemId);
        await posterDb.findByIdAndUpdate(posterId, {
            $pull: {
                arrayOfSaleItemIds: objectId
            }
        });
        
        // remove the item from customers fav list
    }
    async deleteRentItem(itemId, posterId){
        const posterDb = posterDB;
        let objectId = await this.rentItemController.getObjectIdOfRentItem(itemId);
        let customerIds = await this.rentItemController.deleteItem(itemId);
        await posterDb.findByIdAndUpdate(posterId, {
            $pull: {
                arrayOfRentItemIds: objectId
            }
        });
        
        // remove the item from customers fav list
    }
    async deleteLostItem(itemId, posterId){
        const posterDb = posterDB;
        let objectId = await this.lostItemController.getObjectIdByItemId(itemId);
        let customerIds = await this.lostItemController.deleteItem(itemId);
        await posterDb.findByIdAndUpdate(posterId, {
            $pull: {
                arrayOfLostItemIds: objectId
            }
        });
        
        // remove the item from customers fav list
    }
    async deleteFoundItem(itemId, posterId){
        const posterDb = posterDB;
        let objectId = await this.foundItemController.getObjectIdByItemId(itemId);
        let customerIds = await this.foundItemController.deleteItem(itemId);
        await posterDb.findByIdAndUpdate(posterId, {
            $pull: {
                arrayOfFoundItemIds: objectId
            }
        });
        
        // remove the item from customers fav list
    }
    async deletePrivateLessonItem(itemId, posterId){
        const posterDb = posterDB;
        let objectId = await this.privateLessonItemController.getObjectIdByItemId(itemId);
        let customerIds = await this.privateLessonItemController.deleteItem(itemId);
        await posterDb.findByIdAndUpdate(posterId, {
            $pull: {
                arrayOfPrivateLessonItemIds: objectId
            }
        });
        
        // remove the item from customers fav list
    }
    async deleteCourseItem(itemId, posterId){
        const posterDb = posterDB;
        let objectId = await this.courseItemController.getObjectIdByItemId(itemId);
        let customerIds = await this.courseItemController.deleteItem(itemId);
        await posterDb.findByIdAndUpdate(posterId, {
            $pull: {
                arrayOfCourseItemIds: objectId
            }
        });
        
        // remove the item from customers fav list
    }
    async addTransaction(){

    }
    async rateCustomer(){

    }
    async getSaleItems(posterId, offset, numberOfItems){
        const posterDb = posterDB;
        let idArray = await posterDb.findById(posterId).arrayOfSaleItems;
        if(idArray.length != 0){
            idArray = idArray.slice(offset, numberOfItems);
            return this.saleItemController.getItemsByIds(idArray);
        }
        else{
            return null;
        }

    }
    async getRentItems(posterId, offset, numberOfItems){
        const posterDb = posterDB;
        let idArray = await posterDb.findById(posterId).arrayOfRentItems;
        if(idArray.length != 0){
            idArray = idArray.slice(offset, numberOfItems);
            return this.rentItemController.getItemsByIds(idArray);
        }
        else{
            return null;
        }
    }
    async getLostItems(posterId, offset, numberOfItems){
        const posterDb = posterDB;
        let idArray = await posterDb.findById(posterId).arrayOfLostItems;
        if(idArray.length != 0){
            idArray = idArray.slice(offset, numberOfItems);
            return this.lostItemController.getItemsByIds(idArray);
        }
        else{
            return null;
        }
    }
    async getFoundItems(posterId, offset, numberOfItems){
        const posterDb = posterDB;
        let idArray = await posterDb.findById(posterId).arrayOfFoundItems;
        if(idArray.length != 0){
            idArray = idArray.slice(offset, numberOfItems);
            return this.foundItemController.getItemsByIds(idArray);
        }
        else{
            return null;
        }
    }
    async getPrivateLessonItems(posterId, offset, numberOfItems){
        const posterDb = posterDB;
        let idArray = await posterDb.findById(posterId).arrayOfPrivateLessonItems;
        if(idArray.length != 0){
            idArray = idArray.slice(offset, numberOfItems);
            return this.privateLessonItemController.getItemsByIds(idArray);
        }
        else{
            return null;
        }
    }
    async getCourseItems(posterId, offset, numberOfItems){
        const posterDb = posterDB;
        let idArray = await posterDb.findById(posterId).arrayOfCourseItems;
        if(idArray.length != 0){
            idArray = idArray.slice(offset, numberOfItems);
            return this.courseItemController.getItemsByIds(idArray);
        }
        else{
            return null;
        }
    }

    // will add edit functions
    


}

module.exports = PosterController;