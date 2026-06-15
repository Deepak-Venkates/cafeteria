const Shops = require('../Schemas/ShopSchema')

const Get = async (req, res) => {
    try {
        const list = await Shops.find();
        res.status(200).json(list);
    }
    catch (e) {
        res.status(500).json("Error : ", e);
    }
}

module.exports = { Get }