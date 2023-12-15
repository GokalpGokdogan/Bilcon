const Item = require("./Item");
class Transaction{
    #itemId;
    #itemName;
    #posterId;    
    #customerId;
    #isPostersTrans;
    #isEnded;
    #ratingGivenByCust;
    #ratingGivenByPoster;


    constructor(itemId, itemName, posterId, customerId, isPostersTrans, isEnded, ratingGivenByCust, ratingGivenByPoster){
        this.#itemId = itemId;
        this.#itemName = itemName;
        this.#posterId = posterId;        
        this.#customerId = customerId;
        this.#isPostersTrans = isPostersTrans;
        this.#isEnded = isEnded;
        this.#ratingGivenByCust = ratingGivenByCust;
        this.#ratingGivenByPoster = ratingGivenByPoster;            
    }

  // Getter and setter for #itemId
    get itemId() {
        return this.#itemId;
    }

    set itemId(value) {
        this.#itemId = value;
    }

  // Getter and setter for #itemName
    get itemName() {
        return this.#itemName;
    }

    set itemName(value) {
        this.#itemName = value;
    }

  // Getter and setter for #posterId
    get posterId() {
        return this.#posterId;
    }

    set posterId(value) {
        this.#posterId = value;
    }

  // Getter and setter for #customerId
    get customerId() {
        return this.#customerId;
    }

    set customerId(value) {
        this.#customerId = value;
    }

  // Getter and setter for #isPostersTrans
    get isPostersTrans() {
        return this.#isPostersTrans;
    }

    set isPostersTrans(value) {
        this.#isPostersTrans = value;
    }

  // Getter and setter for #isEnded
    get isEnded() {
        return this.#isEnded;
    }

    set isEnded(value) {
        this.#isEnded = value;
    }

  // Getter and setter for #ratingGivenByCust
    get ratingGivenByCust() {
        return this.#ratingGivenByCust;
   }

    set ratingGivenByCust(value) {
        this.#ratingGivenByCust = value;
    }

  // Getter and setter for #ratingGivenByPoster
    get ratingGivenByPoster() {
        return this.#ratingGivenByPoster;
    }

    set ratingGivenByPoster(value) {
        this.#ratingGivenByPoster = value;
    }
}