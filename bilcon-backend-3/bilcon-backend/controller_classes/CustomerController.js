const SaleItemController = require("./SaleItemController");
const RentItemController = require("./RentItemController");
const LostItemController = require("./LostItemController");
const FoundItemController = require("./FoundItemController");
const PrivateLessonItemController = require("./PrivateLessonItemController");
const CourseItemController = require("./CourseItemController");

const Customer = require("../js_classes/Customer");

const customerDB = require("../db_modules/CustomerDb");

class CustomerController{

    #itemController;
    #relatedArray;
    #customerId;

    constructor(itemType, customerId){

        this.#customerId = customerId;

        if(itemType == "sale"){
            this.#itemController = new SaleItemController();
            this.#relatedArray = "arrayOfSaleItemFavoritesList";
        }
        else if(itemType == "rent"){
            this.#itemController = new RentItemController();
            this.#relatedArray = "arrayOfRentItemFavoritesList";
        }
        else if(itemType == "lost"){
            this.#itemController = new LostItemController();
            this.#relatedArray = " ";
        }
        else if(itemType == "found"){
            this.#itemController = new FoundItemController();
            this.#relatedArray = " ";
        }
        else if(itemType == "lesson"){
            this.#itemController = new PrivateLessonItemController();
            this.#relatedArray = "arrayOfPrivateLessonItemFavoritesList";
        }
        else{
            this.#itemController = new CourseItemController();
            this.#relatedArray = "arrayOfCourseItemFavoritesList";
        }
    }

    set relatedArray(newRelatedArray){
        this.#relatedArray = newRelatedArray;
    }
    get relatedArray(){
        return this.#relatedArray;
    }
    set customerId(newCustomerId){
        this.#customerId = newCustomerId;
    }
    get customerId(){
        return this.#customerId;
    }

    async createCustomerInDb(userId){
        let customer = new Customer(userId, [], [], [], [], []);
        const customerDb = customerDB;
        return customerDb.create({
            userObjectId: customer.userObjectId,
            arrayOfTransactionIds: customer.arrayOfTransactionIds,
            arrayOfSaleItemFavoritesList: customer.arrayOfSaleItemFavoritesList,
            arrayOfRentItemFavoritesList: customer.arrayOfRentItemFavoritesList,
            arrayOfPrivateLessonItemFavoritesList: customer.arrayOfPrivateLessonItemFavoritesList,
            arrayOfCourseItemFavoritesList: customer.arrayOfCourseItemFavoritesList,
        }).then((res) => {
            this.customerId = res._id;
            return res._id;
        });
    }

    async getUserId(){
        const customerDb = customerDB;
        return customerDb.findById(this.customerId).then((res) => {
            return res.userObjectId;
        });
    }

