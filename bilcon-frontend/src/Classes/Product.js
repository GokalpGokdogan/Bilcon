class Product{

    
    constructor(name="Nameless", price=-1, seller="@Gokalp", photo='https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg', productId="") {
        this.name = name
        this.price = price
        this.seller = seller
        this.photo = photo
        this.productId = productId
    }

}
module.exports = Product;