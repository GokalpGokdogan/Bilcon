const express = require("express");
const mongoose = require("mongoose");
const UserController = require("./controller_classes/UserController");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const sharp = require('sharp');
const PosterController = require("./controller_classes/PosterController");
const CustomerController = require("./controller_classes/CustomerController");
const archiver = require('archiver');
const { Readable } = require('stream');
const SaleItem = require("./js_classes/SaleItem");
const RentItem = require("./js_classes/RentItem");
const ChatController = require("./controller_classes/ChatController");
const MessageController = require("./controller_classes/MessageController");
const TransactionController = require("./controller_classes/TransactionController");


let itemId = 0;

const app = express();
const cors = require('cors');
const corsOptions ={
    origin: ['http://localhost:3001', 'http://localhost:3002'],
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
const dbUrl = "mongodb://localhost:27017/UserDB"; //enter the link of mongo db cluster;

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
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };
app.use(express.json());
mongoose.connect(dbUrl, options)
    .then((result) => {
        app.listen(3000);
        console.log("connected"); // this appears at the console when the connection to databse is done
    })
    .catch((err) => {
        console.log(err);
    })


app.use(cookieParser());
 
app.use(session({
    secret: "Lahmar",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 3600000,
        secure: false,
        httpOnly: true
    }
}));

app.get("/", (req,res)=>{
    //res.send("HELLO");
})

/* 
The body of the request should be in json format for example: 
{
    "name": "hakan",
    "email": "hakanmuluk33@gmail.com",
    "id": 123,
    "password": "abc1234"
}, after that you should click the email and you are verified, you can login.
*/
app.post("/register", (req,res)=>{    
    const nameOfUser = req.body.name;
    const emailOfUser = req.body.email;
    console.log(req.body.email);
    const studentIdOfUser = req.body.id;
    const passwordOfUser = req.body.password;
    let userController = new UserController();   
    userController.registerUser(nameOfUser, emailOfUser, studentIdOfUser, passwordOfUser);
    res.send("User registered, waiting for email confirm");
})

/* 
The body of the request should be in json format for example: 
{"id": 123, "password": "abc1234"}
*/
app.post("/login", async(req,res)=>{
    const studentIdOfUser = req.body.id;
    const passwordOfUser = req.body.password;
    let userController = new UserController();   
    let foundUser = await userController.loginUser(studentIdOfUser, passwordOfUser);
    
    //console.log(foundUser);
    if (foundUser) {
        req.session.foundUser = {
            name: foundUser.name,
            mail: foundUser.email,
            studentId: foundUser.studentId,
            userId: foundUser._id,
            boughtTransactions: foundUser.boughtTransactions,
            soldTransactions: foundUser.soldTransactions,
            rating: foundUser.rating
        };
        
        req.session.save();
        //console.log(req.session);        
        console.log("Login Successful");
        res.status(200).json({ redirect: "http://localhost:3001/dashboard" });
    }
    else if (foundUser === false){
        console.log("User is not activated. Please check your mail");
    }
    else {
        console.log("Invalid login credentials");
    }
    });


/* 


*/

app.get('/verify/:token/:email', (req, res)=>{ 
    const token = req.params.token; 
    const email = req.params.email;     
    
        
        // Verifying the JWT token  
    jwt.verify(token, 'ourSecretKey', function(err, decoded) { 
        if (err) {
            console.log(err); 
            res.send("Email verification failed,possibly the link is invalid or expired").redirect("/register");
         
        } 
        else { 
            let userController = new UserController();               
            userController.activateUser(email);
            res.redirect("login"); 
        } 
    }); 
    
}); 

app.get("/accountPage", async (req,res)=>{
    const user = req.session.foundUser;
    if (user && Object.keys(user).length > 0) {
        // User is authenticated

        let userController = new UserController();   
        let updatedUser = await userController.accessUserWithId(user.studentId);

        // Update the session information
        req.session.foundUser = {
            name: updatedUser.name,
            mail: updatedUser.email,
            studentId: updatedUser.studentId,
            userId: updatedUser._id,
            boughtTransactions: updatedUser.boughtTransactions,
            soldTransactions: updatedUser.soldTransactions,
            rating: updatedUser.rating
        };
        // Save the updated session
        req.session.save();
        const sentUser = req.session.foundUser;
        res.send(sentUser);

    } else {
        // User is not authenticated
        //console.log("Unauthorized. Session foundUser:", req.session.foundUser);
        res.status(401).redirect("/login");
    }
});
app.get("/newPassword/:token", (req,res)=>{
    
});
app.patch("/newPassword/:token", (req,res)=>{
    const user = req.session.foundUser;
    if (user && Object.keys(user).length > 0) {
        jwt.verify(req.params.token, 'ourSecretKey', function(err, decoded){
                    // User is authenticated
            
            if (err) {
                console.log(err); 
                res.send("Email verification for password change failed, possibly the link is invalid or expired").redirect("/home");
            } 
            else{
                const firstPassword = req.body.password1;
                if(firstPassword == req.body.password2){
                    let userController = new UserController();   
                    userController.changePassword(user.mail, firstPassword);
                    res.send(200);
                }
                else {
                    console.log("Passwords do not match.");
                }
            }

        });

    } else {
        // User is not authenticated
        //console.log("Unauthorized. Session foundUser:", req.session.foundUser);
        res.status(401).redirect("/login");
    }
});



