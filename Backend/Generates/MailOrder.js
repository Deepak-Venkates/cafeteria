var nodemailer = require('nodemailer');

const SendOrder = (name , mail, order) => {

    let total = 0

    const content = order.map((items) => {
        total += items.price * items.quantity
        return ` 
                <tr>
                    <td>${items.name}</td>
                    <td>${items.quantity}</td>
                    <td>${items.price}</td>
                </tr>
            `

    })

    // const EmailContent = '<a href="https://localhost:4000/api/accept?userId=12345"><button>Accept</button></a>'

    const EmailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; background: #fafbfc; border-radius: 8px; border: 1px solid #eee; padding: 24px;">
        <h2 style="color: #2d7ff9; text-align: center; margin-bottom: 24px;">Your Cafeteria Order</h2>
        <p style="font-size: 1.05em; margin-bottom: 18px;">Dear ${name},<br>Your order details are as follows:</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <thead>
            <tr style="background: #f0f4f8;">
              <th style="padding: 10px; border-bottom: 1px solid #ddd; text-align: left;">Item</th>
              <th style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">Quantity</th>
              <th style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${content}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold; border-top: 1px solid #ddd;">Total:</td>
              <td style="padding: 10px; text-align: right; font-weight: bold; border-top: 1px solid #ddd;">${total}</td>
            </tr>
          </tfoot>
        </table>
        <p style="color: #555; font-size: 0.95em; text-align: center;">Thank you for your order! If you have any questions, reply to this email.</p>
      </div>
    `
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sampleusefornode@gmail.com',
            pass: 'yjgc nsek vshc xphb'
        }
    });

    var mailOptions = {
        from: 'sampleusefornode@gmail.com',
        to: mail,
        subject: 'Your Order',
        html: EmailContent
    };

    return transporter.sendMail(mailOptions)

}

module.exports = SendOrder;