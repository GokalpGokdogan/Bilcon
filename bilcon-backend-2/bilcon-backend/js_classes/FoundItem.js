const Item = require("./Item");
class FoundItem extends Item{
    #photo;
    #place;
    #date;
    #posterId;
    //#arrayOfFavoritesListCustomerIds;
    constructor(name, definition, itemId, photo, place, dayOfFind, monthOfFind, yearOfFind, posterId){
        super(name, definition, itemId);
        this.#photo = photo;
        this.#place = place;
        this.#date = new Date();
        this.#date.setHours(0, 0, 0, 0);
        this.#date.setFullYear(yearOfFind, monthOfFind, dayOfFind);
        this.#posterId = posterId;
    }

    get photo(){
        return this.#photo;
    }
    set photo(newPhoto){
        this.#photo = newPhoto;
    }
    get place() {
        return this.#place;
      }
    
    set place(newPlace) {
        this.#place = newPlace;
    }

    

    get date() {
        return this.#date;
    }

    set date(newDate) {
        this.#date = newDate; 
    }

    get posterId(){
        return this.#posterId;
    }
    set posterId(newPosterId){
        this.#posterId = newPosterId;
    }

/*     set arrayOfFavoritesListCustomerIds(newArray){
        this.#arrayOfFavoritesListCustomerIds = newArray;
    }

    get arrayOfFavoritesListCustomerIds(){
        return this.#arrayOfFavoritesListCustomerIds;
    } */

    toJSON(posterName) {
        const formattedDate = {
            dayOfFind: this.#date.getDate(),
            monthOfFind: this.#date.getMonth(),
            yearOfFind: this.#date.getFullYear()
        };

        return {
            name: this.name,
            definition: this.definition,
            itemId: this.itemId,
            photo: this.photo,
            place: this.place,
            dayOfFind: formattedDate.dayOfFind,
            monthOfFind: formattedDate.monthOfFind,
            yearOfFind: formattedDate.yearOfFind,
            posterId: this.posterId,
            posterName: posterName
        };
    }

}

module.exports = FoundItem;