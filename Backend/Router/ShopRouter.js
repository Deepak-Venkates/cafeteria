const express = require('express');
const ShopRouter = express.Router();
const {Get} = require('../Controller/ShopController');

ShopRouter.get('/get' , Get);


module.exports = ShopRouter;