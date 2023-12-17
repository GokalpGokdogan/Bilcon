const SaleItemController = require("./SaleItemController");
const RentItemController = require("./RentItemController");
const LostItemController = require("./LostItemController");
const FoundItemController = require("./FoundItemController");
const PrivateLesssonItemController = require("./PrivateLessonItemController");
const CourseItemController = require("./CourseItemController");

const Customer = require("../js_classes/Customer");

const customerDB = require("../db_modules/CustomerDb");

class CustomerController{
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
            return res._id;
        });
    }

    async getUserIdByCustomerId(customerId){
        const customerDb = customerDB;
        return customerDb.findById(customerId).then((res) => {
            return res.userObjectId;
        });
    }

    async searchInSaleItems(searchQuery, numberOfSaleItems, minPrice, maxPrice, offset){
        return this.saleItemController.searchInSaleItem(searchQuery, numberOfSaleItems, minPrice, maxPrice, offset);
    }

    async searchInRentItems(searchQuery, numberOfRentItems, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, offset){
        return this.rentItemController.searchInRentItems(searchQuery, numberOfRentItems, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, offset);
    }
    async searchInLostItems(searchQuery, numberOfLostItems, offset, minDayOfLose, minMonthOfLose, minYearOfLose, maxDay, maxMonth, maxYear){
        return this.lostItemController.searchInLostItems(searchQuery, numberOfLostItems, offset, minDayOfLose, minMonthOfLose, minYearOfLose, maxDay, maxMonth, maxYear);
    }
    async searchInFoundItems(searchQuery, numberOfFoundItems, offset, minDayOfFind, minMonthOfFind, minYearOfFind, maxDay, maxMonth, maxYear){
        return this.foundItemController.searchInFoundItems(searchQuery, numberOfFoundItems, offset, minDayOfFind, minMonthOfFind, minYearOfFind, maxDay, maxMonth, maxYear);
    }
    async searchInPrivateLessonItems(searchQuery, minPrice, maxPrice, offset, numberOfPLItems){
        return this.privateLessonItemController.searchInPrivateLessonItems(searchQuery, minPrice, maxPrice, offset, numberOfPLItems);
    }

    

    async getSaleItems(numberOfSaleItems, offset){
        return this.saleItemController.getSaleItems(numberOfSaleItems, offset);
    }
    async getRentItems(numberOfRentItems, offset){
        return this.rentItemController.getRentItems(numberOfRentItems, offset);
    }
    async getLostItems(numberOfLostItems, offset){
        return this.lostItemController.getLostItems(numberOfLostItems, offset);
    }
    async getFoundItems(numberOfFoundItems, offset){
        return this.foundItemController.getFoundItems(numberOfFoundItems, offset);
    }
    async getPrivateLessonItems(numberOfPLItems, offset){
        return this.privateLessonItemController.getPrivateLessonItems(numberOfPLItems, offset);
    }
    async getCourseItems(numberOfCourseItems, offset){
        return this.courseItemController.getCourseItems(numberOfCourseItems, offset);
    }

    async filterSaleItems(numberOfSaleItems, minPrice, maxPrice, offset, sortBy){
        return this.saleItemController.filterItems(numberOfSaleItems, minPrice, maxPrice, offset, sortBy);
    }
    async filterRentItems(numberOfRentItems, sortBy, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, offset){
        return this.rentItemController.filterItems(numberOfRentItems, sortBy, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, offset);
    }
    async filterLostItems(minDayOfLose, minMonthOfLose, minYearOfLose, maxDay, maxMonth, maxYear, offset, numberOfLostItems, sortBy){
        return this.lostItemController.filterItems(minDayOfLose, minMonthOfLose, minYearOfLose, maxDay, maxMonth, maxYear, offset, numberOfLostItems, sortBy);
    }
    async filterFoundItems(minDayOfFound, minMonthOfFound, minYearOfFound, maxDay, maxMonth, maxYear, offset, numberOfFoundItem, sortBy){
        return this.foundItemController.filterItems(minDayOfFound, minMonthOfFound, minYearOfFound, maxDay, maxMonth, maxYear, offset, numberOfFoundItem, sortBy);
    }
    async filterPrivateLessonItems(minPrice, maxPrice, offset, numberOfPLItems, sortBy){
        return this.privateLessonItemController.filterItems(minPrice, maxPrice, offset, numberOfPLItems, sortBy);
    }
    async filterCourseItems(numberOfCourseItems, offset, sortBy, name, sectionNo, wantToGive){
        return this.courseItemController.filterItems(numberOfCourseItems, offset, sortBy, name, sectionNo, wantToGive);
    }

    async addSaleItemToFavoritesList(customerId, itemId){
        const customerDb = customerDB;
        let objectId = await this.saleItemController.getObjectIdOfSaleItem(itemId);

        let addToCustomersList = customerDb.findByIdAndUpdate(customerId, {
            $push: {
                arrayOfSaleItemFavoritesList: objectId
            }
        });
        let addToItemsList = this.saleItemController.addCustomerIdToFavoritesList(customerId, itemId);

        return Promise.all([addToCustomersList, addToItemsList]).then((res) => {
            return true;
        });
    }
    async addRentItemToFavoritesList(customerId, itemId){
        const customerDb = customerDB;
        let objectId = await this.rentItemController.getObjectIdOfRentItem(itemId);

        let addToCustomersList = customerDb.findByIdAndUpdate(customerId, {
            $push: {
                arrayOfRentItemFavoritesList: objectId
            }
        });
        let addToItemsList = this.rentItemController.addCustomerIdToFavoritesList(customerId, itemId);

        return Promise.all([addToCustomersList, addToItemsList]).then((res) => {
            return true;
        });
    }
    async addPrivateLessonItemToFavoritesList(customerId, itemId){
        const customerDb = customerDB;
        let objectId = await this.privateLessonItemController.getObjectIdByItemId(itemId);

        let addToCustomersList = customerDb.findByIdAndUpdate(customerId, {
            $push: {
                arrayOfPrivateLessonItemFavoritesList: objectId
            }
        });
        let addToItemsList = this.privateLessonItemController.addCustomerIdToFavoritesList(customerId, itemId);

        return Promise.all([addToCustomersList, addToItemsList]).then((res) => {
            return true;
        });
    }
    async addCourseItemToFavoritesList(customerId, itemId){
        const customerDb = customerDB;
        let objectId = await this.courseItemController.getObjectIdByItemId(itemId);

        let addToCustomersList = customerDb.findByIdAndUpdate(customerId, {
            $push: {
                arrayOfCourseItemFavoritesList: objectId
            }
        });
        let addToItemsList = this.courseItemController.addCustomerIdToFavoritesList(customerId, itemId);

        return Promise.all([addToCustomersList, addToItemsList]).then((res) => {
            return true;
        });
    }

    async removeSaleItemFromFavoritesList(customerId, itemId){
        const customerDb = customerDB;
        let objectId = await this.saleItemController.getObjectIdOfSaleItem(itemId);

        let removeFromCustomersList = customerDb.findByIdAndUpdate(customerId, {
            $pull: {
                arrayOfSaleItemFavoritesList: objectId
            }
        });
        let removeFromItemsList = this.saleItemController.removeCustomerFromFavoritesList(customerId, itemId);

        return Promise.all([removeFromCustomersList, removeFromItemsList]).then((res) => {
            return true;
        });
    }
    async removeRentItemFromFavoritesList(customerId, itemId){
        const customerDb = customerDB;
        let objectId = await this.rentItemController.getObjectIdOfRentItem(itemId);

        let removeFromCustomersList = customerDb.findByIdAndUpdate(customerId, {
            $pull: {
                arrayOfRentItemFavoritesList: objectId
            }
        });
        let removeFromItemsList = this.rentItemController.removeCustomerFromFavoritesList(customerId, itemId);

        return Promise.all([removeFromCustomersList, removeFromItemsList]).then((res) => {
            return true;
        });
    }
    async removePrivateLessonItemFromFavoritesList(customerId, itemId){
        const customerDb = customerDB;
        let objectId = await this.privateLessonItemController.getObjectIdByItemId(itemId);

        let removeFromCustomersList = customerDb.findByIdAndUpdate(customerId, {
            $pull: {
                arrayOfPrivateLessonItemFavoritesList: objectId
            }
        });
        let removeFromItemsList = this.privateLessonItemController.removeCustomerFromFavoritesList(customerId, itemId);

        return Promise.all([removeFromCustomersList, removeFromItemsList]).then((res) => {
            return true;
        });
    }
    async removeCourseItemFromFavoritesList(customerId, itemId){
        const customerDb = customerDB;
        let objectId = await this.courseItemController.getObjectIdByItemId(itemId);

        let removeFromCustomersList = customerDb.findByIdAndUpdate(customerId, {
            $pull: {
                arrayOfCourseItemFavoritesList: objectId
            }
        });
        let removeFromItemsList = this.courseItemController.removeCustomerFromFavoritesList(customerId, itemId);

        return Promise.all([removeFromCustomersList, removeFromItemsList]).then((res) => {
            return true;
        });
    }




    
}

module.exports = CustomerController;