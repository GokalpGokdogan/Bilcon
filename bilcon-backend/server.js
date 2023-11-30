const express = require("express");
const mongoose = require("mongoose");
const UserDB = require("./userDb");
const UserController = require("./UserController");


let userId = 0; // every user has a user id assigned by the system, this is incremented in every user
const app = express();
const dbUrl = ""; //enter the link of mongo db cluster;
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
app.use(express.json());
mongoose.connect(dbUrl)
    .then((result) => {
        app.listen(3000);
        console.log("connected"); // this appears at the console when the connection to databse is done
    })
    .catch((err) => {
        console.log(err);
    })


app.post("/addUser", (req, res) => {
    const {nameOfUser, emailOfUser, studentIdOfUser, passwordOfUser} = req.body;
    let userController = new UserController();
    userController.addUser(nameOfUser, emailOfUser, studentIdOfUser, userId, passwordOfUser)
    .then((result) => {
        if(result){
            userId++;
            console.log("User has been saved to database");
            res.send("User has been saved to database");
        }
        else{
            console.log("Provided email or student id already exists");
            res.send("Provided email or student id already exists");
        }
    })
})
