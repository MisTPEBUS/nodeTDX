const {quryDatabase} = require('../models/route');
const { sendEmail } = require('./emailService');
const logger = require('../utils/logger');

async function executeQueryAndSendEmail(){
    try{
        const result     = await quryDatabase();
        await sendEmail(result);
        logger.info('Email sent successfully');
    }
    catch(err){
        logger.error('Error in executeQueryAndSendEmail', err);
    throw err;c
    }
}

module.exports={executeQueryAndSendEmail};