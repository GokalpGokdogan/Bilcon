class Product{

    
    constructor(name="Nameless", price=-1, seller="@Gokalp", img='https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg', productId="", description="Required book for CS315. Especially you must buy it if 3 days left to your exam. Condition: meh") {
        this.name = name
        this.price = price
        this.seller = seller
        this.img = img
        this.productId = productId
        this.description = description
        this.negotiable = true
        this.rentDurationNumber = -1;
        this.rentDurationType = "day"
    }

}
module.exports = Product;