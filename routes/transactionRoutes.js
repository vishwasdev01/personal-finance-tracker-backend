const express = require('express');
const transactionController = require('../controller/transactionController');
const router = express.Router();

router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getTransactions);
router.get('/summary', transactionController.getTransactionSummary);
router.get('/:id', transactionController.getTransactionById);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
