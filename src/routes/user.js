const express = require('express');
const { generateOtp, verificationOtp, createUser } = require('../controllers/user');
const { isAdmin, isLoggedIn } = require('../validation/authValidation');

const userRouter = express.Router();

userRouter.post('/sendOtp',isLoggedIn, isAdmin , generateOtp)
userRouter.post('/verify', verificationOtp);
userRouter.post('/createUser', createUser);

module.exports = userRouter;