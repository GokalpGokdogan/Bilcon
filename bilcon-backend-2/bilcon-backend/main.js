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

const app = express();

const cors = require('cors');
const corsOptions ={
    origin: 'http://localhost:3001', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
let itemId = 0;


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

  };
app.use(express.json());
mongoose.connect(dbUrl)
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
            mail: foundUser.email,
            studentId: foundUser.studentId,
            userId: foundUser._id
        };
        
        req.session.save();
        console.log(req.session);        
        console.log("Login Successful");
        res.status(200).json({ redirect: "http://localhost:3001/home" });

    }
    else {
        console.log("Invalid login credentials");
    }
    });

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
            res.redirect("http://localhost:3001"); 
        } 
    }); 
    
}); 

app.get("/logout", (req,res)=>{
    //console.log(req.session);
    //req.session = null;
    req.session.destroy();    
    res.send("You are logged out.");
});
app.get('/home', (req, res) => {
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
    res.send("Hello, log in");
})


/* 
Item types can be: "sale", "rent", "lost", "found", "lesson", "course".

durOfPrice, availabilityScalar, availabilityDuration are for rent items, durOfprice is for specifying the duration of price. For example, an item's price
can be 5TL per week so the price is 5 and durOfPrice is "week". The item can be rentable for 2 months then, availabilityScalar is 2 and availabilityDuration
is "month". Here are the possible values for durOfPrice and availabilityDuration: "hour", "day", "week", "month", "year".

place, day, month and year are for lost and found items(day, month and year are integers).

sectionNo and wantToGive are for course items, sectionNo is an integer. wantToGive is a boolean if it is true, the poster wants to give this course, if it is false,
poster wants to take this course.

You can look at the items db classes to see what is stored in db for each item.

The request should be in form-data format, key-value pairs are as following:
photo -> a jpeg file
the others are: name, definition, price, durOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, wantToGive, itemType
*/

