const Loan = require('../models/loanModel');
const responseUtil = require('../utils/responseUtil');
class LoanController {
    static async createLoanRequest(req, res) {
        try {
            const createLoanResponse = await Loan.createLoanRequest(req.body);
            res.status(200).json(createLoanResponse);
        } catch (error) {
            res.status(500).json(responseUtil.error(error));
        }
    }
}

module.exports = LoanController;