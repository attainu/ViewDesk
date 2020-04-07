const nodemailer = require('nodemailer')
require('dotenv').config('../.env')

let mailer = async (mail) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASS
        }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail(mail);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


 let Mail = {
        from: 'View Desk', // sender address
        to: 'dhanesh.vishwakarma11@gmail.com', // list of receivers
        subject: 'TESTING', // Subject line
        text: 'Hey', // plain text body
        html: '<h3>Hello From View Desk</h3>'      
    }

mailer(Mail)

// exporting module
module.exports = mailer