const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        require : [true, "First Name is required"],
        trim : true
    },
    lastName:{
        type: String,
        require: [true, "Last Name is required"],
        trim : true,
    },
    email : {
        type: String,
        require : [true, "Email is required"],
        unique :[true, "Email is already in use"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type: String,
        required : [true, "Password should be provided"],
        minlength: [6, "Password should be minimum 6 character long"]
    }

})

const user = mongoose.model("User", userSchema);

module.exports = user;