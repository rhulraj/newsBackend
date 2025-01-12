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
    body1:{
        type: String,
        required: true
    },
    body2:{
        type: String
    },
    body3:{
        type :String
    },
    language:{
        type: String,
        enum : ['English', 'Hindi'],
        default : 'Hindi'
    },
    url:{
        type: String,
        unique :[true, "url is already in use"],
        required: true
    }


},{
    timestamps : true
});

const information = mongoose.model('Information',Schema);
module.exports = information;