    async searchItem(searchQuery, numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, 
    availabilityDuration, minDay,minMonth, minYear, maxDay, maxMonth, maxYear){
        let willReturn = await this.#itemController.searchInItems(searchQuery, numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, 
            availabilityDuration, minDay,minMonth, minYear, maxDay, maxMonth, maxYear);
        if(willReturn == null || willReturn == undefined){
            return [];
        }
        return willReturn;
    }

    async getItems(numberOfItems, offset){
        let willReturn = await this.#itemController.getItems(numberOfItems, offset);
        if(willReturn == null || willReturn == undefined){
            return [];
        }
        return willReturn;
    }

    async filterItems(numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth,
    minYear, maxDay, maxMonth, maxYear, sectionNo, wantToGive, sortBy, name){
        let willReturn = await this.#itemController.filterItems(numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth,
        minYear, maxDay, maxMonth, maxYear, sectionNo, wantToGive, sortBy, name);
        if(willReturn == null || willReturn == undefined){
            return [];
        }
        return willReturn;
    }



    async addItemToFavoritesList(itemId){
        const customerDb = customerDB;
        let objectId = await this.#itemController.getObjectId(itemId);
        let addToCustomersList = customerDb.findByIdAndUpdate(this.customerId, {
            $addToSet: {
                [this.#relatedArray]: objectId
            }
        });
        let addToItemsList = this.#itemController.addCustomerToFavoritesList(this.customerId, itemId);
        return Promise.all([addToCustomersList, addToItemsList]).then((res) => {
            return true;
        });
    }




    async removeItemFromFavoritesList(itemId){
        const customerDb = customerDB;
        let objectId = await this.#itemController.getObjectId(itemId);
        let addToCustomersList = customerDb.findByIdAndUpdate(this.customerId, {
            $pull: {
                [this.#relatedArray]: objectId
            }
        });
        let addToItemsList = this.#itemController.removeCustomerFromFavoritesList(this.customerId, itemId);
        return Promise.all([addToCustomersList, addToItemsList]).then((res) => {
            return true;
        });

    }

    async removeItemIdFromOnlyCustomersFavoritesList(itemObjectId){
        const customerDb = customerDB;
        return customerDb.findByIdAndUpdate(this.customerId, {
            $pull: {
                [this.#relatedArray]: itemObjectId
            }
        });
    }

    async getItemsInFavoritesList(offset, numberOfItems){
        const customerDb = customerDB;
        let idArray = await customerDb.findById(this.customerId);
        idArray = idArray[this.relatedArray];
        if(idArray == undefined || idArray == null || idArray.length != 0){
            idArray = idArray.slice(offset, numberOfItems);
            return await this.#itemController.getItemsByObjectIds(idArray);
        }
        else{
            return [];
        }

    }

    async getFavoritesListItemIds(){
        const customerDb = customerDB;
        let idArray = await customerDb.findById(this.customerId);
        idArray = idArray[this.relatedArray];
        
        if(idArray == undefined || idArray == null || idArray.length == 0){
            return [];
        }
        else if(idArray.length != 0){
            let arrayOfItems = await this.#itemController.getItemsByObjectIds(idArray);
            return arrayOfItems.map((item) => {
                return item.itemId;
            });
        }
    }

    async searchItemsExceptUsersItems(searchQuery, numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, 
    availabilityDuration, minDay,minMonth, minYear, maxDay, maxMonth, maxYear, nameOfUser){
        let willReturn = await this.#itemController.searchItemsExceptUsersItems(searchQuery, numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, 
            availabilityDuration, minDay,minMonth, minYear, maxDay, maxMonth, maxYear, nameOfUser);
        if(willReturn == null || willReturn == undefined){
            return [];
        }
        return willReturn;
    }

    async getItemsExceptUsersItems(numberOfItems, offset, nameOfUser){
        let willReturn = await this.#itemController.getItemsExceptUsersItems(numberOfItems, offset, nameOfUser);
        if(willReturn == null || willReturn == undefined){
            return [];
        }
        return willReturn;
    }

    async filterItemsExceptUsersItems(numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth,
        minYear, maxDay, maxMonth, maxYear, sectionNo, wantToGive, sortBy, courseName, nameOfUser){
        let willReturn = await this.#itemController.filterItemsExceptUsersItems(numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth,
            minYear, maxDay, maxMonth, maxYear, sectionNo, wantToGive, sortBy, courseName, nameOfUser);
            if(willReturn == null || willReturn == undefined){
                return [];
            }
            return willReturn;
    }

    async getItemCount(nameOfUser){
        return await this.itemController.getItemCount(nameOfUser);
    }
    async getCountOfItemsByFilter(minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth, minYear, 
        maxDay, maxMonth, maxYear, sectionNo, wantToGive, courseName, nameOfUser){
        return await this.itemController.getCountOfItemsByFilter(minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth, minYear, 
            maxDay, maxMonth, maxYear, sectionNo, wantToGive, courseName, nameOfUser);
    }




    
}

module.exports = CustomerController;
