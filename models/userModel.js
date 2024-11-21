// models/userModel.js
const { poolPromise, sql } = require('../config/db');

class User {
    static async getAllUsers() {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('Select * from  [dbo].[tbl_100_users] where enabled = 1 order by firstName asc');
            return result.recordset;
        } catch (err) {
            throw new Error('Error fetching users: ' + err.message);
        }
    }
}

module.exports = User;