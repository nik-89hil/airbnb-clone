const {connectMongoose} = require('./database');
require('dotenv').config();
const Product =require('./models/product');

const ProductJson = require('./product.json');

const start = async (MONGODB_URI)=>{
    try {
        await connectMongoose(process.env.MONGODB_URI);
        await Product.create(ProductJson);
        console.log("success");
        
    } catch (error) {
        console.log(error);
        
    }
}

start();