app.get("/logout", (req,res)=>{
    //console.log(req.session);
    //req.session = null;
    req.session.destroy();    
    res.send("You are logged out.");
});

app.get("/changePassword", (req,res)=>{
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let userController = new UserController();               
        userController.sendMailForPassword(user.mail, user.name);  
        
    }else {
        // User is not authenticated
        //console.log("Unauthorized. Session foundUser:", req.session.foundUser);
        res.status(401).redirect("/login");      
    }
 
});

app.post("/forgotPassword", async(req,res)=>{
    const studentIdOfUser = req.body.id;
    let userController = new UserController();   
    let foundUser = await userController.accessUserWithId(studentIdOfUser);

    if (foundUser) {
        let foundUserName = foundUser.name;
        let foundUserEmail = foundUser.email;
        userController.sendMailForForgotPassword(foundUserEmail, foundUserName, studentIdOfUser);  
        console.log("Email sent to reset password");
    }
    else {
        console.log("Invalid login credentials");
    }
});

app.get("/resetPassword/:token/:id", (req,res)=>{
    
});
app.patch("/resetPassword/:token/:id", async (req,res)=>{
    const studentIdOfUser = req.params.id;
    let userController = new UserController();   
    let foundUser = await userController.accessUserWithId(studentIdOfUser);

    if (foundUser) {
        jwt.verify(req.params.token, 'ourSecretKey', function(err, decoded){
            // User is authenticated
            
            if (err) {
                console.log(err); 
                res.send("Email verification for password reset failed, possibly the link is invalid or expired").redirect("/home");
            } 
            else{
                const firstPassword = req.body.password1;
                if(firstPassword == req.body.password2){
                    let userController = new UserController();   
                    userController.changePassword(foundUser.email, firstPassword);
                    res.send(200);
                }
                else {
                    console.log("Passwords do not match.");
                }
            }

        });

    } else {
        // User is not authenticated
        //console.log("Unauthorized. Session foundUser:", req.session.foundUser);
        res.status(401).redirect("/login");
    }
});

app.post("/submitTransaction/:ratedUserStudentId/:itemName/:isBought", async(req,res)=>{
    const user = req.session.foundUser;
    if (user && Object.keys(user).length > 0) {
        let transactionController = new TransactionController();   
        transactionController.addTransactionToUser(user.studentId, req.params.ratedUserStudentId, req.params.itemName, req.params.isBought);
        await transactionController.updateRating(req.params.ratedUserStudentId, req.body.newRating);

    } else {
        // User is not authenticated
        res.status(401).redirect("/login");
    }
});


app.post("/requestContact/:requestedUserStudentId/:itemName", async(req,res)=>{
    const user = req.session.foundUser;
    if (user && Object.keys(user).length > 0) {
        let userController = new UserController();
        let requestedUser = await userController.accessUserWithId(req.params.requestedUserStudentId);   
        userController.sendMailForRequest(requestedUser.email, requestedUser.name, user.mail, user.name, user.studentId, req.params.itemName);
        
    } else {
        // User is not authenticated
        res.status(401).redirect("/login");
    }
});


app.get('/dashboard', (req, res) => {
    const user = req.session.foundUser;
    if (user && Object.keys(user).length > 0) {
        // User is authenticated
        const user = req.session.foundUser;
        res.send(`Welcome to the dashboard, ${user.mail} with student ID ${user.studentId}`);
    } else {
        // User is not authenticated
        //console.log("Unauthorized. Session foundUser:", req.session.foundUser);
        res.status(401).redirect("/login");
       
    }
});
app.get("/login", (req,res)=>{
    // res.send("Hello, log in");
    res.json({ redirect: "http://localhost:3001" });
})


/* 
Item types can be: "sale", "rent", "lost", "found", "lesson", "course".

durationOfPrice, availabilityScalar, availabilityDuration are for rent items, durOfprice is for specifying the duration of price. For example, an item's price
can be 5TL per week so the price is 5 and durOfPrice is "week". The item can be rentable for 2 months then, availabilityScalar is 2 and availabilityDuration
is "month". Here are the possible values for durOfPrice and availabilityDuration: "hour", "day", "week", "month", "year".

place, day, month and year are for lost and found items(day, month and year are integers).

sectionNo and wantToGive are for course items, sectionNo is an integer. wantToGive is a boolean if it is true, the poster wants to give this course, if it is false,
poster wants to take this course.

You can look at the items db classes to see what is stored in db for each item.

The request should be in form-data format, key-value pairs are as following:
photo -> a jpeg file
the others are: name, definition, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, wantToGive, itemType
*/


