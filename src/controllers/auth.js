const { loginUser } = require("../services/auth");


async function login(req, res){
    const userDetails = req.body;
    try{
       const response = await loginUser(userDetails);

       res.cookie("authToken", response.token ,{
        secure : true,
        maxAge: 30 * 24 * 60 * 60 * 1000
       });
       return res.status(200).json({
        success : true,
        message: 'logged in successfully',
        data: {
            userData : response.userData
        },
        error : {}
       })
    }catch(error){
        return res.status(501).json({
            success : false,
            message: error.message,
            data: {},
            error: error
        })

    }
}

async function logOut(req, res){
    res.cookie("authToken", "",{
        secure : true,
    } )
    return res.status(200).json({
        success : true,
        message: 'logged out  successfully',
        data: {},
        error: {}
    })
}

module.exports = {
    login,
    logOut
}