const Item = require("./Item");
class Transaction{
    #itemId;
    #itemName;
    #posterId;    
    #customerId;
    #isPostersTrans;
    #isEndedByPoster;
    #isEndedByCust;
    #ratingGivenByCust;
    #ratingGivenByPoster;


    constructor(itemId, itemName, posterId, customerId, isPostersTrans,isEndedByPoster,isEndedByCust, ratingGivenByCust, ratingGivenByPoster){
        this.#itemId = itemId;
        this.#itemName = itemName;
        this.#posterId = posterId;        
        this.#customerId = customerId;
        this.#isPostersTrans = isPostersTrans;
        this.#isEndedByPoster = isEndedByPoster;
        this.#isEndedByCust = isEndedByCust;
        this.#ratingGivenByCust = ratingGivenByCust;
        this.#ratingGivenByPoster = ratingGivenByPoster;            
    }

  // Getter and setter for #itemId
    get itemId() {
        return this.#itemId;
    }

    set itemId(itemId) {
        this.#itemId = itemId;
    }

  // Getter and setter for #itemName
    get itemName() {
        return this.#itemName;
    }

    set itemName(itemName) {
        this.#itemName = itemName;
    }

  // Getter and setter for #posterId
    get posterId() {
        return this.#posterId;
    }

    set posterId(posterId) {
        this.#posterId = posterId;
    }

  // Getter and setter for #customerId
    get customerId() {
        return this.#customerId;
    }

    set customerId(customerId) {
        this.#customerId = customerId;
    }

  // Getter and setter for #isPostersTrans
    get isPostersTrans() {
        return this.#isPostersTrans;
    }

    set isPostersTrans(isPostersTrans) {
        this.#isPostersTrans = isPostersTrans;
    }

  // Getter and setter for #isEnded
    get isEndedByCust() {
        return this.#isEndedByCust;
    }

    set isEndedByCust(isEndedByCust) {
        this.#isEndedByCust = isEndedByCust;
    }

      // Getter and setter for #isEnded
    get isEndedByPoster() {
        return this.#isEndedByPoster;
    }

    set isEndedByPoster(isEndedByPoster) {
        this.#isEndedByPoster = isEndedByPoster;
    }

  // Getter and setter for #ratingGivenByCust
    get ratingGivenByCust() {
        return this.#ratingGivenByCust;
   }

    set ratingGivenByCust(ratingGivenByCust) {
        this.#ratingGivenByCust = ratingGivenByCust;
    }

  // Getter and setter for #ratingGivenByPoster
    get ratingGivenByPoster() {
        return this.#ratingGivenByPoster;
    }

    set ratingGivenByPoster(ratingGivenByPoster) {
        this.#ratingGivenByPoster = ratingGivenByPoster;
    }
}