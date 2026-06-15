const express = require('express');
const MailRouter = express.Router();
const {SendOtp,OrderMail} = require('../Controller/MailController');

MailRouter.post('/sendotp' , SendOtp);
MailRouter.post('/order' , OrderMail);

module.exports = MailRouter;