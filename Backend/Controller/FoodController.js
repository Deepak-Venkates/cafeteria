const Foods = require('../Schemas/FoodSchema');

const GetFoods = async (req , res) => {
    try{
        const id = req.params.id;
        const foods = await Foods.find({shop:id})
        res.status(200).json(foods);
    }
    catch(e){
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports = GetFoods;