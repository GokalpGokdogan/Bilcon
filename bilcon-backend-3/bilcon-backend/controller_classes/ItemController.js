const Item = require("../js_classes/Item");


class ItemController{ // interface
    constructor(){
    }
    async createAndAddItemToDb(name, definition, itemId, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, 
    wantToGive, posterId, photo, posterName){ // returns the object id of new item
    }
    async saveItemToDb(item){ // returns the object id
    }
    async editItem(name, definition, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, wantToGive, posterId, photo, objectId){
    } // returns boolean
    async getObjectId(itemId){
    } // returns object id of the item
    async searchInItems(searchQuery, numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, 
    availabilityDuration, minDay,minMonth, minYear, maxDay, maxMonth, maxYear){
    } // returns an array of items
    async getItems(numberOfItems, offset){
    } // returns an array of items
    async filterItems(numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth,
    minYear, maxDay, maxMonth, maxYear, sectionNo, wantToGive, sortBy, name){
    } // returns an array of items
    async addCustomerToFavoritesList(customerId, itemId){
    } // returns boolean
    async removeCustomerFromFavoritesList(customerId, itemId){
    } // returns boolean
    async deleteItem(itemId){
    } // returns array of the favorites list-customer ids
    async getItemsByObjectIds(arrayOfObjectIds){
    } // returns an array of object ids
    async getItemsExceptUsersItems(numberOfItems, offset, nameOfUser){
    }
    async searchItemsExceptUsersItems(searchQuery, numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, 
    availabilityDuration, minDay,minMonth, minYear, maxDay, maxMonth, maxYear, nameOfUser){
    }
    async filterItemsExceptUsersItems(numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth,
    minYear, maxDay, maxMonth, maxYear, sectionNo, wantToGive, sortBy, courseName, nameOfUser){
    }
    getItemType(){
    }
    async getItemCount(nameOfUser){
    }
    async getCountOfItemsByFilter(minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth, minYear, 
    maxDay, maxMonth, maxYear, sectionNo, wantToGive, courseName, nameOfUser){
    }
}
module.exports = ItemController;
