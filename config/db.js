// config/db.js
require('dotenv').config();
const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    port: 10104,
    options: {
        trustServerCertificate: true // Add this line to bypass certificate validation
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => console.log('Database connection failed: ', err));

module.exports = {
    sql,
    poolPromise
};
