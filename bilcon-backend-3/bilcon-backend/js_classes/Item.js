class Item{
    #name;
    #definition;
    #itemId;
    #posterName;
/*     #price;
    #sellerId;
    #photo; // in base64 format-string */

/*     constructor(name, definition, price, sellerId, photo){
        this.#name = name;
        this.#definition = definition;
        this.#price = price;
        this.#sellerId = sellerId;
        this.#photo = photo;
    } */
    constructor(name, definition, itemId, posterName){
        this.#name = name;
        this.#definition = definition;
        this.#itemId = itemId;
        this.#posterName = posterName;
    }
    set name(itemName){
        this.#name = itemName;
    }
    set definition(itemDefinition){
        this.#definition = itemDefinition;
    }
    set itemId(itemId){
        this.#itemId = itemId;
    }
    set posterName(posterName){
        this.#posterName = posterName;
    }
/*     set price(itemPrice){
        this.#price = itemPrice;
    }
    set sellerId(itemSellerId){
        this.#sellerId = itemSellerId;
    }
    set photo(itemPhoto){
        this.#photo = itemPhoto;
    } */

    get name(){
        return this.#name;
    }
    get definition(){
        return this.#definition;
    }
    get itemId(){
        return this.#itemId;
    }
    get posterName(){
        return this.#posterName;
    }
/*     get price(){
        return this.#price;
    }
    get sellerId(){
        return this.#sellerId;
    }
    get photo(){
        return this.#photo;
    } */
}
module.exports = Item;