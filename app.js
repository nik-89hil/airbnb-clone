const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const{connectMongoose} = require('./database')
const ejs = require('ejs');
const passport= require('passport');
const session = require('express-session')
const bodyParser = require("body-parser")
const passportLocalMongoose = require('passport-local-mongoose')
// const connectDB = require("./db/connect")
require('dotenv').config();

const searchRouter = require('./search');

// const product_routes =require('./routers/product')
app.use("/search/searchresult",searchRouter);

const PORT = process.env.PORT || 5000;
app.set("view engine","ejs");

// const staticpath = path.join(__dirname+"./public");
app.use("/static",express.static("public"));
// console.log(staticpath);
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:"thisis secret",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());


connectMongoose(process.env.MONGODB_URI);
// app.use(express.static('public'))

const userSchema = new mongoose.Schema({
    email:String,
    password:String
})
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User",userSchema);

passport.use(User.createStrategy());


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname+'/public/index/main.html'))
// });


app.get("/",(req,res)=>{
    if(req.isAuthenticated()){
        res.sendFile(__dirname +"/public/index.html")
    }else{
        res.sendFile(__dirname +"/public/login.html")
    }

})


app.get("/login",(req,res)=>{
    if(req.isAuthenticated()){
        res.sendFile(__dirname+"/public/index.html")
    }else{
        res.sendFile(__dirname + "/public/login.html")
    }
   
})

app.get('/register',(req,res)=>{
    if(req.isAuthenticated()){
        res.sendFile(__dirname+"/public/index.html")
    }else{
        res.sendFile(__dirname + "/public/RegisterUser.html")
    }
})



app.get('/AirbnbSetup',(req,res)=>{
    res.sendFile(__dirname+"/public/entry.html")
})


app.get("/airbnbSetupYourHome",(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/hostyourhome.html'))
})


app.post("/register", function(req,res){
    console.log(req.body);
    var email =req.body.username;
    var password =req.body.password;
    User.register({username:email},
        password,(err,user)=>{
            if(err){
                console.log(err)
            }else{
                passport.authenticate("local")
                (req,res,function(){
                    // res.send("<h3>REGISTER SUCCESSFULLY !!</h3>");
                    res.sendFile(path.join(__dirname+'/public/index.html'))
                })
            }
        })

})


app.post("/propetySetupAirbnb", function(req,res){
    console.log(req.body);
    var email =req.body.username;
    var password =req.body.password;
    User.register({username:email},
        password,(err,user)=>{
            if(err){
                console.log(err)
            }else{
                passport.authenticate("local")
                (req,res,function(){
                    // res.send("<h3>REGISTER SUCCESSFULLY !!</h3>");
                    res.sendFile(path.join(__dirname+'/public/index.html'))
                })
            }
        })

})

app.post('/login',(req,res)=>{
    console.log(req.body);

    const userToBeChecked = new User({
        username:req.body.username,
        password:req.body.password
    })

    req.login(userToBeChecked,function(err){
        if(err){
            console.log(err);
            res.redirect("/login")
        }
        else{
            passport.authenticate("local")
            (req,res,function(){
                User.find({email:req.user.username},
                    function (err,docs){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("credential are correct");
                            // res.send("login successfully");
                            res.sendFile(path.join(__dirname+'/public/index.html'))
                        }
                    })
            })
        }
    })
});



app.get("/booked",(req,res)=>{
    if(req.isAuthenticated()){
        res.send("Booked Successfully !! Thanks")
    }else{
        res.sendFile(__dirname + "/public/login.html")
    }
})

app.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.sendFile(path.join(__dirname+'/public/login.html'))
    });
});





app.all("*",(req,res)=>{
    res.status(404).send("<h1>Page not Found !!</h1>")
})



const start = async() =>{
    try{
        // await connectDB(process.env.MONGODB_URI);
        app.listen(PORT,()=>{
            console.log(`${PORT} YES CONNECTED`);
        })
    }catch(error){
        console.log(error);
    }

}

start();