app.post("/postItem", upload.fields([{ name: 'image', maxCount: 1 }]), async (req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let {name, definition, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, wantToGive, itemType} = req.body;
        let photo;
        if(!req.files["image"][0]){
            photo = " ";
        }
        else{
            photo = (await sharp(req.files["image"][0].buffer).withMetadata().jpeg({quality: 20}).toBuffer()).toString("base64");
        }
        let userController = new UserController();
        let posterId = await userController.getPosterIdByUserId(req.session.foundUser.userId);
        let posterName = await userController.getNameByUserId(req.session.foundUser.userId);
        console.log(itemType);
        let posterController = new PosterController(itemType, posterId);
        let isPosted = await posterController.postItem(name, definition, itemId, price, durationOfPrice, availabilityScalar,
            availabilityDuration, place, day, month, year, sectionNo, wantToGive, photo, posterName);
        if(isPosted){
            res.status(200).send("Item is posted!");
            itemId++;
        }
        else{
            res.status("404").send("An error occured while posting the item");
        }


    }
    else{
        res.redirect("/login");
    }
})






/* 
In getItems, searchItems and filterItems, getItemsInFavoritesList and getItemsOfPoster; an array of related item objects are returned, to see
the contents of the objects, you can look at the toJSON functions which are in the item classes. Also,
some objects have photos and these photos are returned as base64 string format(in the response), you should
convert them back to jpeg

In all items in the response array except lost and found, there is a field in the object called isInFavorites, it is for declaring if the item
is in the favorites list of the customer.(Lost and found items cannot be added to favorites list, so there is no field for that)

*/

/* 
When a customer first opens the page, there should be some items and for that, this can be used. The req body is in JSON format:
{
    "numberOfItems": 5,
    "offset": 0,
    "itemType": "rent"
} numberOfItems indicate how many items will be returned. Offset is for passing some number of items(for example, if the user want to see the second page, the 
    offset should be used in order to pass the items in the first page)
    Possible item types: "sale", "rent", "lost", "found", "lesson", "course"
*/

app.post("/getItems", async (req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let {numberOfItems, offset, itemType} = req.body;
        let userController = new UserController();
        let customerId = await userController.getCustomerIdByUserId(req.session.foundUser.userId);
        let customerController = new CustomerController(itemType, customerId);
        let arrayOfFavListItemIds = await customerController.getFavoritesListItemIds();

        let arrayOfItems = await customerController.getItems(numberOfItems, offset);
        let serializedArray = arrayOfItems.map((item) => {
            return item.toJSON(arrayOfFavListItemIds);
        });

        let jsonString = JSON.stringify(serializedArray);
        res.status(200).send(jsonString);
    }
    else{
        res.redirect("/login");
    }
})




/* 
This is for searching items, also filtering. The req body is JSON:
{"numberOfItems": 2, 
"offset": 0, 
"itemType": "lesson", 
"minPrice": 0, 
"maxPrice": 10000, 
"minDay": 1, 
"minMonth": 1, 
"minYear": 1, 
"maxDay": 25, 
"maxMonth": 12, 
"maxYear": 2023, 
"durationOfPrice": "week", 
"minAvailabilityScalar": 0, 
"maxAvailabilityScalar": 100, 
"availabilityDuration": "month", 
"searchQuery": "bookss"}

Possible item types: "sale", "rent", "lost", "found", "lesson"; course names are section names so search does not have a meaning for course items, use filter instead
Some values are used for particular item types, as can be seen from below.
*/

app.get("/searchItems", async (req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let userController = new UserController();
        let customerId = await userController.getCustomerIdByUserId(req.session.foundUser.userId);
        let {numberOfItems, offset, itemType, minPrice, maxPrice, minDay, minMonth, minYear, maxDay, maxMonth, maxYear, durationOfPrice
            , minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, searchQuery} = req.body;

        let customerController = new CustomerController(itemType, customerId);
        let arrayOfFavListItemIds = await customerController.getFavoritesListItemIds();
        let arrayOfItems = await customerController.searchItem(searchQuery, numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar,
            maxAvailabilityScalar, availabilityDuration, minDay, minMonth, minYear, maxDay, maxMonth, maxYear);
        let serializedArray = arrayOfItems.map((item) => {
            return item.toJSON(arrayOfFavListItemIds);
        });
        res.status(200).send(JSON.stringify(serializedArray));
    }
    else{
        res.redirect("login");
    }
})



