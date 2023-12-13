const Item = require("./Item");

class CourseItem extends Item{
    //name of the parent class is for the course name, for example: CS319
    #sectionNo; 
    #posterId;
    #wantToGive; // true if the course is wanted to be given, false if it is wanted to be taken
    #arrayOfFavoritesListCustomerIds;
    constructor(name, definition, itemId, sectionNo, posterId, wantToGive, arrayOfFavoritesListCustomerIds, posterName){
        super(name, definition, itemId, posterName);
        this.#sectionNo = sectionNo;
        this.#posterId = posterId;
        this.#wantToGive = wantToGive;
        this.#arrayOfFavoritesListCustomerIds = arrayOfFavoritesListCustomerIds;
    }
    get sectionNo() {
        return this.#sectionNo;
    }

    set sectionNo(newSectionNo) {
        this.#sectionNo = newSectionNo;
    }

    get posterId() {
        return this.#posterId;
    }

    set posterId(newId) {
        this.posterId = newId;
    }

    get wantToGive() {
        return this.#wantToGive;
    }

    set wantToGive(newWantToGive) {
        this.#wantToGive = newWantToGive;
    }
    set arrayOfFavoritesListCustomerIds(newArray){
        this.#arrayOfFavoritesListCustomerIds = newArray;
    }

    get arrayOfFavoritesListCustomerIds(){
        return this.#arrayOfFavoritesListCustomerIds;
    }
    toJSON(arrayOfIds) {
        return {
            name: this.name,
            definition: this.definition,
            itemId: this.itemId,
            sectionNo: this.sectionNo,
            posterId: this.posterId,
            wantToGive: this.wantToGive,
            arrayOfFavoritesListCustomerIds: this.arrayOfFavoritesListCustomerIds,
            posterName: this.posterName,
            isInFavorites: arrayOfIds.includes(this.itemId)
        };
    }
}

module.exports = CourseItem;