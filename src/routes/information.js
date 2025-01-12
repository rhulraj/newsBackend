const express = require('express');
const uploader = require('../middleware/multerMiddleware');
const { addInfo, findAllData, findById, findAndDeleteById } = require('../controllers/information');
const { isLoggedIn, isAdmin } = require('../validation/authValidation');


const infoRouter = express.Router();

infoRouter.post('/add', uploader.array('img', 3), addInfo);
infoRouter.get('/',findAllData);
infoRouter.get('/:url', findById);
infoRouter.delete('/:id',isLoggedIn, isAdmin ,findAndDeleteById)

module.exports = infoRouter;