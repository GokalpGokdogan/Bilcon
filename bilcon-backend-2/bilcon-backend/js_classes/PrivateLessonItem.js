const Item = require("./Item");

class PrivateLessonItem extends Item{
    #photo;
    #price; // per hour
    #posterId;
    #arrayOfFavoritesListCustomerIds;
    constructor(name, definition, itemId, photo, price, posterId, arrayOfFavoritesListCustomerIds){
        super(name, definition, itemId);
        this.#photo = photo;
        this.#price = price;
        this.#posterId = posterId;
        this.#arrayOfFavoritesListCustomerIds = arrayOfFavoritesListCustomerIds;
    }
    set price(itemPrice){
        this.#price = itemPrice;
    }
    set posterId(posterId){
        this.#posterId = posterId;
    }
    set photo(itemPhoto){
        this.#photo = itemPhoto;
    }
    get price(){
        return this.#price;
    }
    get posterId(){
        return this.#posterId;
    }
    get photo(){
        return this.#photo;
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
            photo: this.photo,
            price: this.price,
            posterId: this.posterId,
            arrayOfFavoritesListCustomerIds: this.arrayOfFavoritesListCustomerIds,
            posterName: posterName
        };
    }
}

module.exports = PrivateLessonItem;