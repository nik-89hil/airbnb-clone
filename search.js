const bodyParser = require('body-parser');
const  express = require('express');
const app = express.Router();
const Product = require('./models/product')
const {connectMongoose}=require('./database')
const ejs = require("ejs");
const { default: mongoose } = require('mongoose');
require('dotenv').config();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
connectMongoose(process.env.MONGODB_URI)

app.use(bodyParser.urlencoded({extended:true}))


// console.log(MyModel)
app.get("/",async (req,res)=>{
    //.............................
   
   try {
    const {destination} =req.query;
    const queryobject = {};
    if(destination){
        queryobject.destination = destination;
    }

    const myData = await Product.find(queryobject)
    res.render('indes',{
        destination:myData[0].destination,
        hostname:myData[0].hostname,
        name:myData[0].name,
        rate:myData[0].rate,
        amenities:myData[0].amenities,
        checkIn:req.query.checkIn,
        noofguest:req.query.guest,
        checkout:req.query.checkOUt,
        star:myData[0].star,
        bathrooms:myData[0].bathrooms,
        address:myData[0].address,
        firstreview:myData[0].firstreview,
        secondreview:myData[0].secondreview,
        bedroom:myData[0].bedroom,
        imgf:myData[0].imgf,
        imgs:myData[0].imgs,
        imgt:myData[0].imgt,
        imgfor:myData[0].imgfor,

    })//myData[0]
    
   } catch (error) {
    res.send({
        success:false,
        suggestion:"Type only Indian states with proper spelling // like Delhi etc remember that first letter should be capital and only one space is between two words are eligible like Andhra Pradesh, Tamil Nadu etc..."
    })
    
   }
    
});


module.exports = app;