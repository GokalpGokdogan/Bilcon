const RentItem = require("../js_classes/RentItem");
const RentItemDB = require("../db_modules/RentItemDb");

class RentItemController{
    constructor(){
    }

    async createAndAddItemToDb(name, definition, itemId, price, durOfPrice, availabilityScalar, availabilityDur, photo, posterId){
        let itemToBeAdded = new RentItem(name, definition, itemId, price, durOfPrice, availabilityScalar, availabilityDur, photo, posterId, []);
        return await this.saveItemToDb(itemToBeAdded);
    }

    async saveItemToDb(rentItem){
        const rentItemDb = RentItemDB;
        return rentItemDb.create({
            name: rentItem.name,
            definition: rentItem.definition,
            itemId: rentItem.itemId,
            price: rentItem.price,
            posterId: rentItem.posterId,
            photo: rentItem.photo,
            durationOfPrice: rentItem.durationOfPrice,
            availabilityScalar: rentItem.availabilityScalar,
            availabilityDuration: rentItem.availabilityDuration,
            arrayOfFavoritesList: rentItem.arrayOfFavoritesListCustomerIds
        }).then((res) => {
            return res._id;
        });
    }

    async getRentItems(numberOfRentItems, offset){
        const rentItemDb = RentItemDB;
        return rentItemDb.find({}).sort({createdAt: -1}).skip(offset).limit(numberOfRentItems).then((rentItems) => {
            return rentItems.map((itemData) => {
                return new RentItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.durationOfPrice, itemData.availabilityScalar,
                itemData.availabilityDuration, itemData.photo, itemData.posterId, itemData.arrayOfFavoritesList);
            });
        });
    }

    async editItem(name, definition, price, durOfPrice, availabilityScalar, availabilityDur, photo, objectId){
        const rentItemDb = RentItemDB;
        return rentItemDb.findByIdAndUpdate(objectId, {$set: {name: name, definition: definition, price: price, durationOfPrice: durOfPrice
        , availabilityScalar: availabilityScalar, availabilityDuration: availabilityDur, photo: photo, price: price}}).then((res) => {
            return true;
        });
    }

    async getObjectIdOfRentItem(itemId){
        const rentItemDb = RentItemDB;
        return rentItemDb.findOne({itemId: itemId}).then((res) => {
            return res._id;
        });
    }



    async searchInRentItems(searchQuery, numberOfRentItems, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, offset){
        const rentItemDb = RentItemDB;
        let arrayOfRentObjects = await rentItemDb.fuzzySearch(searchQuery, {
            durationOfPrice: durationOfPrice,
            availabilityDuration: availabilityDuration,
            price: {
                $gte: minPrice,
                $lte: maxPrice
            },
            availabilityScalar: {
                $gte: minAvailabilityScalar,
                $lte: maxAvailabilityScalar
            }
        }).skip(offset).limit(numberOfRentItems);
        return arrayOfRentObjects.map((itemData) => {
            return new RentItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.durationOfPrice, itemData.availabilityScalar,
                itemData.availabilityDuration, itemData.photo, itemData.posterId, itemData.arrayOfFavoritesList);
        });
    }

    async filterItems(numberOfRentItems, sortBy, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, offset){
        const rentItemDb = RentItemDB;
        let arrayOfRentObjects;
        if(sortBy == -1){
            arrayOfRentObjects = await rentItemDb.find({
                durationOfPrice: durationOfPrice,
                availabilityDuration: availabilityDuration,
                price: {
                    $gte: minPrice,
                    $lte: maxPrice
                },
                availabilityScalar: {
                    $gte: minAvailabilityScalar,
                    $lte: maxAvailabilityScalar
                }
            }).sort({price: -1}).skip(offset).limit(numberOfRentItems);
            return arrayOfRentObjects.map((itemData) => {
                return new RentItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.durationOfPrice, itemData.availabilityScalar,
                    itemData.availabilityDuration, itemData.photo, itemData.posterId, itemData.arrayOfFavoritesList);
            });
        }
        else if(sortBy == 1){
            arrayOfRentObjects = await rentItemDb.find({
                durationOfPrice: durationOfPrice,
                availabilityDuration: availabilityDuration,
                price: {
                    $gte: minPrice,
                    $lte: maxPrice
                },
                availabilityScalar: {
                    $gte: minAvailabilityScalar,
                    $lte: maxAvailabilityScalar
                }
            }).sort({price: 1}).skip(offset).limit(numberOfRentItems);
            return arrayOfRentObjects.map((itemData) => {
                return new RentItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.durationOfPrice, itemData.availabilityScalar,
                    itemData.availabilityDuration, itemData.photo, itemData.posterId, itemData.arrayOfFavoritesList);
            });
        }
        else{
            arrayOfRentObjects = await rentItemDb.find({
                durationOfPrice: durationOfPrice,
                availabilityDuration: availabilityDuration,
                price: {
                    $gte: minPrice,
                    $lte: maxPrice
                },
                availabilityScalar: {
                    $gte: minAvailabilityScalar,
                    $lte: maxAvailabilityScalar
                }
            }).skip(offset).limit(numberOfRentItems);
            return arrayOfRentObjects.map((itemData) => {
                return new RentItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.durationOfPrice, itemData.availabilityScalar,
                    itemData.availabilityDuration, itemData.photo, itemData.posterId, itemData.arrayOfFavoritesList);
            });
        }
    }

    async addCustomerIdToFavoritesList(customerId, itemId){
        const rentItemDb = RentItemDB;
        let objectId = await this.getObjectIdOfRentItem(itemId);
        return rentItemDb.findByIdAndUpdate(objectId, {$push:{arrayOfFavoritesList: customerId}}).then((res) => {
            return true;
        });
    }

    async removeCustomerFromFavoritesList(customerId, itemId){
        const rentItemDb = RentItemDB;
        let objectId = await this.getObjectIdOfRentItem(itemId);
        return rentItemDb.findByIdAndUpdate(objectId, {$pull:{arrayOfFavoritesList: customerId}}).then((res) => {
            return true;
        });
    }

    async deleteItem(itemId){
        const rentItemDb = RentItemDB;
        let objectId = await this.getObjectIdOfRentItem(itemId);
        return rentItemDb.findByIdAndDelete(objectId).then((res) => {
            return res.arrayOfFavoritesList;
        });
    }

    async getItemsByIds(arrayOfIds){
        const rentItemDb = RentItemDB;
        return rentItemDb.find({
            _id: {$in: {arrayOfIds}}
        }).map((itemData) => {
            return new RentItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.durationOfPrice, itemData.availabilityScalar,
                itemData.availabilityDuration, itemData.photo, itemData.posterId, itemData.arrayOfFavoritesList);
        });

    }

}

module.exports = RentItemController;