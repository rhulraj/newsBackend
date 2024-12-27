const { creatUserService, sendOtp, verifyotp } = require("../services/user");


async function generateOtp(req, res){
    const userDetails = req.body;

    try{
        const response = await sendOtp(userDetails);
        return res.json({
            message : "Successful sent otp",
            success : true,
            data: response,
            error:{}
        })
    } catch(err){
        return res.json({
            message : err.message,
            success : false,
            data: {},
            error:err
        })
    }
}

async function verificationOtp(req, res){
    const userDetails = req.body;
    try{
        const response = await verifyotp(userDetails);
        return res.json({
            message : "",
            success : true,
            data: response,
            error:{}
        })
    }catch(error){
        return res.json({
            message : error.message,
            success : false,
            data: {},
            error:error
        })
    }
}

async function createUser (req, res){
    const userDetails = req.body;
    try{
        const response = await creatUserService(userDetails);
        return res.json({
            message : "Successful created your accont",
            success : true,
            data: response,
            error:{}
        })
    }catch(error){
        return res.json({
            message : error.message,
            success : false,
            data: {},
            error:error
        })
    }
}

module.exports = {
    createUser,
    generateOtp,
    verificationOtp
}