const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const FoodSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    price:{
        type : Number,
        required : true
    },
    image:{
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    shop:{
        type : ObjectId,
        required : true
    },
        quantity:{
        type : String,
        required : true
    }
})

module.exports = mongoose.model("foods",FoodSchema);