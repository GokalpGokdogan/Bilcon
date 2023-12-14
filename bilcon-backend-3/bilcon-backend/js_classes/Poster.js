class Poster{
    #userObjectId;
    #arrayOfSaleItemIds;
    #arrayOfRentItemIds;
    #arrayOfLostItemIds;
    #arrayOfFoundItemIds;
    #arrayOfPrivateLessonItemIds;
    #arrayOfCourseItemIds;
    #arrayOfTransactionIds; // the transactions which the poster in the transaction is this poster

    constructor(userObjectId, arrayOfSaleItemIds, arrayOfRentItemIds, arrayOfLostItemIds, arrayOfFoundItemIds, arrayOfPrivateLessonItemIds, arrayOfCourseItemIds, arrayOfTransactionIds) {
        this.userObjectId = userObjectId;
        this.arrayOfSaleItemIds = arrayOfSaleItemIds;
        this.arrayOfRentItemIds = arrayOfRentItemIds;
        this.arrayOfLostItemIds = arrayOfLostItemIds;
        this.arrayOfFoundItemIds = arrayOfFoundItemIds;
        this.arrayOfPrivateLessonItemIds = arrayOfPrivateLessonItemIds;
        this.arrayOfCourseItemIds = arrayOfCourseItemIds;
        this.arrayOfTransactionIds = arrayOfTransactionIds;
    }

    get userObjectId() {
        return this.#userObjectId;
    }

    set userObjectId(newUserObjectId) {
        this.#userObjectId = newUserObjectId;
    }

    get arrayOfSaleItemIds() {
        return this.#arrayOfSaleItemIds;
    }

    set arrayOfSaleItemIds(newArray) {
        this.#arrayOfSaleItemIds = newArray;
    }

    get arrayOfRentItemIds() {
        return this.#arrayOfRentItemIds;
    }

    set arrayOfRentItemIds(newArray) {
        this.#arrayOfRentItemIds = newArray;
    }

    get arrayOfLostItemIds() {
        return this.#arrayOfLostItemIds;
    }

    set arrayOfLostItemIds(newArray) {
        this.#arrayOfLostItemIds = newArray;
    } 

    get arrayOfFoundItemIds() {
        return this.#arrayOfFoundItemIds;
    }

    set arrayOfFoundItemIds(newArray) {
        this.#arrayOfFoundItemIds = newArray;
    }

    get arrayOfPrivateLessonItemIds() {
        return this.#arrayOfPrivateLessonItemIds;
    }

    set arrayOfPrivateLessonItemIds(newArray) {
        this.#arrayOfPrivateLessonItemIds = newArray;
    }

    get arrayOfCourseItemIds() {
        return this.#arrayOfCourseItemIds;
    }

    set arrayOfCourseItemIds(newArray) {
        this.#arrayOfCourseItemIds = newArray;
    }

    get arrayOfTransactionIds(){
        return this.#arrayOfTransactionIds;
    }
    set arrayOfTransactionIds(newArrayOfTransactionIds){
        this.#arrayOfTransactionIds = newArrayOfTransactionIds;
    }

}

module.exports = Poster;