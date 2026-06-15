const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const MailRouter = require('./Router/MailRouter');
const ShopRouter = require('./Router/ShopRouter');
const FoodRouter = require('./Router/FoodRouter');

app.use(bodyparser.json());
app.use(cors());
app.use('/' , MailRouter);
app.use('/shop' , ShopRouter);
app.use('/food' , FoodRouter);


mongoose.connect('mongodb://localhost:27017/Cafeteria').then(() => {
    console.log('Database Connected successfully');
}).catch((e) => {
    console.log(`An error occured while connecting to database : ${e}`);
})

app.listen(4000 , () => {
    console.log("Server running on port 4000");
})