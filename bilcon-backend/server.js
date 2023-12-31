
const express = require("express");
const mongoose = require("mongoose");
const UserDB = require("./userDb");
const UserController = require("./UserController");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const session = require("express-session");
const cookieParser = require("cookie-parser");


let userId = 0; // every user has a user id assigned by the system, this is incremented in every user
const app = express();
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
app.get("/", (req,res)=>{
    //res.send("HELLO");
})
app.post("/register", (req,res)=>{    
    const nameOfUser = req.body.name;
    const emailOfUser = req.body.email;
    const studentIdOfUser = req.body.id;
    const passwordOfUser = req.body.password;
    let userController = new UserController();   
    userController.registerUser(nameOfUser, emailOfUser, studentIdOfUser, passwordOfUser);
    res.send("User registered, waiting for email confirm");
})
app.post("/login", async(req,res)=>{
    const studentIdOfUser = req.body.id;
    const passwordOfUser = req.body.password;
    let userController = new UserController();   
    let foundUser = await userController.loginUser(studentIdOfUser, passwordOfUser);
    
    //console.log(foundUser);
    if (foundUser) {
        req.session.foundUser = {
            mail: foundUser.email,
            studentId: foundUser.studentId
        };
        
        req.session.save();
        console.log(req.session);        
        console.log("Login Successful");
        res.redirect('/dashboard');
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
            res.redirect("/login"); 
        } 
    }); 
    
}); 

app.get("/logout", (req,res)=>{
    //console.log(req.session);
    //req.session = null;
    req.session.destroy();    
    res.send("You are logged out.");
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
    res.send("Hello, log in");
})
