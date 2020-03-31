const nodemailer = require("nodemailer");

const transportOptions = {
    host: "smtp.gmail.com",
    port: 465, //secure port encrypted
    secure: true,
    debug: true,
    auth: {
      user: "starktower.manhattan@gmail.com",
      pass: "tony@123"
    }
  };

  const mailTransport = nodemailer.createTransport(transportOptions);
  const sendMailToUser = async (email, token) => {
    const domainName = `http://localhost:1234`;

    html = `<h1>Hi there.</h1>
    <p>You have recently requested for a change in password. Paste this link in POSTMAN along with your email and password(the new one)
      <a href=${domainName}/reset/${token}>here</a> to reset your password. 
       If you didn't initiate the request. Kindly ignore. Thanks :)
    </p>`;
      try {
        await mailTransport.sendMail({
          from: `starktower.manhattan@gmail.com`,
          to: email,
          subject:
             "Reset your password",
          html
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    };
    
    module.exports = sendMailToUser;