const Item = require("./Item")
class SaleItem extends Item{
    #price;
    #posterId;
    #photo;
    #arrayOfFavoritesListCustomerIds; // the customer object ids who has added the saleitem into favorites list
    constructor(name, definition, itemId, price, posterId, photo, arrayOfFavoritesListCustomerIds){
        super(name, definition, itemId);
        this.#price = price;
        this.#posterId = posterId;
        this.#photo = photo;
        this.#arrayOfFavoritesListCustomerIds = arrayOfFavoritesListCustomerIds;
    }
    set price(itemPrice){
        this.#price = itemPrice;
    }
    set posterId(itemPosterId){
        this.#posterId = itemPosterId;
    }
    set photo(itemPhoto){
        this.#photo = itemPhoto;
    }
    set arrayOfFavoritesListCustomerIds(newArray){
        this.#arrayOfFavoritesListCustomerIds = newArray;
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
    get arrayOfFavoritesListCustomerIds(){
        return this.#arrayOfFavoritesListCustomerIds;
    }
    toJSON(posterName){
        return {
            name: this.name,
            definition: this.definition,
            itemId: this.itemId,
            price: this.price,
            posterId: this.posterId,
            photo: this.photo,
            arrayOfFavoritesListCustomerIds: this.arrayOfFavoritesListCustomerIds,
            posterName: posterName
        }
    }
}

module.exports = SaleItem;