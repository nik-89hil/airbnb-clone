const mongoose = require('mongoose');
require('dotenv').config();
exports.connectMongoose =(MONGODB_URI)=>{

    mongoose.connect(process.env.MONGODB_URI)
    .then(e=>console.log(`connected to mongodb: ${e.connection.host}`))
    .catch((e)=>console.log(e));

   
}

mongoose.set('strictQuery',false);

