const express = require('express');
const uploader = require('../middleware/multerMiddleware');
const { addInfo, findAllData, findById, findAndDeleteById, findLatestData, findTopData, findInternationalData } = require('../controllers/news');
const { isLoggedIn, isAdmin } = require('../validation/authValidation');


const newsRouter = express.Router();

newsRouter.post('/add',isLoggedIn, uploader.array('img', 3), addInfo);
newsRouter.get('/latest', findLatestData);
newsRouter.get('/top', findTopData);
newsRouter.get('/international', findInternationalData);
newsRouter.get('/:id', findById);
newsRouter.delete('/:id', isLoggedIn,isAdmin, findAndDeleteById);

module.exports = newsRouter;