/* 
It is very similar to search, but only for filtering. So the items can also be sorted according to its price or date of creation-lost-found.
Again the req body is in JSON format:
{"numberOfItems": 2, 
"offset": 0, 
"itemType": "course", 
"minPrice": 0, 
"maxPrice": 10000, 
"minDay": 1, 
"minMonth": 1, 
"minYear": 1, 
"maxDay": 25, 
"maxMonth": 12, 
"maxYear": 2023, 
"durationOfPrice": "week", 
"minAvailabilityScalar": 0, 
"maxAvailabilityScalar": 100, 
"availabilityDuration": "month", 
"courseName": "bookss",
"sectionNo": 2,
"wantToGive": true,
"sortBy": 1}
Possible item types: "sale", "rent", "lost", "found", "lesson", "course"
possible sortBy: 1, -1 or 0. 1 is for ascending, -1 is for descending and 0 is for no sort.
Sale, Rent and private lesson items are sorted by price, lost and found items are sorted by date of find-lose, course items are sorted by creation date of post.

*/

app.get("/filterItems", async (req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let userController = new UserController();
        let customerId = await userController.getCustomerIdByUserId(req.session.foundUser.userId);
        let {numberOfItems, offset, itemType, minPrice, maxPrice, minDay, minMonth, minYear, maxDay, maxMonth, maxYear, durationOfPrice
            , minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, courseName, sectionNo, wantToGive, sortBy} = req.body;

        let customerController = new CustomerController(itemType, customerId);
        let arrayOfFavListItemIds = await customerController.getFavoritesListItemIds();
        console.log(arrayOfFavListItemIds)
        let arrayOfItems = await customerController.filterItems(numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar,
            availabilityDuration, minDay, minMonth, minYear, maxDay, maxMonth, maxYear, sectionNo, wantToGive, sortBy, courseName);
        let serializedArray = arrayOfItems.map((item) => {
            return item.toJSON(arrayOfFavListItemIds);
        });
        res.status(200).send(JSON.stringify(serializedArray));
    }
    else{
        res.redirect("login");
    }
})

/* 
This method is for returning the items that are in the favorites list of the user(the user with the session, cannot get other user's favorites list)
Example json:
{
    "numberOfItems" : 2,
    "offset": 0, 
    "itemType": "lesson"
}
Possible item types: "sale", "rent", "lesson", "course" since lost and found items cannot be added to favorites list
*/
app.get("/getItemsInFavoritesList", async (req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let userController = new UserController();
        let customerId = await userController.getCustomerIdByUserId(req.session.foundUser.userId);
        let {numberOfItems, offset, itemType} = req.body;
        let customerController = new CustomerController(itemType, customerId);
        let arrayOfFavListItemIds = await customerController.getFavoritesListItemIds();
        let arrayOfItems = await customerController.getItemsInFavoritesList(offset, numberOfItems);
        let serializedArray = arrayOfItems.map((item) => {
            return item.toJSON(arrayOfFavListItemIds);
        });
        res.status(200).send(JSON.stringify(serializedArray));
    }
    else{
        res.redirect("login");
    }
})

/* 
This method is for getting the items posted by a specific user, I did not include a feature for searching users but when a customer is looking at the items,
the customer can look at the poster's profile and specifically, posted items, this is the goal of this method.

Example JSON:
{
"nameOfPoster": "hakan",
"itemType": "course",
"numberOfItems": 2,
"offset": 1
}
Possible item types: "sale", "rent", "lost", "found", "lesson", "course"
*/
app.get("/getItemsOfPoster", async (req, res) => { // when a user clicks to another user's profile, the items posted by the user will appear-item type must be specified in the req
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let {nameOfPoster, itemType, numberOfItems, offset} = req.body;
        let userController = new UserController();
        
        let posterIdOfPoster = await userController.getPosterIdByName(nameOfPoster);
        
        let posterController = new PosterController(itemType, posterIdOfPoster);
        let customerId = await userController.getCustomerIdByUserId(req.session.foundUser.userId);
        let customerController = new CustomerController(itemType, customerId);
        let arrayOfFavListItemIds = await customerController.getFavoritesListItemIds();
        
        let arrayOfItems = await posterController.getItems(offset, numberOfItems);
        let serializedArray = arrayOfItems.map((item) => {
            return item.toJSON(arrayOfFavListItemIds);
        });
        res.status(200).send(JSON.stringify(serializedArray));
    }
    else{
        return res.redirect("login");
    }
})
/* 
This method is for editting the existing items.
Important note: Item name cannot be changed except course items due to fuzzy-search algorithm.

Example JSON: {
"courseName": "kitap", 
"definition": "boook", 
"price": 300, 
"durationOfPrice": "week", 
"availabilityScalar": 2, 
"availabilityDuration": "month", 
"place": "school", 
"day": 3, 
"month": 5, 
"year": 2023, 
"sectionNo": 1, 
"wantToGive": false, 
"photo": "empty", 
"itemId": 16, 
"itemType": "course"
}

Possible item types: "sale", "rent", "lost", "found", "lesson", "course"
*/
app.post("/editPostedItem", async (req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let {courseName, definition, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, wantToGive, photo, itemId, itemType} = req.body; // cannot edit itemId, it is for finding the related tiem
        let userController = new UserController();
        let posterIdOfPoster = await userController.getPosterIdByUserId(req.session.foundUser.userId);
       
        let posterController = new PosterController(itemType, posterIdOfPoster);
        let editted = await posterController.editItem(courseName, definition, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, wantToGive, photo, itemId);
        if(editted){
            res.status(200).send("Item has been editted");
        }
        else{
            res.status(404).send("An error occured");
        }
    }
    else{
        res.redirect("login");
    }
})

