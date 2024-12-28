const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    title:{
        type : String,
        require : true
    },
    image1:{
        type: String,
    },
    image2:{
        type: String
    },
    image3:{
        type:String
    },
    type:{
        type: String,
        enum : ['LATEST', 'TOP', "INTERNATIONAL", "SPORTS"],
        default : 'LATEST'
    },
    body1:{
        type: String,
        required: true
    },
    body2:{
        type: String
    },
    body3 :{
        type :String
    }


},{
    timestamps : true
});

const news = mongoose.model('News',Schema);
module.exports = news;