const serviceConfig = require('./serviceConfig');
const mongoose = require('mongoose');

async function connectDB (){
    try{
        await mongoose.connect(serviceConfig.mongodbUrl,{
        
    })
    console.log("Successfully connected to the mongo db server")
     }catch(error){
          console.log(error)
     }
     
}

module.exports = connectDB;