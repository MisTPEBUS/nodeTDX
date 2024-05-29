const sql = require('mssql');
const dotenv = require('dotenv');
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

async function fetchData() {
    try {
        const response = await axios.get('https://external-api.com/data');
        console.log('Data fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function connectToDatabase() {
    try {
        const pool = await sql.connect(mssqlConfig);
        console.log('Connected to SQL Server.');
        return pool;
    } catch (error) {
        console.error('Error connecting to SQL Server:', error);
        throw error;
    }
    
}

async function createTable(pool, tableName) {

   
    const createTableQuery = `
    IF OBJECT_ID(N'dbo.${tableName}', N'U') IS NULL 
    BEGIN
        CREATE TABLE ${tableName} (
            StationGroupID nvarchar(50) ,
            StationUID nvarchar(50) NOT NULL,
            StopUID nvarchar(50) NOT NULL,
            StopID nvarchar(50) NOT NULL,
            StopNameZh nvarchar(50) NOT NULL,
            StopSequence int ,
            StopLat nvarchar(50) NOT NULL,
            StopLon nvarchar(50) NOT NULL
        )
    END
`;
    try {
        await pool.request().query(createTableQuery);
        console.log(`Table ${tableName} created.`);

    } catch (error) {
        console.error('Error creating table:', error);
        throw error;
    }
}

async function insertData(pool, tableName, data) {
    const insertPromises = data.map(async (item) => {
        const insertQuery = `INSERT INTO ${tableName} (id, data) VALUES (${item.id}, '${item.data}')`;
        try {
            await pool.request().query(insertQuery);
        } catch (error) {
            console.error('Error inserting data:', error);
            throw error;
        }
    });

    try {
        await Promise.all(insertPromises);
        console.log('All data inserted.');
    } catch (error) {
        console.error('Error in inserting all data:', error);
        throw error;
    }
}

module.exports = {
    fetchData,
    connectToDatabase,
    createTable,
    insertData
};