/* 
This method is for deleting a post, when the post is deleted, the method removes the item from customers' favorites list.

Example JSON:
{
"itemId": 1,
"itemType": "course"
}

Possible item types: "sale", "rent", "lost", "found", "lesson", "course"
*/
app.delete("/deleteItem", async (req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let {itemId, itemType} = req.body;
        
        let userController = new UserController();
        let posterIdOfPoster = await userController.getPosterIdByUserId(req.session.foundUser.userId);
        let posterController = new PosterController(itemType, posterIdOfPoster);
        let itemObjectId = await posterController.getItemObjectId(itemId);
        let arrayOfCustomerIds = await posterController.deleteItem(itemId);
        if(arrayOfCustomerIds.length == 0){
            res.status(200).send("Item Deleted");
        }
        else{
            if(itemType != "lost" && itemType != "found"){
                let customerControllers = arrayOfCustomerIds.map((customerId) => {
                    return new CustomerController(itemType, customerId);
                });
                let removePromises = customerControllers.map((controller) => {
                    return controller.removeItemIdFromOnlyCustomersFavoritesList(itemObjectId);
                });
                Promise.all(removePromises).then((result) => {
                    res.status(200).send("Item Deleted");
                }).catch((err) => {
                    console.log(err);
                    res.status(404).send("An error occured");
                })
            }
            else{
                res.status(200).send("Item Deleted");
            }

        }
    }
    else{
        res.redirect("login");
    }
})

/* 
This method is for adding an item to favorites list.

Example JSON:
{
    "itemId": 1,
    "itemType": "course"
}
Possible item types: "sale", "rent", "lesson", "course" since lost and found items cannot be added to favorites list
*/
app.post("/addItemToFavoritesList", async (req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let {itemId, itemType} = req.body;
        let userController = new UserController();
        let customerId = await userController.getCustomerIdByUserId(req.session.foundUser.userId);
        let customerController = new CustomerController(itemType, customerId);
        let isAdded = await customerController.addItemToFavoritesList(itemId);
        if(isAdded){
            res.status(200).send("Item has been added to favorites list");
        }
        else{
            res.status(404).send("An error occured");
        }


    }
    else{
        res.redirect("login");
    }
})


/* 
This method is for removing an item from favorites list.

Example JSON:
{
    "itemId": 0,
    "itemType": "course"
}
Possible item types: "sale", "rent", "lesson", "course" since lost and found items cannot be added to favorites list
*/
app.post("/removeItemFromFavoritesList", async (req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let {itemId, itemType} = req.body;
        let userController = new UserController();
        let customerId = await userController.getCustomerIdByUserId(req.session.foundUser.userId);
        let customerController = new CustomerController(itemType, customerId);
        let isRemoved = await customerController.removeItemFromFavoritesList(itemId);
        if(isRemoved){
            res.status(200).send("Item has been removed from favorites list");
        }
        else{
            res.status(404).send("An error occured");
        }

    }

    else{
        res.redirect("login");
    }
})



app.post("/createChat", (req, res) => {
   
    const {firstId, secondId} = req.body;

    let chatController = new ChatController();

    chatController.createChat(firstId, secondId)
        .then((result) =>{
            if(result){
                res.status(200).json(result);
            }
            else{
                res.status(500);
            }
        })


});


/*

    Returns all chats of a user.
    The user id of the given user is given as a PARAMETER in the request endpoint.

*/
 

app.get("/findUserChats/:userId", (req, res) => {

        const userId = req.params.userId;

        let chatController = new ChatController();

        chatController.findUserChats(userId)
        .then((result) =>{

            if(result){
                res.status(200).json(result);
            }else{
                res.status(500);
            }


        });

});

/*
    Returns the specific chat between two users.
    The user id's of the two users is given as parameters within the endpoint.

    TODO:
        Make the chats not tied between two users, but also between two different items.
        That is, create different chats for different items.

*/


app.get("/find/:firstId/:secondId", (req, res) => {
    

    const {firstId, secondId} = req.params;
    let chatController = new ChatController();

    chatController.findChat(firstId, secondId)
        .then((result) => {

            if(result){
                res.status(200).json(result);
            }else{
                res.status(500);
            }
        });

});


