const { findUser } = require("../repositories/user")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_EXPIRY, JWT_SECRET} = require('../config/serviceConfig');
const InternalServerError = require("../utils/internalServerError");


async function loginUser(userDetails){

 try{
     const email = userDetails.email;
     const plainPassword = userDetails.password;
    // CHECK IF THERE IS A RESISTERED USER WITH THE GIVEN EMAIL
     const user = await findUser(email)
     if(!user){
        throw {message : "no user found with this given email", statusCode: 404};
     } 
     const isPasswordValidated = await bcrypt.compare(plainPassword,user.password);
     if(!isPasswordValidated){
        throw {message : "Invalid password, please try again", statusCode: 401};
     }
     const token = jwt.sign({email: user.email, id :user.id,}, JWT_SECRET ,  {expiresIn : JWT_EXPIRY})
     return { token, userData: {
        email: user.email,
        firstName: user.firstName,
        id: user._id
     }}
     
 }catch(error){
   console.log(error)
    throw new InternalServerError()
 }
}

module.exports = {
    loginUser
}