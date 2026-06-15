const SendMail = require('../Generates/MailOTP');
const SendOrder = require('../Generates/MailOrder');


const SendOtp = async (req, res) => {
    try {
        const otp = Math.floor(
            Math.random() * (100000 - 1 + 1) + 1
        )
        const otpsent = await SendMail(otp, req.body.email);
        otpsent.messageId  && otpsent.messageId !==null ?
         res.status(200).json({ otp }) :
         res.status(500).json({message:"Can't send otp"})
    }
    catch (e) {
        res.status(500).json({error: e});
    }
}

const OrderMail = async (req, res) => {
    const name = req.body.name;
    const List = req.body.Products;
    const mail = req.body.email;    
    try {
        if (List.length !== 0) {    
            const orderSent = await SendOrder(name , mail , List);
            orderSent.messageId && orderSent.messageId !==null ?
            res.status(200).json({ message: 'Order Sent sucessfully' }):
            res.status(500).json({message:"Can't send order mail"})
        }
        else {
            res.status(500).json("Error : ", e);
        }
    }
    catch(e) {
        res.status(500).json({message : 'Mail not sent'});
    }
}

module.exports = {SendOtp , OrderMail};