/*

    Creates the message that the user wants to send to the other user, and ties it to the given chat.
    For this, chatId, senderId, and the content of the message should be given within the request body.

    The format of request:

    {
     "chatId" : "65737167ce518188d397f5b5",
     "senderId" : "abc123",
     "text" : "hello"
    }

*/

app.post("/createMessage", (req, res) => {

    const {chatId, senderId, text} = req.body;

    let messageController = new MessageController();

    messageController.createMessage(chatId, senderId, text)
        .then((result) => {
            if(result){     
                res.status(200).json(result);
            }else{
                res.status(500);
            }
        });


});

/*

   Returns all the messages of a given chat between two users.
   For this, the chatId must be given within the request paramaters.

*/


app.get("/getMessages/:chatId", (req, res)=>{

    const chatId = req.params.chatId;

    let messageController = new MessageController();

    messageController.getMessages(chatId)
        .then((result) =>{
            if(result){
                res.status(200).json(result);
            }else{
                res.status(500);
            }
        })

});

// req and res are the same with getItems route
app.post("/getItemsExceptUser", async (req, res) => {
    const user = req.session.foundUser;
    console.log("getPart");
    if(user && Object.keys(user).length > 0){
        let {numberOfItems, offset, itemType} = req.body;
        let userController = new UserController();
        let customerId = await userController.getCustomerIdByUserId(req.session.foundUser.userId);
        let customerController = new CustomerController(itemType, customerId);
        let arrayOfFavListItemIds = await customerController.getFavoritesListItemIds();
        let nameOfUser = await userController.getNameByUserId(req.session.foundUser.userId);
        let arrayOfItems = await customerController.getItemsExceptUsersItems(numberOfItems, offset, nameOfUser);
        let serializedArray = arrayOfItems.map((item) => {
            return item.toJSON(arrayOfFavListItemIds);
        });

        let jsonString = JSON.stringify(serializedArray);
        res.status(200).send(jsonString);
    }
    else{
        res.redirect("/login");
    }
})
// req and res are the same with searchItems route
app.post("/searchItemsExceptUser", async (req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let userController = new UserController();
        let customerId = await userController.getCustomerIdByUserId(req.session.foundUser.userId);
        let {numberOfItems, offset, itemType, minPrice, maxPrice, minDay, minMonth, minYear, maxDay, maxMonth, maxYear, durationOfPrice
            , minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, searchQuery} = req.body;
        let nameOfUser = await userController.getNameByUserId(req.session.foundUser.userId);
        let customerController = new CustomerController(itemType, customerId);
        let arrayOfFavListItemIds = await customerController.getFavoritesListItemIds();
        let arrayOfItems = await customerController.searchItemsExceptUsersItems(searchQuery, numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar,
            maxAvailabilityScalar, availabilityDuration, minDay, minMonth, minYear, maxDay, maxMonth, maxYear, nameOfUser);
        let serializedArray = arrayOfItems.map((item) => {
            return item.toJSON(arrayOfFavListItemIds);
        });
        res.status(200).send(JSON.stringify(serializedArray));
    }
    else{
        res.redirect("login");
    }
})
// req and res are the same with filterItems route
app.post("/filterItemsExceptUser", async (req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let userController = new UserController();
        let customerId = await userController.getCustomerIdByUserId(req.session.foundUser.userId);
        let {numberOfItems, offset, itemType, minPrice, maxPrice, minDay, minMonth, minYear, maxDay, maxMonth, maxYear, durationOfPrice
            , minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, courseName, sectionNo, wantToGive, sortBy} = req.body;
        let nameOfUser = await userController.getNameByUserId(req.session.foundUser.userId);
        let customerController = new CustomerController(itemType, customerId);
        let arrayOfFavListItemIds = await customerController.getFavoritesListItemIds();
        console.log(arrayOfFavListItemIds)
        let arrayOfItems = await customerController.filterItemsExceptUsersItems(numberOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar,
            availabilityDuration, minDay, minMonth, minYear, maxDay, maxMonth, maxYear, sectionNo, wantToGive, sortBy, courseName, nameOfUser);
        let serializedArray = arrayOfItems.map((item) => {
            return item.toJSON(arrayOfFavListItemIds);
        });
        res.status(200).send(JSON.stringify(serializedArray));
    }
    else{
        res.redirect("login");
    }
})

