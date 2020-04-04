const nodemailer = require('nodemailer')
require('dotenv')

// nodemailer function
let mailer = (message, reciever) => {

    // creating transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASS
        }
    })

    // mail options
    let mailOptions = {
        from: 'View Desk',
        to: reciever,
        subject: 'Sending Email using Node.js',
        text: message,
        //html: send msg as HTML
    }

    // send mail
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log({ status: false, err })
        else
            console.log({ status: true, message: `Email sent to ${mailOptions.to}`, response: info.message })
    })
}

module.exports = mailer

