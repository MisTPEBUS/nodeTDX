const express = require('express');
const cron = require('node-cron');
const axios = require('axios');
const sql = require('mssql');
const moment = require('moment');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mssqlConfig = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_HOST, // 您的数据库服务器地址
  database: process.env.DATABASE,
  options: {
      encrypt: false, // 使用加密連線(在TLS中，ServerName設為IP是不符合RFC 6066規範)
      trustServerCertificate: true, // 忽略驗證
      enableArithAbort: true // 防止因運算錯誤而中斷連接
  }
};
// SQL Server 連線
sql.connect(mssqlConfig, err => {
  console.log('yo');
  if (err) console.log(err);
});

// 定時任務，每個月第一天執行
/* cron.schedule('0 0 1 * *', async () => {
  try {
      const apiResponse = await axios.get('your_api_endpoint');
      const tableName = `station${moment().format('YYYYMMDD')}`;
      const query = `CREATE TABLE ${tableName} (id INT, data NVARCHAR(MAX))`;

      // 建立新表
      await sql.query(query);

      // 插入資料
      apiResponse.data.forEach(async (item) => {
          const insertQuery = `INSERT INTO ${tableName} (id, data) VALUES (${item.id}, '${item.data}')`;
          await sql.query(insertQuery);
      });
  } catch (error) {
      console.error('Error:', error);
  }
});
 */
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    sql.connect(mssqlConfig)
      .then(() => {
        console.log('Connection to SQL Server database successful!');
        resolve();
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error);
      });
  });
}

/* connectToDatabase()
  .then(() => {
  })
  .catch(error => {
    console.error(error)
  }); */