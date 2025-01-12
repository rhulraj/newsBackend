
const { findUser, createUser } = require("../repositories/user");
const InternalServerError = require("../utils/internalServerError");
const { generateOtp, verifyOtp, storeOTP ,sendOTP} = require("../validation/emailValidation");
const bcrypt = require('bcrypt');

const veryfied = {
};

async function sendOtp(userDetails){
    if(!userDetails.email) return{status :400, message : "Email is required"};
    const Email = userDetails.email;
    
    const user = await findUser(Email);
    if(user){
        throw { message : 'User with the given email already exist', status: 400}
    }
    const otp = generateOtp();
    await sendOTP(userDetails.email, otp);
    storeOTP(userDetails.email, otp)
    return { message: 'OTP sent successfully'};
  
}

async function verifyotp(userDetails){
    const {otp, email} = userDetails
    console.log(userDetails)
    if(!email || !otp) return {status: 400, message: "Email and OTP are required"}
    
    const {valid, message} = verifyOtp(email, otp);
    if(!valid) return {status :400, message :message, success: false};
    veryfied[email] = true;
    console.log(veryfied)
    return {message :"OTP verified successfully", success :true}
}

async function creatUserService(userDetails) {
    console.log(userDetails)
    
    const { email, plainPassword} = userDetails
    if(!plainPassword){
        throw {status :400,message : "Password is required"}
    }
    const saltRound = 10
    console.log(veryfied)
    if(veryfied[email]){
        try{
        const hashPassword = await bcrypt.hash(plainPassword, saltRound);
        console.log(hashPassword)
        const response = await createUser({...userDetails,
            password : hashPassword
        });
        console.log(response)
        delete veryfied[email];
        if(!response) throw {message : "error"}

        return response
        
    }catch(error){
        console.log(error)
        throw 'Your OTP is not verified'
    }
    }
    
}

module.exports = {
    sendOtp,
    verifyotp,
    creatUserService
}