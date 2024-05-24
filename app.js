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

// 將環境變量轉換為數組
const Types = process.env.MOTC_TYPES.split(',');
const Codes = process.env.MOTC_CODES.split(',');

console.log(Types)
console.log(Codes)

async function fetchData(type,code){
  const url =  `https://ticp.motc.gov.tw/motcTicket/api/StopOfRoute/${code}/Operator/${type}?$format=json`;
  try{
   // const response = await axios.get(url).then();
   console.log('url',url)
  }
  catch(error){
    console.error(`Error fetching data for Type: ${type}, Code: ${code}`, error);
  }
}
async function fetchAllData() {
 
  Types.forEach(TYPES => {
    Codes.forEach(CODES => {
       fetchData(TYPES, CODES);
    });
  });
}

async function main() {
 /*  let pool = await SQL.connectToDatabase();
  SQL.createTable(pool,'TDXTest'); */

  fetchAllData();
  
}

main();
// 每月第一天八點发送一次邮件
cron.schedule('0 8 1 * *', () => {
  let tittle =  'Sending Email using Node.js';
let msg = 'TDX定時排呈測試 ';
  sendMail(tittle,msg)
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
