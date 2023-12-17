const RentItem = require("../js_classes/RentItem");
const RentItemDB = require("../db_modules/RentItemDb");
const ItemController = require("./ItemController");

class RentItemController extends ItemController{
    constructor(){
        super();
    }

    async createAndAddItemToDb(name, definition, itemId, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, 
        wantToGive, posterId, photo, posterName){
        let itemToBeAdded = new RentItem(name, definition, itemId, price, durationOfPrice, availabilityScalar, availabilityDuration, photo, posterId, [], posterName);
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
            arrayOfFavoritesList: rentItem.arrayOfFavoritesListCustomerIds,
            posterName: rentItem.posterName
        }).then((res) => {
            return res._id;
        });
    }

    async getItems(numberOfRentItems, offset){
        const rentItemDb = RentItemDB;
        return rentItemDb.find({}).sort({createdAt: -1}).skip(offset).limit(numberOfRentItems).then((rentItems) => {
            return rentItems.map((itemData) => {
                return new RentItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.durationOfPrice, itemData.availabilityScalar,
                itemData.availabilityDuration, itemData.photo, itemData.posterId, itemData.arrayOfFavoritesList, itemData.posterName);
            });
        });
    }

    async editItem(name, definition, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, wantToGive, posterId, photo, objectId){
        const rentItemDb = RentItemDB;
        return rentItemDb.findByIdAndUpdate(objectId, {$set: {definition: definition, price: price, durationOfPrice: durationOfPrice
        , availabilityScalar: availabilityScalar, availabilityDuration: availabilityDuration, photo: photo, price: price}}).then((res) => {
            return true;
        });
    }

    async getObjectId(itemId){
        const rentItemDb = RentItemDB;
        return rentItemDb.findOne({itemId: itemId}).then((res) => {
            return res._id;
        });
    }



    async searchInItems(searchQuery, numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, 
        availabilityDuration, minDay,minMonth, minYear, maxDay, maxMonth, maxYear){
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
        }).skip(offset).limit(numberOfItems);
        return arrayOfRentObjects.map((itemData) => {
            return new RentItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.durationOfPrice, itemData.availabilityScalar,
                itemData.availabilityDuration, itemData.photo, itemData.posterId, itemData.arrayOfFavoritesList, itemData.posterName);
        });
    }

    async filterItems(numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth,
        minYear, maxDay, maxMonth, maxYear, sectionNo, wantToGive, sortBy, name){
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
            }).sort({price: -1}).skip(offset).limit(numberOfItems);
            return arrayOfRentObjects.map((itemData) => {
                return new RentItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.durationOfPrice, itemData.availabilityScalar,
                    itemData.availabilityDuration, itemData.photo, itemData.posterId, itemData.arrayOfFavoritesList, itemData.posterName);
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
            }).sort({price: 1}).skip(offset).limit(numberOfItems);
            return arrayOfRentObjects.map((itemData) => {
                return new RentItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.durationOfPrice, itemData.availabilityScalar,
                    itemData.availabilityDuration, itemData.photo, itemData.posterId, itemData.arrayOfFavoritesList, itemData.posterName);
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
            }).skip(offset).limit(numberOfItems);
            return arrayOfRentObjects.map((itemData) => {
                return new RentItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.durationOfPrice, itemData.availabilityScalar,
                    itemData.availabilityDuration, itemData.photo, itemData.posterId, itemData.arrayOfFavoritesList, itemData.posterName);
            });
        }
    }

    async addCustomerToFavoritesList(customerId, itemId){
        const rentItemDb = RentItemDB;
        let objectId = await this.getObjectId(itemId);
        return rentItemDb.findByIdAndUpdate(objectId, {$addToSet:{arrayOfFavoritesList: customerId}}).then((res) => {
            return true;
        });
    }

    async removeCustomerFromFavoritesList(customerId, itemId){
        const rentItemDb = RentItemDB;
        let objectId = await this.getObjectId(itemId);
        return rentItemDb.findByIdAndUpdate(objectId, {$pull:{arrayOfFavoritesList: customerId}}).then((res) => {
            return true;
        });
    }

    async deleteItem(itemId){
        const rentItemDb = RentItemDB;
        let objectId = await this.getObjectId(itemId);
        return rentItemDb.findByIdAndDelete(objectId).then((res) => {
            return res.arrayOfFavoritesList;
        });
    }

    async getItemsByObjectIds(arrayOfObjectIds){
        const rentItemDb = RentItemDB;
        return rentItemDb.find({
            _id: {$in: arrayOfObjectIds}
        }).then((res) => {
            if(res == null){
                return [];
            }
            return res.map((itemData) => {
                return new RentItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.durationOfPrice, itemData.availabilityScalar,
                    itemData.availabilityDuration, itemData.photo, itemData.posterId, itemData.arrayOfFavoritesList, itemData.posterName);
            });
        });

    }

    getItemType(){
        return "rent";
    }

    async getItemsExceptUsersItems(numberOfItems, offset, nameOfUser){
        const rentItemDb = RentItemDB;
        return rentItemDb.find({posterName: {$ne: nameOfUser}}).sort({createdAt: -1}).skip(offset).limit(numberOfItems).then((rentItems) => {
            return rentItems.map((itemData) => {
                return new RentItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.durationOfPrice, itemData.availabilityScalar,
                itemData.availabilityDuration, itemData.photo, itemData.posterId, itemData.arrayOfFavoritesList, itemData.posterName);
            });
        });
    }
    async searchItemsExceptUsersItems(searchQuery, numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, 
    availabilityDuration, minDay,minMonth, minYear, maxDay, maxMonth, maxYear, nameOfUser){
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
            },
            posterName: {
                $ne: nameOfUser
            }
        }).skip(offset).limit(numberOfItems);
        return arrayOfRentObjects.map((itemData) => {
            return new RentItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.durationOfPrice, itemData.availabilityScalar,
                itemData.availabilityDuration, itemData.photo, itemData.posterId, itemData.arrayOfFavoritesList, itemData.posterName);
        });
    }
    async filterItemsExceptUsersItems(numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth,
    minYear, maxDay, maxMonth, maxYear, sectionNo, wantToGive, sortBy, courseName, nameOfUser){
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
                },
                posterName: {
                    $ne: nameOfUser
                }
            }).sort({price: -1}).skip(offset).limit(numberOfItems);
            return arrayOfRentObjects.map((itemData) => {
                return new RentItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.durationOfPrice, itemData.availabilityScalar,
                    itemData.availabilityDuration, itemData.photo, itemData.posterId, itemData.arrayOfFavoritesList, itemData.posterName);
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
                },
                posterName: {
                    $ne: nameOfUser
                }
            }).sort({price: 1}).skip(offset).limit(numberOfItems);
            return arrayOfRentObjects.map((itemData) => {
                return new RentItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.durationOfPrice, itemData.availabilityScalar,
                    itemData.availabilityDuration, itemData.photo, itemData.posterId, itemData.arrayOfFavoritesList, itemData.posterName);
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
                },
                posterName: {
                    $ne: nameOfUser
                }
            }).skip(offset).limit(numberOfItems);
            return arrayOfRentObjects.map((itemData) => {
                return new RentItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.durationOfPrice, itemData.availabilityScalar,
                    itemData.availabilityDuration, itemData.photo, itemData.posterId, itemData.arrayOfFavoritesList, itemData.posterName);
            });
        }
    }
    async getItemCount(nameOfUser){
        const rentItemDb = RentItemDB;
        let itemCount = await rentItemDb.countDocuments({posterName: {$ne: nameOfUser}}, (err, count) => {
            return count;
        });
        return itemCount;

    }
    async getCountOfItemsByFilter(minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth, minYear, 
        maxDay, maxMonth, maxYear, sectionNo, wantToGive, courseName, nameOfUser){
            const rentItemDb = RentItemDB;
            let itemCount = await rentItemDb.countDocuments({durationOfPrice: durationOfPrice,
                availabilityDuration: availabilityDuration,
                price: {
                    $gte: minPrice,
                    $lte: maxPrice
                },
                availabilityScalar: {
                    $gte: minAvailabilityScalar,
                    $lte: maxAvailabilityScalar
                },
                posterName: {
                    $ne: nameOfUser
                }
            }, (err, count) => {
                return count;
            });
            return itemCount;
    }

    async getItemWithItemId(itemId){
        const rentItemDb = RentItemDB;
        let itemData = await rentItemDb.findOne({itemId: itemId});
        if(itemData == null || itemData == undefined){
            return null;
        }
        else{
            return new RentItem(itemData.name, itemData.definition, itemData.itemId, itemData.price, itemData.durationOfPrice, itemData.availabilityScalar,
                itemData.availabilityDuration, itemData.photo, itemData.posterId, itemData.arrayOfFavoritesList, itemData.posterName);
        }
    }

}

module.exports = RentItemController;
