const express = require('express');
const FoodRouter = express.Router();
const GetFoods = require('../Controller/FoodController');

FoodRouter.get('/get/:id' , GetFoods);


module.exports = FoodRouter;