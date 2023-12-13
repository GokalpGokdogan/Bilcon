class Customer{
    #userObjectId;
    #arrayOfTransactionIds; // the ids of transaction objects which the customer is this
    #arrayOfSaleItemFavoritesList;
    #arrayOfRentItemFavoritesList;
    #arrayOfPrivateLessonItemFavoritesList;
    #arrayOfCourseItemFavoritesList;

    constructor(userObjectId,  arrayOfTransactionIds, arrayOfSaleItemFavoritesList, arrayOfRentItemFavoritesList, arrayOfPrivateLessonItemFavoritesList, arrayOfCourseItemFavoritesList){
        this.#userObjectId = userObjectId;
        this.#arrayOfTransactionIds = arrayOfTransactionIds;
        this.#arrayOfSaleItemFavoritesList = arrayOfSaleItemFavoritesList;
        this.#arrayOfRentItemFavoritesList = arrayOfRentItemFavoritesList;
        this.#arrayOfPrivateLessonItemFavoritesList = arrayOfPrivateLessonItemFavoritesList;
        this.#arrayOfCourseItemFavoritesList = arrayOfCourseItemFavoritesList;
    }
    get userObjectId() {
        return this.#userObjectId;
    }

    set userObjectId(newUserId) {
        this.#userObjectId = newUserId;
    }

    get arrayOfSaleItemFavoritesList() {
        return this.#arrayOfSaleItemFavoritesList;
    }

    set arrayOfSaleItemFavoritesList(newArray) {
        this.#arrayOfSaleItemFavoritesList = newArray;
    }
    get arrayOfRentItemFavoritesList() {
        return this.#arrayOfRentItemFavoritesList;
    }

    set arrayOfPrivateLessonItemFavoritesList(newArray) {
        this.#arrayOfPrivateLessonItemFavoritesList = newArray;
    }
    get arrayOfPrivateLessonItemFavoritesList() {
        return this.#arrayOfPrivateLessonItemFavoritesList;
    }

    set arrayOfCourseItemFavoritesList(newArray) {
        this.#arrayOfCourseItemFavoritesList = newArray;
    }
    get arrayOfCourseItemFavoritesList() {
        return this.#arrayOfCourseItemFavoritesList;
    }

    set arrayOfRentItemFavoritesList(newArray) {
        this.#arrayOfRentItemFavoritesList = newArray;
    }

    get arrayOfTransactionIds() {
        return this.#arrayOfTransactionIds;
    }

    set arrayOfTransactionIds(newArray) {
        this.#arrayOfTransactionIds = newArray;
    }

}
module.exports = Customer;