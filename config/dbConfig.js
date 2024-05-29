const { Sequelize } = require('sequelize');

dotenv.config({ path: './config.env' });

const mssqlConfig = {
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

 const sequelize = new Sequelize(process.env.DATABASE, process.env.SQL_USER, process.env.SQL_PASSWORD, {
    host: process.env.SQL_HOST,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true,
        tdsVersion: "7_1"
      }
    }
  });

module.exports = {sequelize,mssqlConfig};