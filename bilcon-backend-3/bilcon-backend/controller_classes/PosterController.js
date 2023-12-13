const SaleItemController = require("./SaleItemController");
const RentItemController = require("./RentItemController");
const LostItemController = require("./LostItemController");
const FoundItemController = require("./FoundItemController");
const PrivateLessonItemController = require("./PrivateLessonItemController");
const CourseItemController = require("./CourseItemController");
const ItemController = require("./ItemController");



const Poster = require("../js_classes/Poster");

const posterDB = require("../db_modules/PosterDb");


class PosterController{

    #itemController;
    #relatedArray;
    #posterId;
    itemType;
    constructor(itemType, posterId){
        this.#posterId = posterId;
        this.itemType = itemType;
        if(itemType == "sale"){
            this.#itemController = new SaleItemController();
            this.#relatedArray = "arrayOfSaleItemIds";
        }
        else if(itemType == "rent"){
            this.#itemController = new RentItemController();
            this.#relatedArray = "arrayOfRentItemIds";
        }
        else if(itemType == "lost"){
            this.#itemController = new LostItemController();
            this.#relatedArray = "arrayOfLostItemIds";
        }
        else if(itemType == "found"){
            this.#itemController = new FoundItemController();
            this.#relatedArray = "arrayOfFoundItemIds";
        }
        else if(itemType == "lesson"){
            this.#itemController = new PrivateLessonItemController();
            this.#relatedArray = "arrayOfPrivateLessonItemIds";
        }
        else{
            this.#itemController = new CourseItemController();
            this.#relatedArray = "arrayOfCourseItemIds";
        }
    }

    set relatedArray(newRelatedArray){
        this.#relatedArray = newRelatedArray;
    }
    get relatedArray(){
        return this.#relatedArray;
    }
    set posterId(newPosterId){
        this.#posterId = newPosterId;
    }
    get posterId(){
        return this.#posterId;
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
            this.#posterId = res._id;
            return res._id;
        });
    }




    async getUserId(){
        const posterDb = posterDB;
        return posterDb.findById(this.posterId).then((res) => {
            return res.userObjectId;
        });
    }
    async postItem(name, definition, itemId, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, 
    wantToGive, photo, posterName){
       
        const posterDb = posterDB;
        let itemObjectId = await this.#itemController.createAndAddItemToDb(name, definition, itemId, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, 
        wantToGive, this.posterId, photo, posterName);
        let arrayType = this.#relatedArray;
        return posterDb.findByIdAndUpdate(this.posterId, {$push: {[arrayType]: itemObjectId}}).then((res) => {
            return true;
        });
    }

    async getItems(offset, numberOfItems){
        const posterDb = posterDB;
        let idArray = await posterDb.findById(this.posterId);

        idArray = idArray[this.relatedArray];
        
        if(idArray.length != 0){
            idArray = idArray.slice(offset, numberOfItems + 1);
          
            return await this.#itemController.getItemsByObjectIds(idArray);
        }
        else{
            return [];
        }
    }

    async getItemObjectId(itemId){
        let objectId = await this.#itemController.getObjectId(itemId);
        return objectId;
    }

    async deleteItem(itemId){
        const posterDb = posterDB;
        let objectId = await this.#itemController.getObjectId(itemId);
        let customerIds = await this.#itemController.deleteItem(itemId);

        await posterDb.findByIdAndUpdate(this.posterId, {
            $pull: {
                [this.relatedArray]: objectId
            }
        });
        if(customerIds == null || customerIds == undefined || this.itemType == "lost" || this.itemType == "found"){
            return [];
        }
        return customerIds;

        
        // remove the item from customers fav list
    }

    async editItem(name, definition, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, wantToGive, photo, itemId){
        let objectId = await this.#itemController.getObjectId(itemId);
        return await this.#itemController.editItem(name, definition, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, wantToGive, this.posterId, photo, objectId)
    }

    async addTransaction(){

    }
    async rateCustomer(){

    }

    


}

module.exports = PosterController;