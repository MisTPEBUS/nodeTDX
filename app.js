const axios = require('axios');
const sql = require('mssql');
const cron = require('node-cron');
const dotenv = require('dotenv');
const { sendMail } = require('./service/nodeMailer');
const SQL = require('./service/sql');
dotenv.config({ path: './config.env' });

// 程式出現重大錯誤時
process.on('uncaughtException', err => {
  console.error('Uncaughted Exception！')
  console.error(err);
  process.exit(1);
});

/* 
async function main() {
  let pool;
  const tableName = `station${new Date().toISOString().split('T')[0].replace(/-/g, '')}`;

  try {
    const data = await fetchData();
    pool = await connectToDatabase();
    await createTable(pool, tableName);
    await insertData(pool, tableName, data);
    console.log('Data fetching and insertion completed.');
  } catch (error) {
    console.error('Error in main execution:', error);
  } finally {
    sql.close();
  }
}

// 在應用啟動時執行資料抓取和處理
main(); */
async function main() {
  let pool = await SQL.connectToDatabase();
  SQL.createTable(pool,TDXTest);
}
main();

// 每月第一天八點发送一次邮件
cron.schedule('0 8 1 * *', () => {
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
