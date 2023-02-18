const mongoose =require("mongoose");


const productSchema = new mongoose.Schema({
    //schema for data add like destination 
    // name of honour bed amenties listing and review

    destination:{
        type:String
    },
    name:{
        type:String
    },
    bedroom:{
        type:Number
    },
    hostname:{
        type:String
    },
    amenities:{
        type:Array
    },
    rate:{
        type:Number
    },
    star:{
        type:Number
    },
    bathrooms:{
        type:Number
    },
    firstreview:{
        type:String
    },
    secondreview:{
        type:String
    },
    address:{
        type:String
    },
    imgf:String,
    imgs:String,
    imgt:String,
    imgfor:String
})

module.exports = mongoose.model('Product',productSchema);
