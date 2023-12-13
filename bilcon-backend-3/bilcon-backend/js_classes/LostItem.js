const Item = require("./Item");
class LostItem extends Item{
    #place;
/*     #dayOfLose; // 1-31
    #monthOfLose; // 1-12
    #yearOfLose; // 2023 - ... */
    #date
    #posterId;

    constructor(name, definition, itemId, place, dayOfLose, monthOfLose, yearOfLose, posterId, posterName){
        super(name, definition, itemId, posterName);
        this.#place = place;
        this.#date = new Date();
        this.#date.setHours(12, 0, 0, 0);
        this.#date.setFullYear(yearOfLose, monthOfLose, dayOfLose);
        this.#posterId = posterId;
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

    toJSON(array) {
        const formattedDate = {
            day: this.#date.getDate(),
            month: this.#date.getMonth(),
            year: this.#date.getFullYear()
        };

        return {
            name: this.name,
            definition: this.definition,
            itemId: this.itemId,
            place: this.place,
            dayOfLose: formattedDate.day,
            monthOfLose: formattedDate.month,
            yearOfLose: formattedDate.year,
            posterId: this.posterId,
            posterName: this.posterName
        };
    }
}

module.exports = LostItem;