app.post("/postItem", upload.fields([{ name: 'image', maxCount: 1 }]), async (req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let {name, definition, price, durOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, wantToGive, itemType} = req.body;
        let photo;
        if(!req.files["image"][0]){
            photo = " ";
        }
        else{
            photo = (await sharp(req.files["image"][0].buffer).withMetadata().jpeg({quality: 50}).toBuffer()).toString("base64");
        }
        
        let posterController = new PosterController();
        let isPosted;
        let userController = new UserController();
        let posterId = await userController.getPosterIdByUserId(req.session.foundUser.userId);
        if(itemType == "sale"){
            isPosted = await posterController.postSaleItem(name, definition, itemId, price, posterId, photo);
        }
        else if(itemType == "rent"){
            isPosted = await posterController.postRentItem(name, definition, itemId, price, durOfPrice, availabilityScalar, availabilityDuration, photo, posterId);
        }
        else if(itemType == "lost"){
            isPosted = await posterController.postLostItem(name, definition, itemId, place, day, month, year, posterId);
        }
        else if(itemType == "found"){
            isPosted = await posterController.postFoundItem(name, definition, itemId, photo, place, day, month, year, posterId);
        }
        else if(itemType == "lesson"){
            isPosted = await posterController.postPrivateLessonItem(name, definition, itemId, photo, price, posterId);
        }
        else{
            isPosted = await posterController.postCourseItem(name, definition, itemId, sectionNo,posterId, wantToGive);
        }
    
        if(isPosted){
            res.send("Item is posted!");
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
In getItems, searchItems and filterItems, an array of related item objects are returned, to see
the objects types, you can look at the toJSON functions which are in the item classes. Also,
some objects have photos and these photos are returned as base64 string format(in the response), you should
convert them back to jpeg

*/

/* 
When a customer first opens the page, there should be some items and for that, this can be used. The req body is in JSON format:
{
    "numberOfItems": 5,
    "offset": 0,
    "itemType": "rent"
} numberOfItems indicate how many items will be returned. Offset is for passing some number of items(for example, if the user want to see the second page, the 
    offset should be used in order to pass the items in the first page)
*/
app.get("/getItems", async (req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let {numberOfItems, offset, itemType} = req.body;
        let customerController = new CustomerController();
        let userController = new UserController();
        let arrayOfItems;
        let arrayOfNames;
        let serializedArray;
        let jsonString;
        if(itemType == "sale"){
            arrayOfItems = await customerController.getSaleItems(numberOfItems, offset);
            arrayOfNames = await userController.getNamesOfPosterIds(arrayOfItems.map((item) => {
                return item.posterId;
            }));
            serializedArray = arrayOfItems.map((saleItem, index) => {
                return saleItem.toJSON(arrayOfNames[index]);
            });
            jsonString = JSON.stringify(serializedArray); 
        }
        else if(itemType == "rent"){
            arrayOfItems = await customerController.getRentItems(numberOfItems, offset);
            arrayOfNames = await userController.getNamesOfPosterIds(arrayOfItems.map((item) => {
                return item.posterId;
            }));
            serializedArray = arrayOfItems.map((rentItem, index) => {
                return rentItem.toJSON(arrayOfNames[index]);
            });
            jsonString = JSON.stringify(serializedArray); 
        }
        else if(itemType == "lost"){
            arrayOfItems = await customerController.getLostItems(numberOfItems, offset);
            arrayOfNames = await userController.getNamesOfPosterIds(arrayOfItems.map((item) => {
                return item.posterId;
            }));
            serializedArray = arrayOfItems.map((lostItem, index) => {
                return lostItem.toJSON(arrayOfNames[index]);
            });
            jsonString = JSON.stringify(serializedArray); 
        }
        else if(itemType == "found"){
            arrayOfItems = await customerController.getFoundItems(numberOfItems, offset);
            arrayOfNames = await userController.getNamesOfPosterIds(arrayOfItems.map((item) => {
                return item.posterId;
            }));
            serializedArray = arrayOfItems.map((foundItem, index) => {
                return foundItem.toJSON(arrayOfNames[index]);
            });
            jsonString = JSON.stringify(serializedArray); 
        }
        else if(itemType == "lesson"){
            arrayOfItems = await customerController.getPrivateLessonItems(numberOfItems, offset);
            arrayOfNames = await userController.getNamesOfPosterIds(arrayOfItems.map((item) => {
                return item.posterId;
            }));
            serializedArray = arrayOfItems.map((lessonItem, index) => {
                return lessonItem.toJSON(arrayOfNames[index]);
            });
            jsonString = JSON.stringify(serializedArray); 
        }
        else{
            arrayOfItems = await customerController.getCourseItems(numberOfItems, offset);
            arrayOfNames = await userController.getNamesOfPosterIds(arrayOfItems.map((item) => {
                return item.posterId;
            }));
            serializedArray = arrayOfItems.map((courseItem, index) => {
                return courseItem.toJSON(arrayOfNames[index]);
            });
            jsonString = JSON.stringify(serializedArray); 
        }
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

Some values are used for particular item types, as can be seen from below.
*/
app.get("/searchItems", async (req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let customerController = new CustomerController();
        let userController = new UserController();
        let arrayOfItems;
        let arrayOfNames;
        let serializedArray;
        let jsonString;
        let {numberOfItems, offset, itemType, minPrice, maxPrice, minDay, minMonth, minYear, maxDay, maxMonth, maxYear, durationOfPrice
            , minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, searchQuery} = req.body;
            console.log(itemType);
        if(itemType == "sale"){
            arrayOfItems = await customerController.searchInSaleItems(searchQuery, numberOfItems, minPrice, maxPrice, offset);
            arrayOfNames = await userController.getNamesOfPosterIds(arrayOfItems.map((item) => {
                return item.posterId;
            }));
            serializedArray = arrayOfItems.map((saleItem, index) => {
                return saleItem.toJSON(arrayOfNames[index]);
            });
            jsonString = JSON.stringify(serializedArray); 
        }
        else if(itemType == "rent"){
            arrayOfItems = await customerController.searchInRentItems(searchQuery, numberOfItems, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, offset);
            arrayOfNames = await userController.getNamesOfPosterIds(arrayOfItems.map((item) => {
                return item.posterId;
            }));
            serializedArray = arrayOfItems.map((rentItem, index) => {
                return rentItem.toJSON(arrayOfNames[index]);
            });
            jsonString = JSON.stringify(serializedArray); 
        }
        else if(itemType == "lost"){
            arrayOfItems = await customerController.searchInLostItems(searchQuery, numberOfItems, offset, minDay, minMonth, minYear, maxDay, maxMonth, maxYear);
            arrayOfNames = await userController.getNamesOfPosterIds(arrayOfItems.map((item) => {
                return item.posterId;
            }));
            serializedArray = arrayOfItems.map((lostItem, index) => {
                return lostItem.toJSON(arrayOfNames[index]);
            });
            jsonString = JSON.stringify(serializedArray); 
        }
        else if(itemType == "found"){
            arrayOfItems = await customerController.searchInFoundItems(searchQuery, numberOfItems, offset, minDay, minMonth, minYear, maxDay, maxMonth, maxYear);
            arrayOfNames = await userController.getNamesOfPosterIds(arrayOfItems.map((item) => {
                return item.posterId;
            }));
            serializedArray = arrayOfItems.map((foundItem, index) => {
                return foundItem.toJSON(arrayOfNames[index]);
            });
            jsonString = JSON.stringify(serializedArray); 
        }
        else{
            arrayOfItems = await customerController.searchInPrivateLessonItems(searchQuery, minPrice, maxPrice, offset, numberOfItems);
            arrayOfNames = await userController.getNamesOfPosterIds(arrayOfItems.map((item) => {
                return item.posterId;
            }));
            serializedArray = arrayOfItems.map((lessonItem, index) => {
                return lessonItem.toJSON(arrayOfNames[index]);
            });
            jsonString = JSON.stringify(serializedArray); 
        }
        // No course search
        res.status(200).send(jsonString);

    }
    else{
        res.redirect("/login");
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
*/
app.get("/filterItems", async (req, res) => {
    const user = req.session.foundUser;
    if(user && Object.keys(user).length > 0){
        let customerController = new CustomerController();
        let userController = new UserController();
        let arrayOfItems;
        let arrayOfNames;
        let serializedArray;
        let jsonString;
        let {numberOfItems, offset, itemType, minPrice, maxPrice, minDay, minMonth, minYear, maxDay, maxMonth, maxYear, durationOfPrice
        , minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, courseName, sectionNo, wantToGive, sortBy} = req.body;
        if(itemType == "sale"){
            arrayOfItems = await customerController.filterSaleItems(numberOfItems, minPrice, maxPrice, offset, sortBy);
            arrayOfNames = await userController.getNamesOfPosterIds(arrayOfItems.map((item) => {
                return item.posterId;
            }));
            serializedArray = arrayOfItems.map((saleItem, index) => {
                return saleItem.toJSON(arrayOfNames[index]);
            });
            jsonString = JSON.stringify(serializedArray); 
        }
        else if(itemType == "rent"){
            arrayOfItems = await customerController.filterRentItems(numberOfItems, sortBy, minPrice, maxPrice, durationOfPrice, minAvailabilityScalar, maxAvailabilityScalar, availabilityDuration, offset);
            arrayOfNames = await userController.getNamesOfPosterIds(arrayOfItems.map((item) => {
                return item.posterId;
            }));
            serializedArray = arrayOfItems.map((rentItem, index) => {
                return rentItem.toJSON(arrayOfNames[index]);
            });
            jsonString = JSON.stringify(serializedArray); 
        }
        else if(itemType == "lost"){
            arrayOfItems = await customerController.filterLostItems(minDay, minMonth, minYear, maxDay, maxMonth, maxYear, offset, numberOfItems, sortBy);
            arrayOfNames = await userController.getNamesOfPosterIds(arrayOfItems.map((item) => {
                return item.posterId;
            }));
            serializedArray = arrayOfItems.map((lostItem, index) => {
                return lostItem.toJSON(arrayOfNames[index]);
            });
            jsonString = JSON.stringify(serializedArray); 
        }
        else if(itemType == "found"){
            arrayOfItems = await customerController.filterFoundItems(minDay, minMonth, minYear, maxDay, maxMonth, maxYear, offset, numberOfItems, sortBy);
            arrayOfNames = await userController.getNamesOfPosterIds(arrayOfItems.map((item) => {
                return item.posterId;
            }));
            serializedArray = arrayOfItems.map((foundItem, index) => {
                return foundItem.toJSON(arrayOfNames[index]);
            });
            jsonString = JSON.stringify(serializedArray); 
        }
        else if(itemType == "lesson"){
            arrayOfItems = await customerController.filterPrivateLessonItems(minPrice, maxPrice, offset, numberOfItems, sortBy);
            arrayOfNames = await userController.getNamesOfPosterIds(arrayOfItems.map((item) => {
                return item.posterId;
            }));
            serializedArray = arrayOfItems.map((privateLessonItem, index) => {
                return privateLessonItem.toJSON(arrayOfNames[index]);
            });
            jsonString = JSON.stringify(serializedArray); 
        }
        else{
            arrayOfItems = await customerController.filterCourseItems(numberOfItems, offset, sortBy, courseName, sectionNo, wantToGive);
            arrayOfNames = await userController.getNamesOfPosterIds(arrayOfItems.map((item) => {
                return item.posterId;
            }));
            serializedArray = arrayOfItems.map((courseItem, index) => {
                return courseItem.toJSON(arrayOfNames[index]);
            });
            jsonString = JSON.stringify(serializedArray); 
        }
        res.status(200).send(jsonString);
        }
    else{
        res.redirect("/login");
    }
})

/* 
    Creates a chat between the two designated users. 
    The subsequent message objects are then tied to this chat object.
    The format of the request:

    {
        "firstId" : "IdOfUser1",
        "secondId" : "IfOfUser2"
    }



*/
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