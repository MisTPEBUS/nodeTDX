const axios = require('axios');
const sql = require('mssql');
const cron = require('node-cron');
const dotenv = require('dotenv');
const { sendMail } = require('./service/nodeMailer');

dotenv.config({ path: './config.env' });


// Your SQL configuration and connection logic here...

// Example of scheduling a task with cron
/* cron.schedule('0 0 1 * *', async () => {
  try {
    const apiResponse = await axios.get('your_api_endpoint');
    const tableName = `station${moment().format('YYYYMMDD')}`;
    const query = `CREATE TABLE ${tableName} (id INT, data NVARCHAR(MAX))`;

    // Create new table
    await sql.query(query);

    // Insert data
    apiResponse.data.forEach(async (item) => {
      const insertQuery = `INSERT INTO ${tableName} (id, data) VALUES (${item.id}, '${item.data}')`;
      await sql.query(insertQuery);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}); */

// 程式出現重大錯誤時
process.on('uncaughtException', err => {
  console.error('Uncaughted Exception！')
  console.error(err);
  process.exit(1);
});

// 每天八點发送一次邮件
cron.schedule('0 8 * * *', () => {
  sendMail()
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.error('Error sending email:', error);
    });
});


// 未捕捉到的 catch 
process.on('unhandledRejection', (reason, promise) => {
  console.error('未捕捉到的 rejection：', promise, '原因：', reason);
  
});
