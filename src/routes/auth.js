const express = require('express');
const { login, logOut } = require('../controllers/auth');

const authRouter = express.Router()

authRouter.post('/login', login)
authRouter.post('/logOut', logOut)

module.exports = authRouter;