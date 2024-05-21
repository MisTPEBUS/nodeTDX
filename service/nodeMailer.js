const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'capital-bus.com.tw',
  port: 25,  // SMTP port
  secure: false,  // true for 465, false for other ports
  auth: {
    user: 'sodu_service@capital-bus.com.tw',  // your email address
    pass: 'cPsS9620',  // your email password
  },
  tls: {
    rejectUnauthorized: false  // do not fail on invalid certs
  }
});

const mailOptions = {
  from: 'sodu_service@capital-bus.com.tw',
  to: 'winer909@gmail.com, 801@capital-bus.com.tw',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

const sendMail = () => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log('Email sent: ' + info.response);
        resolve(info.response);
      }
    });
  });
};

module.exports = { sendMail };
