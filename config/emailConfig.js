module.exports = {
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
  };
  