/* 
Example JSON:
{
    "offset": 0,
    "itemType": "found",
    "onlyPostedByOthers": false
}
if onlyPostedByOthers is true, this do not retrieve the items posted by the same user, if it is false, it retrieves all items in the specified type.
*/
app.post("/getAllItems", async(req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let {offset, itemType, onlyPostedByOthers} = req.body;
        let userController = new UserController();
        let customerId = await userController.getCustomerIdByUserId(req.session.foundUser.userId);
        let customerController = new CustomerController(itemType, customerId);
        if(onlyPostedByOthers){
            let nameOfUser = await userController.getNameByUserId(req.session.foundUser.userId);
            let countOfItems = await customerController.getItemCount(nameOfUser);
            let arrayOfFavListItemIds = await customerController.getFavoritesListItemIds();

            let arrayOfItems = await customerController.getItemsExceptUsersItems(countOfItems, offset, nameOfUser);
            let serializedArray = arrayOfItems.map((item) => {
                return item.toJSON(arrayOfFavListItemIds);
            });

            let jsonString = JSON.stringify(serializedArray);
            res.status(200).send(jsonString);

        }
        else{
            let nameOfUser = ".";
            let countOfItems = await customerController.getItemCount(nameOfUser);
            
            let arrayOfFavListItemIds = await customerController.getFavoritesListItemIds();

            let arrayOfItems = await customerController.getItems(countOfItems, offset);
            let serializedArray = arrayOfItems.map((item) => {
                return item.toJSON(arrayOfFavListItemIds);
            });

            let jsonString = JSON.stringify(serializedArray);
            res.status(200).send(jsonString);
        }
    }
    else{
        res.redirect("/login");
    }
})
/* 
Example JSON:
{"offset": 0, 
"itemType": "lost", 
"minPrice": 0, 
"maxPrice": 10000, 
"minDay": 6, 
"minMonth": 10, 
"minYear": 2023, 
"maxDay": 7, 
"maxMonth": 10, 
"maxYear": 2023, 
"durationOfPrice": "week", 
"minAvailabilityScalar": 0, 
"maxAvailabilityScalar": 100, 
"availabilityDuration": "month", 
"searchQuery": "bookss",
"onlyPostedByOthers": false}
if onlyPostedByOthers is true, this do not retrieve the items posted by the same user, if it is false, it retrieves all items in the specified type.
*/
app.post("/searchAllItems", async(req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let userController = new UserController();
        let customerId = await userController.getCustomerIdByUserId(req.session.foundUser.userId);
        
        let {offset, itemType, minPrice, maxPrice, minDay, minMonth, minYear, maxDay, maxMonth, maxYear, durationOfPrice
            , minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, searchQuery, onlyPostedByOthers} = req.body;
        let customerController = new CustomerController(itemType, customerId);
        if(onlyPostedByOthers){
            let nameOfUser = await userController.getNameByUserId(req.session.foundUser.userId);
            let countOfItems = await customerController.getCountOfItemsByFilter(minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth, minYear, 
                maxDay, maxMonth, maxYear, -1, null, ".", nameOfUser);
            let arrayOfFavListItemIds = await customerController.getFavoritesListItemIds();

            let arrayOfItems = await customerController.searchItemsExceptUsersItems(searchQuery, countOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, 
                availabilityDuration, minDay,minMonth, minYear, maxDay, maxMonth, maxYear, nameOfUser);
            let serializedArray = arrayOfItems.map((item) => {
                return item.toJSON(arrayOfFavListItemIds);
            });

            let jsonString = JSON.stringify(serializedArray);
            res.status(200).send(jsonString);
        }
        else{
            let nameOfUser = ".";
            
            let countOfItems = await customerController.getCountOfItemsByFilter(minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth, minYear, 
                maxDay, maxMonth, maxYear, -1, null, ".", nameOfUser);
            console.log(countOfItems);
            let arrayOfFavListItemIds = await customerController.getFavoritesListItemIds();

            let arrayOfItems = await customerController.searchItem(searchQuery, countOfItems, offset, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, 
                availabilityDuration, minDay,minMonth, minYear, maxDay, maxMonth, maxYear);
            let serializedArray = arrayOfItems.map((item) => {
                return item.toJSON(arrayOfFavListItemIds);
            });

            let jsonString = JSON.stringify(serializedArray);
            res.status(200).send(jsonString);
        }
    }
    else{
        res.redirect("/login");
    }
})

