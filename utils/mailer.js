const nodemailer = require('nodemailer')

let mailer = (mailOptions) => {

    // Create a Transport instance using nodemailer
    sails.log.debug('try to send mail');
    let smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            XOAuth2: {
                user: "allspark.viewdesk@gmail.com", // Your gmail address.
                clientId: "634698684173-6982arb7410768jp6cdaqug9o4njrt0n.apps.googleusercontent.com",
                clientSecret: "UFYowYDk55286EESP14TVJN4",
                refreshToken: "REFRESH_TOKEN_YOU_JUST_FOUND"
            }
        }
    });

    // send mail
    smtpTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            sails.log.debug(error);
            return res.json({ status: 'false', msg: 'Email sending failed' })
        }
        else {
            console.log('Message %s sent: %s', info.messageId, info.response);
            return res.json({ status: true, message: 'Email sent successfully' })
        }
        //smtpTransport.close();
    });
}

module.exports = mailer