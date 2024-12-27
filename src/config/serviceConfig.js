const dotEnv = require('dotenv');
dotEnv.config();

module.exports ={
    mongodbUrl : process.env.mongodbUrl,
    PORT : process.env.port,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    FRONTEND_URL: process.env.FRONTEND_URL,
    GMAIL_USER : process.env.GMAIL_USER,
    GMAIL_PASS : process.env.GMAIL_PASS,
    JWT_SECRET : process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
}