/* 
Example JSON
{"offset": 0, 
"itemType": "course", 
"minPrice": 0, 
"maxPrice": 10000, 
"minDay": 1, 
"minMonth": 1, 
"minYear": 1, 
"maxDay": 25, 
"maxMonth": 12, 
"maxYear": 2023, 
"durationOfPrice": "week", 
"minAvailabilityScalar": 0, 
"maxAvailabilityScalar": 100, 
"availabilityDuration": "month", 
"courseName": "book",
"sectionNo": 2,
"wantToGive": true,
"sortBy": 1,
"onlyPostedByOthers": true}
if onlyPostedByOthers is true, this do not retrieve the items posted by the same user, if it is false, it retrieves all items in the specified type.
*/
app.post("/filterAllItems", async(req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let userController = new UserController();
        let customerId = await userController.getCustomerIdByUserId(req.session.foundUser.userId);
        
        let {offset, itemType, minPrice, maxPrice, minDay, minMonth, minYear, maxDay, maxMonth, maxYear, durationOfPrice
            , minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, courseName, sectionNo, wantToGive, sortBy, onlyPostedByOthers} = req.body;
        let customerController = new CustomerController(itemType, customerId);
        if(onlyPostedByOthers){
            let nameOfUser = await userController.getNameByUserId(req.session.foundUser.userId);
            let countOfItems = await customerController.getCountOfItemsByFilter(minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth, minYear, 
                maxDay, maxMonth, maxYear, sectionNo, wantToGive, courseName, nameOfUser);
            let arrayOfFavListItemIds = await customerController.getFavoritesListItemIds();
            let arrayOfItems = await customerController.filterItemsExceptUsersItems(countOfItems, offset, minPrice, maxPrice, durationOfPrice, 
                minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth, minYear, maxDay, maxMonth, maxYear, sectionNo, wantToGive, sortBy,
                courseName, nameOfUser);
            let serializedArray = arrayOfItems.map((item) => {
                return item.toJSON(arrayOfFavListItemIds);
            });

            let jsonString = JSON.stringify(serializedArray);
            res.status(200).send(jsonString);
        }
        else{
            let nameOfUser = ".";
            let countOfItems = await customerController.getCountOfItemsByFilter(minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth, minYear, 
                maxDay, maxMonth, maxYear, sectionNo, wantToGive, courseName, nameOfUser);
            let arrayOfFavListItemIds = await customerController.getFavoritesListItemIds();
            let arrayOfItems = await customerController.filterItems(countOfItems, offset, minPrice, maxPrice, durationOfPrice, 
                minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, minDay, minMonth, minYear, maxDay, maxMonth, maxYear, sectionNo, wantToGive, sortBy,
                courseName);
            let serializedArray = arrayOfItems.map((item) => {
                return item.toJSON(arrayOfFavListItemIds);
            });

            let jsonString = JSON.stringify(serializedArray);
            res.status(200).send(jsonString);
        }
        
    }
    else{
        res.redirect("/login");
    }
})

/* 
Example JSON:
{
    "offset": 0,
    "itemType": "course"
}
*/
app.post("/getAllItemsInFavoritesList", async (req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let userController = new UserController();
        let customerId = await userController.getCustomerIdByUserId(req.session.foundUser.userId);
        let {offset, itemType} = req.body;
        let customerController = new CustomerController(itemType, customerId);
        let arrayOfFavListItemIds = await customerController.getFavoritesListItemIds();
        let arrayOfItems = await customerController.getItemsInFavoritesList(offset, arrayOfFavListItemIds.length);
        let serializedArray = arrayOfItems.map((item) => {
            return item.toJSON(arrayOfFavListItemIds);
        });
        res.status(200).send(JSON.stringify(serializedArray));
    }
    else{
        res.redirect("/login");
    }
})

/* 
Example JSON:
{
    "nameOfPoster": "hakan",
    "itemType": "course",
    "offset": 0
}
*/
app.post("/getAllItemsOfPoster", async (req, res) => { // when a user clicks to another user's profile, the items posted by the user will appear-item type must be specified in the req
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let {nameOfPoster, itemType, offset} = req.body;
        let userController = new UserController();
        
        let posterIdOfPoster = await userController.getPosterIdByName(nameOfPoster);
        
        let posterController = new PosterController(itemType, posterIdOfPoster);
        let customerId = await userController.getCustomerIdByUserId(req.session.foundUser.userId);
        let customerController = new CustomerController(itemType, customerId);
        let arrayOfFavListItemIds = await customerController.getFavoritesListItemIds();
        let count = await posterController.getCountOfItems();
        let arrayOfItems = await posterController.getItems(offset, count);
        let serializedArray = arrayOfItems.map((item) => {
            return item.toJSON(arrayOfFavListItemIds);
        });
        res.status(200).send(JSON.stringify(serializedArray));
    }
    else{
        return res.redirect("/login");
    }
})

/* 
Example JSON: 
{
    "itemId": 4,
    "itemType": "lost"
}

*/

app.post("/getItemWithItemId", async (req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let {itemId, itemType} = req.body;
        let userController = new UserController();
        let customerId = await userController.getCustomerIdByUserId(req.session.foundUser.userId);
        let customerController = new CustomerController(itemType, customerId);
        let item = await customerController.getItemWithItemId(itemId);
        if(item == null){
            res.status(404).send("null");
        }
        else{
            let arrayOfFavListItemIds = await customerController.getFavoritesListItemIds();
            item = item.toJSON(arrayOfFavListItemIds);
            res.status(200).send(JSON.stringify(item));
        }
        
    }
    else{
        return res.redirect("/login");
    }
})
