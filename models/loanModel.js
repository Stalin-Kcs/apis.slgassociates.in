const { poolPromise, sql } = require('../config/db');

class Loan {
    static async createLoanRequest(loanRequestData) {
        //console.log("TEST"+ loanRequestData);
        try {
            // Validate input data
            const requiredFields = ['requestNo', 'customerName', 'phoneNumber', 'email', 'loanAmt', 'noOfYears', 'noOfEMIs', 'interestRate', 'monthlyEmiAmt', 'origin'];
            for (const field of requiredFields) {
                if (!loanRequestData[field]) {
                    throw new Error(`Missing required field: ${field}`);
                }
            }
            const pool = await poolPromise;
            const checkExists = await pool.request()
                .input('phoneNumber', sql.VarChar, loanRequestData.phoneNumber)
                .query(`select * from [dbo].[tbl_106_loanRequest] where isArchive IS Null and phoneNumber = @phoneNumber`);
            //console.log('Loan Request Data:', loanRequestData); // Log the input data
            if (checkExists.recordset.length === 0) {
                const result = await pool.request()
                    .input('requestNo', sql.VarChar, loanRequestData.requestNo)
                    .input('customerName', sql.VarChar, loanRequestData.customerName)
                    .input('phoneNumber', sql.VarChar, loanRequestData.phoneNumber)
                    .input('email', sql.NVarChar, loanRequestData.email)
                    .input('loanAmt', sql.Numeric, loanRequestData.loanAmt)
                    .input('noOfYears', sql.Int, loanRequestData.noOfYears)
                    .input('noOfEMIs', sql.Int, loanRequestData.noOfEMIs)
                    .input('interestRate', sql.Numeric, loanRequestData.interestRate)
                    .input('monthlyEmiAmt', sql.Numeric, loanRequestData.monthlyEmiAmt)
                    .input('origin', sql.VarChar, loanRequestData.origin)
                    .execute('loanRequest');
                return {
                    success: true,
                    exists: false,
                    data: result,
                    message: 'Your loan request has been created successfully, our representative will call you shortly. Thank you'
                };
            } else {
                return {
                    success: true,
                    exists: true,
                    data: checkExists.recordset[0],
                    message: 'Your existing loan request is being processed on our end, so you are unable to submit a new request.'
                };
            }
        } catch (error) {
            console.error('Error creating loan request:', error); // Log the error
            throw new Error(error);
        }
    }
}

module.exports = Loan;