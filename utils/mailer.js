const nodemailer = require('nodemailer')
const { GMAIL, GMAIL_PASS } = require('dotenv').config()

// trnsport
const transportOption = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    debug: true,
    auth: {
        user: GMAIL,
        pass: GMAIL_PASS
    }
}

// creating transport
const mailTransport = nodemailer.createTransport(transportOption)

// sending mail
const sendMail = async (mode, email, token) => {

    console.log('getting called', mode) // testing

    const domainName = 'www.heroku.com'

    let html = ``

    if (mode === "confirm")
        html = `<h3>Here's the link to confirm your email address</h3>
                <a href=${domainName}/confirm/:${token}>here</a>`

    else if (mode === "forgot")
        html = `<h3>Here is the link to set your forgot password</h3>
                <a href=${domainName}/password/:${token}>here</a>

                <p>and if you didn't requested to set forgot password, kindly igonre it</p>.
                `
    else if (mode === "report")
        html = ``

    try {
        await mailTransport.sendMail({
            from: GMAIL,
            to: email,
            subject:
                mode === "confirm" ? "confirm your email" : "Reset your password", html
        });

    } catch (err) {
        console.log(err);
        throw err;
    }
}

/** function testing  */
sendMail('confirm', 'dhanesh.vishwakarma11@gmail.com', '!@#$%^&*')


// exporting module
module.exports = sendMail