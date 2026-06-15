var nodemailer = require('nodemailer');

const SendMail = (otp, receiverMail) => {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sampleusefornode@gmail.com',
      pass: 'yjgc nsek vshc xphb'
    }
  });

  var mailOptions = {
    from: 'sampleusefornode@gmail.com',
    to: receiverMail,
    subject: 'OTP for login',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 24px; background: #fafbfc;">
        <h2 style="color: #2d7ff9; text-align: center;">Cafeteria Login OTP</h2>
        <p>Hello,</p>
        <p>Your One-Time Password (OTP) for login is:</p>
        <div style="font-size: 2em; font-weight: bold; color: #222; text-align: center; margin: 20px 0;">
          ${otp}
        </div>
        <p style="color: #555;">Please enter this OTP to complete your login. <b>Do not share this code with anyone.</b></p>
        <hr style="margin: 24px 0;">
        <p style="font-size: 0.9em; color: #888;">If you did not request this, please ignore this email.</p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
}


module.exports = SendMail;