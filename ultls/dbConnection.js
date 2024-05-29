const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

module.exports = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_HOST,
    database: process.env.DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true,
        tdsVersion: "7_1"
    }
  };
  