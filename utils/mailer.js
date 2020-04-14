const nodemailer = require('nodemailer')
require('dotenv').config('../.env')

// nodemailer function
let mailer = async (mode, data) => {

    // creating transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASS
        }
    })

    // mail variables
    const subject = ` `
    const message = ` `

    // mailing modes
    if (mode === 'login') {

        subject = `login Creadentials`
        message = `
        User activation Link: localhost:8080/api/confirm/:${data.id}\n
        email: ${data.email} password: ${data.password}`
    }

    else if (mode === 'forgot') {

        subject = `Forgot Password`
        message = `
        Click on this link to set your forgot password: ${data}`
    }

    // sending mail
    let info = await transporter.sendMail({

        from: process.env.GMAIL, // sender address
        to: data.email, // list of receivers
        subject: subject, // Subject line
        text: message, // plain text body
        //html: html // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// testing
/*let Mail = {
    from: 'View Desk', // sender address
    to: 'dhanesh.vishwakarma11@gmail.com', // list of receivers
    subject: 'TESTING', // Subject line
    text: 'Hey', // plain text body
    html: '<h3>Hello From View Desk</h3>'
}*/

// exporting module
module.exports = mailer