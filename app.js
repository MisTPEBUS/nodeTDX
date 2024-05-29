
const cron = require('node-cron');
const dotenv = require('dotenv');
const { executeQueryAndSendEmail } = require('./services/cronService');
const dbConfig = require('./config/dbConfig');
const emailConfig = require('./config/emailConfig');
const cronConfig = require('./config/cronConfig');
const logger = require('./utils/logger');
const db = require('./utils/dbConnection');
dotenv.config({ path: './config.env' });




// 設置定時任務
cron.schedule(cronConfig.schedule, () => {

  logger.info('Cron job started');
  // 初始化資料庫連接
  db.connect(dbConfig);
  executeQueryAndSendEmail()
    .then(() => {
      logger.info('定時排呈任務: successfully |');
    })
    .catch(err => {
      logger.error('定時排呈任務: failed |', err);
    });
});

logger.info('Application started');

// 程式出現重大錯誤時
process.on('uncaughtException', err => {
  console.error('Uncaughted Exception！')
  console.error(err);
  process.exit(1);
});

// 未捕捉到的 catch 
process.on('unhandledRejection', (reason, promise) => {
  console.error('未捕捉到的 rejection：', promise, '原因：', reason);

});
