const transporter = require("../config/gmailConfig");
const serviceConfig = require("../config/serviceConfig");

const generateOtp =  () =>{
     return Math.floor(100000 + Math.random() * 900000).toString(); //6-digit OTP
}

const sendOTP = async (email , otp) =>{
    const mailOption = {
        from: serviceConfig.GMAIL_USER,
        to: email,
        subject : 'your otp code from vedicInfo',
        text: `your OTP code is ${otp} . It is valid for 10 minutes`
    };

    try { 
        await transporter.sendMail(mailOption);
    }catch (error){
        console.log("Error sending otp", error);
    }
}

const otpStorage = {} // store OTPs with expiration times in-memory

//store OTP temporarily with expiration (10 minutes)
const storeOTP = (email, otp) =>{
    const expiryTime = Date.now() + 10 * 60 * 1000; //10 minutes from now
    otpStorage[email] = {otp, expiryTime, email}
}

const verifyOtp = (email, otp) =>{
    if(!otpStorage[email]) return {valid: false, message: "OTP not found"};
    console.log(otpStorage)
    const { otp: storeotp, expireTime} = otpStorage[email];
    if(Date.now > expireTime) return {valid: false, message: 'OTP expired'};
    if (otp !== storeotp) return {valid: false, message : 'Incorrect OTP'}
    delete otpStorage[email]
    return { valid: true, message: 'OTP verified'};
}

module.exports = {generateOtp, sendOTP, verifyOtp,storeOTP}