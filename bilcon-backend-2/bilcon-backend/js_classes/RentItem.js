const Item = require("./Item");
const durations = {
    HOUR: "hour",
    DAY: "day",
    WEEK: "week", 
    MONTH: "month",
    YEAR: "year"
};
class RentItem extends Item{
    
    #price;
    #durationOfPrice; // If the items price is 10 TL per week, price is 10 and durationOfPrice is week
    #availabilityScalar;
    #availabilityDuration; // if the item is available for 3 weeks, availabilityScalar is 3 and availiabilityDuration is week
    #photo;
    #posterId;
    #arrayOfFavoritesListCustomerIds;
    constructor(name, definition, itemId, price, durOfPrice, availabilityScalar, availabilityDur, photo, posterId, arrayOfFavoritesListCustomerIds){
        super(name, definition, itemId);
        this.#price = price;
        this.durationOfPrice = durOfPrice;
        this.#availabilityScalar = availabilityScalar;
        this.availabilityDuration = availabilityDur;
        this.#photo = photo;
        this.#posterId = posterId;
        this.#arrayOfFavoritesListCustomerIds = arrayOfFavoritesListCustomerIds;
    }
    get price() {
        return this.#price;
    }

    set price(newPrice) {
        this.#price = newPrice;
    }

    // Getter and setter for durationOfPrice
    get durationOfPrice() {
        return this.#durationOfPrice;
    }

    set durationOfPrice(newDuration) {
        if(newDuration == durations.HOUR || newDuration == durations.DAY || newDuration == durations.WEEK || newDuration == durations.MONTH || newDuration == durations.YEAR){
            this.#durationOfPrice = newDuration;
        }
        else{
            throw new Error("Duration is not valid, it should be hour, day, week, month or year");
        }
    }

    // Getter and setter for availabilityScalar
    get availabilityScalar() {
        return this.#availabilityScalar;
    }

    set availabilityScalar(newScalar) {
        this.#availabilityScalar = newScalar;
    }

    // Getter and setter for availabilityDuration
    get availabilityDuration() {
        return this.#availabilityDuration;
    }

    set availabilityDuration(newDuration) {
        if(newDuration == durations.HOUR || newDuration == durations.DAY || newDuration == durations.WEEK || newDuration == durations.MONTH || newDuration == durations.YEAR){
            this.#availabilityDuration = newDuration;
        }
        else{
            throw new Error("Duration is not valid, it should be hour, day, week, month or year");
        }   
    }
    // Getters and setters for photo
    get photo(){
        return this.#photo;
    }
    set photo(newPhoto){
        this.#photo = newPhoto;
    }

    // Getters and setters for posterId
    get posterId(){
        return this.#posterId;
    }
    set posterId(newPosterId){
        this.#posterId = newPosterId;
    }

    set arrayOfFavoritesListCustomerIds(newArray){
        this.#arrayOfFavoritesListCustomerIds = newArray;
    }

    get arrayOfFavoritesListCustomerIds(){
        return this.#arrayOfFavoritesListCustomerIds;
    }

    toJSON(posterName) {
        return {
            name: this.name,
            definition: this.definition,
            itemId: this.itemId,
            price: this.price,
            durationOfPrice: this.durationOfPrice,
            availabilityScalar: this.availabilityScalar,
            availabilityDuration: this.availabilityDuration,
            photo: this.photo,
            posterId: this.posterId,
            arrayOfFavoritesListCustomerIds: this.arrayOfFavoritesListCustomerIds,
            posterName: posterName
        };
    }
}
module.exports = RentItem;