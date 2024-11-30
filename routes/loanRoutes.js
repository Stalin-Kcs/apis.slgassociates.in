// src/routes/userRoutes.js
const express = require('express');
const LoanController = require('../controllers/loanController');
const router = express.Router();

router.post('/createLoanRequest', LoanController.createLoanRequest);

module.exports = router;