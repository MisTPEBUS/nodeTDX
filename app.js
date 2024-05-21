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

sendMail()
  .then(() => {
    console.log('Email sent successfully.');
  })
  .catch(error => {
    console.error('Error sending email:', error);
  });

// 在應用啟動時執行資料抓取和處理


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
