const express = require("express");
const mongoose = require("mongoose");
const sharp = require('sharp');
//const UserDB = require("./userDb");
const UserController = require("./controller_classes/UserController");
const SellerController = require("./controller_classes/SellerController");
const multer = require("multer");
//const itemDB = require("./itemDb.js");


let userId = 0; // every user has a user id assigned by the system, this is incremented in every user
const app = express();
const dbUrl = "mongodb+srv://hakanmuluk:test123@cluster0.tfrbmet.mongodb.net/?retryWrites=true&w=majority"; //enter the link of mongo db cluster;
/* 
In order to test it, first the url should be entered above.
In postman select post request, the link is http://localhost:3000/addUser,
in the body section, choose raw and after that, change text to JSON.
the body should be in the following format:
{
    "nameOfUser": "abc",
    "emailOfUser": "abc",
    "studentIdOfUser": 1,
    "passwordOfUser": "abc"
}
*/
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(dbUrl, options)
    .then((result) => {
        app.listen(3000);
        console.log("connected"); // this appears at the console when the connection to database is done
    })
    .catch((err) => {
        console.log(err);
    });


app.post("/addUser", (req, res) => {
    const {nameOfUser, emailOfUser, studentIdOfUser, passwordOfUser} = req.body;
    let userController = new UserController();
    userController.addUser(nameOfUser, emailOfUser, studentIdOfUser, userId, passwordOfUser)
    .then(async (result) => {
        if(result !== null){
            userId++;
            let sellerController = new SellerController();
            let sellerAdded = await sellerController.addSeller(result.toString());
            if(sellerAdded){
                console.log("User has been saved to database");
                res.cookie("userId", result.toString());
                res.send("User has been saved to database");
            }
            else{
                console.log("Seller object couldnt be added");
                res.send("Seller object couldnt be added");
            }

        }
        else{
            console.log("Provided email or student id already exists");
            res.send("Provided email or student id already exists");
        }
    })
});


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/postItem', upload.fields([{ name: 'image', maxCount: 1 }]), async (req, res) => {
    //console.log(req.files["priceOfItem"][0]);
    console.log(req.body);
    const {userObjectId, nameOfItem, definitionOfItem, priceOfItem} = req.body;

    
    let sellerController = new SellerController();
    let sellerObjectId = await sellerController.getSellerObjectId(userObjectId);
    console.log(sellerObjectId);
    //let photo = sharp(req.file.buffer).withMetadata.toBuffer();
    let photo = (await sharp(req.files["image"][0].buffer).withMetadata().toBuffer()).toString("base64");
    let posted = await sellerController.postItem(nameOfItem, definitionOfItem, priceOfItem, sellerObjectId, photo);
    if(posted){
        console.log("Item posted");
        res.send("Item posted");
    }
    else{
        console.log("Item could not be posted");
        res.send("Item could not be posted");
    }

});

/* app.get('/retrieve/:id', async (req, res) => {
    try {
        let itemDb = itemDB;
      const image = await itemDb.findById(req.params.id);
        console.log(req.params.id);
      if (!image) {
        return res.status(404).send('Image not found');
      }
  
      // Convert base64 back to buffer
      const buffer = Buffer.from(image.photo, 'base64');
  
      // Send the buffer to the frontend with width and height
      res.set({ 'Content-Type': 'image/jpeg', 'Content-Length': buffer.length });
      res.status(200).send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }); */

/* app.get("/search", async (req, res) => {
    const {query} = req.body;
    const itemDb = itemDB;
    let x = await itemDb.fuzzySearch(query).sort({score: -1});
    console.log(x);
}) */