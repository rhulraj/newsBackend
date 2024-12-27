const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serviceConfig');
const UnauthorisedError = require('../utils/unathorisedError')

async function isLoggedIn(req, res, next){
    const token = req.cokkies.authToken;

    if(!token){
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message : "No Auth Token provided"
        })
    }
    try{
        const decoded = await jwt.verify(token, JWT_SECRET);

        if(!decoded){
            throw new UnauthorisedError
            ();
        }
        req.user = {
            email: decoded.email,
            id: decoded.id
        }
        next()
    } catch(error){
        if(error.name = 'TokenExpiredError'){
            res.cookie("authToken", "", {
                secure: true
            });
            return res.status(200).json({
                success: true,
                message: 'logged out successfully',
                data: {},
                error: {}
            })
        }
        return res.status(401).json({
            success: false,
            message : "Invalid token provided",
            data: {},
            error : "Not authenticated"
        })
    }
}

async function isAdmin(req, res, next){
    const token = req.cookies.authToken;

    try{
        const decoded = await jwt.verify(token, JWT_SECRET);
        if(decoded.email === 'rahulanku51@gmail.com'){
            next();
        }
        return res.status(401).json({
            success: false,
            data: {},
            message: "you are not admin",
            error: 'Not admin'
        })
    }catch{

    }
}

module.exports = {
    isAdmin,
    isLoggedIn
}